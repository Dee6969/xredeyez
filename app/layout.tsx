import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ReadingProgress from "./components/ReadingProgress";
import ShopProviders from "./components/ShopProviders";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { organizationSchema, toJsonLd } from "./lib/schema";

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
  metadataBase: new URL("https://www.redeyez.co.uk"),
  title: "XRED EYEZ",
  description: "Premium cannabis culture discovery. Find cities, venues, vibes, and routes.",
  verification: {
    google: "zNE8Nv4Ff4leTc2HsYZSA1kD1D_y6v_bz2-Vy58P-cw",
  },
  openGraph: {
    title: "XRED EYEZ",
    description: "Premium cannabis culture discovery. Find cities, venues, vibes, and routes.",
    type: "website",
    url: "https://www.redeyez.co.uk",
    siteName: "XRED EYEZ",
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
    <html lang="en" data-scroll-behavior="smooth" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="google-site-verification" content="zNE8Nv4Ff4leTc2HsYZSA1kD1D_y6v_bz2-Vy58P-cw" />
      </head>
      <body className="h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema()) }}
        />
        <ReadingProgress />
        <ShopProviders>
          {children}
        </ShopProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
