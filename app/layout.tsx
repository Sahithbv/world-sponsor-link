import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://world-sponsor-link.vercel.app"),

  title: {
    default: "World Sponsor Link | Where Brands Meet Opportunities",
    template: "%s | World Sponsor Link",
  },

  description:
    "World Sponsor Link connects brands with sponsorship opportunities from colleges, events, organizations, creators, sports teams, startups, NGOs, and communities.",

  keywords: [
    "World Sponsor Link",
    "WSL",
    "sponsorship",
    "sponsorship opportunities",
    "brand sponsorship",
    "event sponsorship",
    "college sponsorship",
    "sponsorship marketplace",
  ],

  openGraph: {
    title: "World Sponsor Link | Where Brands Meet Opportunities",
    description:
      "Discover sponsorship opportunities and connect brands with organizations, events, colleges, creators, and communities.",
    url: "https://world-sponsor-link.vercel.app",
    siteName: "World Sponsor Link",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}