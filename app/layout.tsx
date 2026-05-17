import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XRED EYEZ",
  description: "Premium cannabis culture discovery. Find cities, venues, vibes, and routes.",
  openGraph: {
    title: "XRED EYEZ",
    description: "Premium cannabis culture discovery. Find cities, venues, vibes, and routes.",
    type: "website",
    url: "https://www.redeyez.co.uk",
  },
  twitter: {
    card: "summary_large_image",
    title: "XRED EYEZ",
    description: "Premium cannabis culture discovery. Find cities, venues, vibes, and routes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
