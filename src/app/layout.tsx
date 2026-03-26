import type { Metadata } from "next";
import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://aruno.buildc3.tech";
const personId = `${siteUrl}#person`;
const webSiteId = `${siteUrl}#website`;

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": webSiteId,
  name: "AGENT ARUNODOY Tactical Portfolio",
  url: siteUrl,
  inLanguage: "en",
  description:
    "Portfolio of Arunodoy Banerjee featuring full stack engineering, open-source work, and 3D web projects.",
  publisher: {
    "@id": personId,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: "Arunodoy Banerjee",
  alternateName: "Agent Arunodoy",
  jobTitle: "Full Stack Developer & Open Source Contributor",
  description:
    "Full Stack engineer focused on scalable systems, 3D web experiences, and open-source development. Preparing for GSoC 2026 and building production-ready software.",
  url: siteUrl,
  image: `${siteUrl}/window.svg`,
  sameAs: [
    "https://github.com/Arunodoy18",
    "https://www.linkedin.com/in/arunodoy-banerjee-214251342/",
  ],
  knowsAbout: [
    "Full Stack Development",
    "3D Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Three.js",
    "Distributed Systems",
    "Open Source",
    "Cloud Native Engineering",
  ],
};

const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [webSiteSchema, personSchema],
};

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "AGENT ARUNODOY | Tactical Portfolio",
    template: "%s | AGENT ARUNODOY",
  },
  description:
    "Production-focused software engineer specializing in full-stack systems, open-source contributions, and high-performance 3D web experiences.",
  keywords: [
    "Arunodoy Banerjee",
    "Full Stack Developer",
    "3D Web Developer",
    "Next.js Portfolio",
    "React Three Fiber",
    "GSoC 2026",
    "Open Source Contributor",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AGENT ARUNODOY | Tactical Portfolio",
    description:
      "Explore Arunodoy Banerjee's tactical portfolio: full-stack systems, 3D web engineering, open-source work, and GSoC-focused projects.",
    siteName: "AGENT ARUNODOY Portfolio",
    images: [
      {
        url: `${siteUrl}/window.svg`,
        width: 1200,
        height: 630,
        alt: "AGENT ARUNODOY Tactical Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGENT ARUNODOY | Tactical Portfolio",
    description:
      "Full Stack + 3D Web engineer building production-grade systems and open-source projects.",
    images: [`${siteUrl}/window.svg`],
    creator: "@Arunodoy18",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
        />
      </head>
      <body
        className={`${rajdhani.variable} ${shareTechMono.variable} antialiased bg-[#0a0a0f]`}
      >
        {children}
      </body>
    </html>
  );
}
