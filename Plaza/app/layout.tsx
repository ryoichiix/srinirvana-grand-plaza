import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConciergeWrapper from "@/components/ConciergeWrapper";
import BackToTop from "@/components/BackToTop";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const OG_IMAGE =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80";

export const metadata: Metadata = {
  title: "Srinirvana Grand Plaza | Luxury Hotel in Bhongir, Telangana",
  description:
    "Experience refined luxury at Srinirvana Grand Plaza — boutique hotel offering premium suites, fine dining, spa, and AI-powered concierge service in Bhongir, Telangana.",
  keywords:
    "luxury hotel Bhongir, boutique hotel Telangana, hotel near Hyderabad, Srinirvana Grand Plaza, Bhongir Fort hotel, luxury suites Telangana",
  metadataBase: new URL("https://srinirvana.com"),
  openGraph: {
    title: "Srinirvana Grand Plaza | Luxury Hotel in Bhongir, Telangana",
    description:
      "Experience refined luxury at Srinirvana Grand Plaza — boutique hotel offering premium suites, fine dining, spa, and AI-powered concierge service in Bhongir, Telangana.",
    type: "website",
    url: "https://srinirvana.com",
    siteName: "Srinirvana Grand Plaza",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Srinirvana Grand Plaza – Luxury Boutique Hotel, Bhongir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srinirvana Grand Plaza | Luxury Hotel in Bhongir, Telangana",
    description:
      "Experience refined luxury at Srinirvana Grand Plaza — boutique hotel offering premium suites, fine dining, and spa in Bhongir, Telangana.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-obsidian text-ivory font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <BackToTop />
        <ConciergeWrapper />
      </body>
    </html>
  );
}
