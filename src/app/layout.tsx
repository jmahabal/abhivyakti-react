import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Analytics } from "@vercel/analytics/react";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "अभिव्यक्ति / Abhivyakti",
    template: "%s | अभिव्यक्ति / Abhivyakti",
  },
  description:
    "अभिव्यक्ति is a Marathi theater group dedicated to bringing powerful performances and storytelling to the stage.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-180x180.png",
  },
  keywords: [
    "theater",
    "drama",
    "performance",
    "stage",
    "plays",
    "अभिव्यक्ति",
    "abhivyakti",
  ],
  authors: [{ name: "Anu Kanetkar Mahabal" }, { name: "Jay Mahabal" }],
  openGraph: {
    title: "अभिव्यक्ति / Abhivyakti",
    description:
      "अभिव्यक्ति is a Marathi theater group dedicated to bringing powerful performances and storytelling to the stage.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "अभिव्यक्ति / Abhivyakti",
    description:
      "अभिव्यक्ति is a Marathi theater group dedicated to bringing powerful performances and storytelling to the stage.",
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
    <html lang="en" className="h-full">
      <body
        className={`${roboto.className} ${geistMono.variable} 
          ${playfair.variable}
          flex min-h-screen flex-col antialiased`}
      >
        <Navigation />
        <main className="flex-1 pt-[56px]">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
