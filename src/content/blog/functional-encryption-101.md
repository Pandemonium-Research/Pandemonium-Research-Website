---
slug: functional-encryption-101
title: 'Functional Encryption 101: The Tip of the Iceberg'
authors:
  - Roshini Ramesh
date: '2025-08-29'
tags:
  - Functional Encryption
  - Cryptography
  - Cybersecurity
summary: 'An introduction to functional encryption, the cryptographic technique that lets you compute functions on ciphertexts while keeping inputs private.'
---

What if encrypted data could speak for itself - letting others compute only what they're allowed to, while keeping everything else hidden?

This was the inspiration behind my summer internship project called TrustZero, where we tried to build a framework for trustless data sharing and secure offline viewing. But, about halfway through the project, when I decided to "optimise" one of the functional encryption modules by rewriting the entire code in Rust (FeRus), I realised that I had never bothered to understand the fundamentals of functional encryption in the first place.

This marked the start of my journey into functional encryption, and this blog is my way of documenting it. I hope it can serve as a starting point for beginners who feel just as lost as I did. I'm not an expert, so treat this as a supplement to the original research papers I'll link along the way.

With that out of the way, let's begin!

## What is Functional Encryption?

Wikipedia defines functional encryption as "a generalization of public-key encryption in which possessing a secret key allows one to learn a function of what the ciphertext is encrypting."

When I first read that, I was lost. How could someone possibly perform operations on encrypted data and get the output as plaintext?

Turns out, this mind-boggling question had quite a simple answer: dot product.

## A quick recap to Public Key Encryptions

Public-key encryption, unlike symmetric encryption, uses two keys instead of one: a public key for encryption and a private key for decryption. I have illustrated below exactly how encryption and decryption in public key encryption schemes works.

![Public Key Encryption](/blog/functional-encryption-101/public-key-encryption.png)

Note: Digital signatures are also added, but that's not important here.

## Back to how functional encryption works

We first use the public key to encrypt the data. What we want to do now is send the encrypted data to someone and allow them to compute only certain functions and see the results of that. For this, we create a functional key (a combination of the private key and function's vector) and send that to the person. To view the results, they just need to perform a dot product of the encrypted data with the functional key and get the results.

If you are confused with that explanation, let me give you an example to help you understand better.

Let's assume I am the sender and you are the receiver. I have a row of data — say, the salaries of three employees,

$$
\mathbf{Y}=
\begin{bmatrix}
50,000 & 60,000 & 70,000
\end{bmatrix}
$$

But, I don't want to reveal this data with you. I just want you to learn of the total sum.

This is how functional encryption would work. I first encrypt the data with the public key. Then, using the secret key and a function vector, I derive a functional key for you. Since we want the sum, the function vector is

$$
\mathbf{F}=
\begin{bmatrix}
1 & 1 & 1
\end{bmatrix}
$$

With this functional key, you don't get back the raw data. Instead, decryption gives you the dot product of the two vectors

$$
\begin{bmatrix}
50,000 & 60,000 & 70,000
\end{bmatrix}
\cdot
\begin{bmatrix}
1 \\ 1 \\ 1
\end{bmatrix}
= 180,000
$$

So now, you only learn the total 180,000, while the individual salaries remain hidden.

## The Real Question: Why Functional Encryption?

A question I'm asked very often is, "Why functional encryption? Won't it just be easier to send the receiver the values they are asking for than set-up this elaborate scheme?"

The main reason we need this scheme is that, as an end user, I may not trust you enough to accept the computed values you send me. I want control to compute the results myself. This doesn't make much sense until you think of an application where it can be used.

For example, an ML model being trained on encrypted data: here, functional encryption is extremely useful. This becomes even more powerful when ML models themselves can be reduced to functions, meaning they can be directly trained and evaluated on encrypted data without ever revealing the raw inputs.

## Conclusion

Functional encryption, as we've seen, is powerful but deceptively simple at first glance. This is just the beginning.

In the next post, I'll dive deeper into the different variants of functional encryption as described in "Functional Encryption: Definitions and Challenges" by Boneh, Sahai, and Waters.

This is where things get technical, but also where the real beauty of functional encryption starts to emerge.
