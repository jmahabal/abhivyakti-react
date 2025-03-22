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
  title: {
    default: "अभिव्यक्ति",
    template: "%s | अभिव्यक्ति",
  },
  description:
    "अभिव्यक्ति is a Marathi theater group dedicated to bringing powerful performances and storytelling to the stage.",
  keywords: [
    "theater",
    "drama",
    "performance",
    "stage",
    "plays",
    "अभिव्यक्ति",
    "abhivyakti",
  ],
  authors: [{ name: "अभिव्यक्ति" }],
  openGraph: {
    title: "अभिव्यक्ति",
    description:
      "अभिव्यक्ति is a Marathi theater group dedicated to bringing powerful performances and storytelling to the stage.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "अभिव्यक्ति",
    description:
      "अभिव्यक्ति is a Marathi theater group dedicated to bringing powerful performances and storytelling to the stage.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
