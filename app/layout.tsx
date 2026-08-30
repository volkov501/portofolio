import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Arrashi Satyadi | Network & AIoT Engineer",
  description: "Bridging the gap between scalable enterprise network infrastructure and advanced autonomous aerial/IoT systems.",
  keywords: ["Arrashi Satyadi", "Network Engineer", "IoT Engineer", "AIoT", "Autonomous Drones", "VTOL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-background text-slate-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
