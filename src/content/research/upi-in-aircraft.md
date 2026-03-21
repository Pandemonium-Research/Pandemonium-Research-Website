---
slug: routing-upi-through-aircraft-satellite-pipes
title: "Routing UPI Through Aircraft Satellite Pipes: A Technical Blueprint"
authors:
  - Pranav Hemanth
  - Sampriti Saha
date: "2026-03-21"
tags:
  - UPI
  - Aviation
  - Payments
  - SATCOM
  - NPCI
summary: "UPI can be made to work in-flight without passenger internet access, but only by exploiting a specific combination of pre-funded on-device wallets (UPI Lite X), binary payload compression, and the same satellite backhaul that already carries card payments. The core insight is that card payments survive the airborne environment because ISO 8583 is a compact binary protocol requiring a single round-trip — UPI's XML-over-HTTPS architecture demands 10x more data and 5x more round trips, making it fundamentally incompatible with narrowband aviation channels in its native form."
---

## The Problem: UPI Was Never Designed for 400-Millisecond Pipes

No Indian airline has achieved true mid-flight UPI. FLY91's May 2025 implementation closes the payment window at door closure. The gap is structural: card payments survive the airborne environment because ISO 8583 is a compact binary protocol requiring a single round-trip. UPI's XML-over-HTTPS architecture demands 10x more data and 5x more round trips.

A single UPI push payment triggers a cascade of **10–12 XML messages across 5 major network hops**, each requiring HTTPS round-trips with mutual TLS authentication. A populated ReqPay XML message with namespace declarations, headers, device tags, and an RSA-2048 encrypted UPI PIN block occupies 2,000–5,000 bytes. With the mandatory RSA-SHA256 XML digital signature and HTTPS transport overhead, total per-message wire cost reaches 4,000–7,500 bytes. Across all hops, a single UPI transaction consumes approximately **10–20 KB of aggregate network data** — an order of magnitude larger than ISO 8583.

| Parameter                   | ISO 8583 (card)                 | UPI (XML)                                           | Ratio   |
| --------------------------- | ------------------------------- | --------------------------------------------------- | ------- |
| Authorization request       | 200-800 bytes                   | 3,000-6,500 bytes                                   | 8-10x   |
| Authorization response      | 100-200 bytes                   | 500-1,500 bytes                                     | 5-7x    |
| Total round-trip payload    | 300-1,000 bytes                 | 10,000-20,000 bytes                                 | ~15x    |
| Network round trips         | 1                               | 5                                                   | 5x      |
| Timeout window              | 30 seconds                      | 10-15 seconds (NPCI SLA, June 2025)                 | Tighter |
| Crypto overhead per message | ~50-100 bytes (MAC + PIN block) | ~1,000-2,000 bytes (XML signature + encrypted cred) | 15-20x  |

NPCI's timeout window is the binding constraint. As of June 2025, NPCI reduced the transaction timeout from 30 to 10–15 seconds. A GEO satellite round-trip (Ka/Ku-band) takes 500–700ms per hop. With 5 sequential hops, just the satellite propagation delay consumes 2.5–3.5 seconds — before any processing time.

The deepest structural gap, however, is not latency or payload size — it is the **absence of any offline authorization model** for bank-account-debiting UPI transactions. Card payments work offline because EMV chips carry issuer-programmed risk parameters that enable local authorization decisions. UPI has no equivalent. A store-and-forward UPI debit against a bank account is an unsecured credit extension — the account could be empty when the deferred debit finally arrives.

## How Card Payments Survive at 35,000 Feet Today

The in-flight card payment pipeline is deceptively simple. A crew tablet (running flightPOS, Retail inMotion, or SITA CrewTab) pairs via Bluetooth to a PCI PTS-certified card reader, captures EMV chip or contactless data, and hands the transaction to an onboard server over cabin 802.11 Wi-Fi.

On connected aircraft (Ku/Ka-band broadband or Iridium Certus LEO), the onboard gateway encrypts the transaction and pushes it over the cabin IP pipe — through a satellite terminal, to a ground earth station, across terrestrial internet to the acquirer, which formats an ISO 8583 0100 authorization request and forwards it to VisaNet or Mastercard Banknet. End-to-end latency runs **3–15 seconds over GEO satellite** (500–700ms RTT) or **2–5 seconds over Iridium LEO** (~395ms RTT). The raw ISO 8583 payload is remarkably compact: a standard authorization with EMV data occupies 200–800 bytes in packed BCD encoding — approximately 50 KB over-the-wire, trivial even for Iridium Certus 100's 88 kbps uplink.

On disconnected aircraft, the POS terminal operates in **store-and-forward mode**, validating the card locally (Luhn check, BIN lookup, expiry verification) and approving transactions under a merchant-defined floor limit (typically $50–$100). Encrypted transaction batches upload after landing via ISO 8583 0220 Financial Transaction Advice messages. Authorization rates exceed 95% for credit cards but drop significantly for debit — a critical asymmetry that foreshadows UPI's challenge.

A critical architectural detail: payment data does not flow through ACARS or safety data links. Payment traffic rides entirely on the Passenger Information and Entertainment Services Domain (PIESD) or Airline Information Services Domain (AISD), architecturally segregated from the Aircraft Control Domain per ARINC 664 Part 5.

## Three Exploit Paths to Route UPI Through Aviation Pipes

### Path 1: UPI Lite X over NFC — Fully Offline, Zero Connectivity Required

The most immediately deployable path requires no satellite bandwidth at all. **UPI Lite X**, launched September 2023, enables fully offline NFC tap-to-pay between devices using pre-funded on-device wallets. Both debit and credit execute locally via NFC handshake.

The cabin implementation: a crew Android tablet with NFC and UPI Lite X enabled acts as the merchant terminal. The passenger's NFC-enabled Android phone taps the crew device. The passenger's on-device wallet is debited and the crew's wallet is credited, entirely offline. When either device reconnects post-landing, the local ledger syncs with NPCI's banking infrastructure within the 4-day reconciliation window.

Current constraints that limit this path:

- Per-transaction cap: ₹500 (UPI Lite X) or ₹1,000 (UPI Lite enhanced, December 2024)
- Maximum offline wallet balance: ₹2,000 (Lite X) or ₹5,000 (Lite enhanced)
- Offline transaction limits: 1 debit + 10 credit transactions per offline session
- Android-only (Apple restricts third-party NFC access)
- Both devices need NFC hardware and UPI Lite X enabled

For typical in-flight F&B purchases (₹200–₹800), these limits are workable. For duty-free purchases (₹2,000–₹50,000), they are not. The regulatory path forward requires NPCI to create an aviation-specific UPI Lite tier — likely ₹5,000 per transaction and ₹15,000 wallet balance — justified by the face-to-face proximity requirement already satisfied by the cabin environment.

### Path 2: Compressed Binary UPI Relay over Broadband SATCOM

For transactions exceeding UPI Lite limits, the architecture must route through the aircraft's satellite pipe to reach NPCI in real time. The key innovation is a **binary UPI gateway pair** — one onboard, one on the ground — that compresses UPI's verbose XML into a compact binary format for satellite transit.

**Onboard gateway** (runs on the existing IFE server or a dedicated Linux appliance in the avionics bay):

1. Receives payment request from crew device over cabin Wi-Fi
2. Extracts the minimum viable fields: payer VPA (30 bytes), payee VPA (30 bytes), amount (8 bytes), transaction UUID (36 bytes), timestamp (8 bytes), encrypted UPI PIN block (64 bytes), ECDSA-P256 device signature (64 bytes), device ID (16 bytes)
3. Encodes into a custom binary frame of ~250–500 bytes — comparable to an ISO 8583 authorization
4. Alternatively, applies W3C EXI (Efficient XML Interchange) with a pre-shared NPCI UPI XSD schema, achieving 10–20× compression — reducing a 3 KB ReqPay to 150–300 bytes
5. Wraps in an AES-256-GCM encrypted envelope and transmits over the cabin SATCOM pipe

**Ground gateway** (co-located with a certified PSP's data center):

1. Receives binary frame from ground earth station
2. Reconstructs full UPI XML ReqPay message with all mandatory elements, digital signatures, and namespace declarations
3. Submits to NPCI via standard HTTPS/mutual-TLS APIs as an authorized PSP
4. Receives RespPay from NPCI, compresses to binary, and relays back to aircraft

This architecture reduces the satellite footprint from 10–20 KB to **under 1 KB per transaction**. The total end-to-end latency budget:

| Leg                                   | Duration       |
| ------------------------------------- | -------------- |
| Crew device to onboard gateway        | ~50 ms         |
| Binary encoding + encryption          | ~10 ms         |
| Satellite uplink (GEO)                | ~280 ms        |
| Ground station to PSP gateway         | ~20 ms         |
| XML reconstruction + PSP to NPCI      | ~100 ms        |
| NPCI to remitter bank (debit)         | ~500 ms        |
| NPCI to beneficiary bank (credit)     | ~500 ms        |
| NPCI to PSP to reverse satellite path | ~800 ms        |
| Total estimated                       | ~2.3-3 seconds |

This fits within NPCI's 10–15 second timeout with comfortable margin. Only one satellite round-trip is required — the ground gateway handles all 5 NPCI hops terrestrially.

### Path 3: Store-and-Forward UPI with Deferred Settlement

The most radical path — and the one requiring the most NPCI cooperation — would introduce a new UPI message type for deferred authorization, analogous to ISO 8583's 0220 Financial Transaction Advice. The flow:

1. Crew device captures passenger's UPI intent (VPA + amount + device attestation) offline
2. Transaction stored locally with a cryptographic commitment (HMAC binding transaction data to device ID + timestamp + nonce)
3. On landing, batch uploaded to PSP → NPCI for settlement
4. NPCI processes debit from payer's bank and credit to airline's account

This is architecturally identical to how card store-and-forward works, but UPI has no equivalent to credit-card-backed merchant guarantees. The fraud risk is severe: the payer's bank account could be empty, closed, or frozen by the time the deferred debit arrives. Mitigation would require NPCI to implement **pre-authorization holds** (blocking funds before boarding, released if unused) or **airline-backed merchant guarantees** (airline absorbs declined transactions). Neither mechanism exists in UPI today.

## Regulatory Scaffolding: Permissive but Incomplete

The regulatory landscape is permissive in some dimensions and silent in others. RBI's January 2022 offline payments framework explicitly authorizes small-value digital payments without Additional Factor of Authentication in face-to-face proximity mode — the cabin environment satisfies this requirement. The December 2024 enhancement raised UPI Lite limits to ₹1,000 per transaction and ₹5,000 wallet balance.

DGCA's April 2014 CAR amendment permits PED use in airplane mode during all flight phases. NFC operates independently of cellular/Wi-Fi radios and functions in airplane mode — no DGCA barrier exists for UPI Lite X NFC payments.

Three critical regulatory gaps remain:

1. **No NPCI circular addresses in-flight UPI use cases.** The offline framework was designed for areas with "poor or no internet connectivity" — technically applicable to aircraft, but never explicitly scoped for aviation.
2. **No elevated UPI Lite limits for aviation.** The ₹500–₹1,000 per-transaction cap is adequate for beverages but insufficient for duty-free. NPCI would need to create a merchant-category-specific exception, similar to how card networks assign higher contactless limits to specific MCCs.
3. **No deferred-settlement UPI message type exists.** ISO 8583's 0220 (Financial Transaction Advice) has no UPI equivalent.

## What Each Stakeholder Must Build, Change, or Certify

**NPCI must:**

1. Define an aviation merchant category with elevated UPI Lite limits (recommended: ₹5,000/transaction, ₹15,000 wallet balance)
2. Publish a binary UPI message specification (EXI schema or Protocol Buffers mapping) for bandwidth-constrained channels, or certify a ground gateway architecture where compressed payloads are reconstructed into standard XML before hitting the switch
3. Extend the transaction timeout window for aviation-flagged transactions to 30 seconds (matching card scheme SLAs) to accommodate satellite latency
4. Introduce a ReqPayDeferred API for store-and-forward scenarios with merchant-liability semantics, or expand UPI Lite X's offline transaction count limits
5. Certify crew devices as valid UPI endpoints via an aviation-specific PSP onboarding process

**PSPs (Google Pay, PhonePe, Paytm, BHIM) must:**

1. Implement a crew-facing merchant mode in their UPI Lite X stack — a merchant-terminal profile distinct from consumer P2P
2. Support the ground gateway's binary-to-XML reconstruction by publishing signed PSP credentials that the gateway can use to submit reconstructed ReqPay messages
3. Handle delayed settlement notifications — the passenger's app will show the transaction only when their device syncs post-landing (within the 4-day window)

**Airlines must:**

1. Deploy NFC-enabled Android crew tablets with UPI Lite X merchant capability, replacing or supplementing existing Bluetooth card readers
2. Install an onboard UPI gateway appliance (for Path 2) that connects to the cabin Wi-Fi network and interfaces with the existing SATCOM terminal — this sits in the AISD or PIESD network domain, never in the Aircraft Control Domain
3. Establish ground infrastructure: a co-located ground UPI gateway at a certified PSP's data center, connected to satellite ground earth stations via dedicated MPLS or VPN
4. Integrate with existing IFE/POS systems (AirFi Box, Retail inMotion, flightPOS) to add UPI as a payment method alongside cards
5. Obtain DoT IFMC authorization if routing UPI data through satellite connectivity

**Avionics/connectivity vendors must:**

1. **AirFi, Panasonic, SITA FOR AIRCRAFT:** Certify their onboard server platforms to host the UPI gateway application, with PCI-DSS equivalent security controls for UPI data handling
2. **Iridium, Inmarsat/Viasat:** No protocol changes needed — the binary UPI payload (~500 bytes) is indistinguishable from any other IP packet transiting their links. QoS tagging for payment traffic (high priority, low bandwidth) should be supported
3. **Collins Aerospace (ARINC):** Their ACARS-over-IP product already provides an encrypted broadband channel; certifying it for financial data requires PCI-DSS compliance of the AoIP pipe
4. The onboard gateway must pass DO-160G environmental qualification (vibration, temperature, altitude, EMI) for permanent installation, or operate as a portable device in the cabin (like AirFi Box, which mounts in overhead bins and requires no STC)

## The Three-Tier Architecture That Works

The viable architecture is not a single solution but a three-tier system matched to transaction value:

**Tier 1 (₹0–₹1,000):** UPI Lite X NFC between passenger phone and crew tablet. Fully offline, zero satellite bandwidth, works today with current RBI/NPCI frameworks. Deployable immediately on any airline with NFC-equipped crew devices. The only gap is iOS exclusion and the need for passengers to pre-load wallets before boarding.

**Tier 2 (₹1,000–₹10,000):** Compressed binary UPI relay over the aircraft's existing broadband SATCOM (Ku/Ka/LEO). Requires NPCI to certify a ground gateway reconstruction architecture and extend timeouts. The satellite pipe already exists on connected aircraft — the same pipe that authorizes Visa transactions can carry a 500-byte compressed UPI payload. Estimated development timeline: **12–18 months** with NPCI cooperation.

**Tier 3 (future):** Store-and-forward UPI with pre-authorization holds, enabling offline UPI on aircraft without any satellite connectivity. Requires NPCI to create a new deferred-settlement message type and a merchant-liability framework — the deepest protocol change and the longest regulatory runway, likely **24–36 months**.

The fundamental insight is that the aviation payment problem was already solved for cards by accepting two compromises: compact binary encoding and merchant-borne fraud risk for offline transactions. UPI can follow the same path, but its XML verbosity and real-time bank-debit dependency demand either a compression/gateway layer or a shift to pre-funded wallets. **The satellite pipe is not the bottleneck — it is the protocol that must bend to fit through it.**
