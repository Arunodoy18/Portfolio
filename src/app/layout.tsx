import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const siteUrl = "https://aruno.buildc3.tech";
const personId = `${siteUrl}#person`;
const webSiteId = `${siteUrl}#website`;
const title = "Arunodoy Banerjee — Engineering, as art";
const description =
  "Arunodoy Banerjee is a backend-focused engineer building offline mesh networks, AI developer tools, Android apps and the systems underneath them: Zone, Cadence, Nura, Meow AI, Nakung AI and more.";

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": webSiteId,
  name: "Arunodoy Banerjee",
  url: siteUrl,
  inLanguage: "en",
  description,
  publisher: { "@id": personId },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: "Arunodoy Banerjee",
  jobTitle: "Software Engineer",
  description,
  url: siteUrl,
  image: `${siteUrl}/work/portrait.jpg`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Sikkim Manipal Institute of Technology" },
  sameAs: ["https://github.com/Arunodoy18", "https://www.linkedin.com/in/arunodoy-banerjee-214251342/"],
  knowsAbout: [
    "Backend Engineering",
    "Distributed Systems",
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "Android",
    "Bluetooth Mesh Networking",
    "Large Language Models",
    "Browser Extensions",
  ],
};

const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [webSiteSchema, personSchema],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Arunodoy Banerjee" },
  description,
  keywords: [
    "Arunodoy Banerjee",
    "Software Engineer",
    "Backend Developer",
    "Zone offline mesh",
    "Cadence",
    "Nura",
    "Meow AI",
    "Nakung AI",
    "Portfolio",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Arunodoy Banerjee",
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: "Engineering, as art — Arunodoy Banerjee" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.jpg`],
  },
};

export const viewport: Viewport = { themeColor: "#f4f4f1" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
