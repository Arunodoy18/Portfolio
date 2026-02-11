import type { Metadata } from "next";
import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AGENT ARUNODOY | Tactical Portfolio",
  description: "Production-focused software engineer specializing in scalable systems, open-source contributions, and high-performance architectures. Enter the arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${rajdhani.variable} ${shareTechMono.variable} antialiased bg-[#0a0a0f]`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
