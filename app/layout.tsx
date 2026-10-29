import type { Metadata } from "next";
import { Inter, Fira_Code, Barlow, Barlow_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://volkovindustry.online"),
  title: "Arrashi Satyadi | Network & AIoT Engineer",
  description: "Bridging the gap between scalable enterprise network infrastructure and advanced autonomous aerial/IoT systems.",
  keywords: [
    "Arrashi Satyadi",
    "Network Engineer",
    "IoT Engineer",
    "AIoT",
    "Autonomous Drones",
    "VTOL",
    "Infrastructure Architect",
    "Cisco",
    "VMware",
    "AI Server Infrastructure",
  ],
  authors: [{ name: "Arrashi Satyadi" }],
  creator: "Arrashi Satyadi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Arrashi Satyadi | Network & AIoT Engineer",
    description: "Bridging the gap between scalable enterprise network infrastructure and advanced autonomous aerial/IoT systems.",
    siteName: "Arrashi Satyadi Portfolio",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Arrashi Satyadi — Network & AIoT Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arrashi Satyadi | Network & AIoT Engineer",
    description: "Bridging the gap between scalable enterprise network infrastructure and advanced autonomous aerial/IoT systems.",
    images: ["/og.jpg"],
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} ${barlow.variable} ${barlowCondensed.variable} font-sans bg-background text-slate-200 antialiased`}
      >
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
