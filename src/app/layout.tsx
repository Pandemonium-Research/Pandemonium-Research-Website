import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pandemonium-research.vercel.app"),
  title: "Pandemonium Research",
  description:
    "Pandemonium Research exists at the intersection of AI, systems, and whatever comes next. We're engineers, researchers, and occasional troublemakers working on problems that don't have a category yet.",
  icons: {
    icon: "/pandemonium_research_logo.png",
  },
  openGraph: {
    title: "Pandemonium Research",
    description:
      "Pandemonium Research is an independent research group building open-source tools and publishing work across AI systems, distributed computing, cybersecurity, and developer infrastructure.",
    url: "https://pandemonium-research.vercel.app",
    siteName: "Pandemonium Research",
    type: "website",
    images: [
      {
        url: "/pandemonium_research_logo.png",
        alt: "Pandemonium Research logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#111111] text-[#f5f5f5]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
