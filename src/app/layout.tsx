import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { fullName, graph, personSchema, siteUrl, websiteSchema, zoneOrg } from "@/site/seo";

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

const title = `${fullName} — Software Engineer (Backend & AI)`;
const description =
  "Arunodoy Banerjee is a backend and AI software engineer from India, founder of Zone (incubated at AIC-SMUTBI) and AI automation developer at buildc3.tech. He builds offline-first Android apps, AI developer tools and browser extensions.";

// the person every page is about; the CI guard looks for this declaration here
const personNode = { ...personSchema, "@type": "Person" };

const rootStructuredData = graph(websiteSchema, personNode, zoneOrg);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${fullName}` },
  description,
  applicationName: fullName,
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  publisher: fullName,
  category: "technology",
  keywords: [
    "Arunodoy Banerjee",
    "Arunodoy",
    "Software Engineer",
    "Backend Developer",
    "AI Engineer",
    "Sikkim Manipal Institute of Technology",
    "Zone offline mesh network",
    "Cadence language app",
    "Nura nutrition app",
    "Meow AI Chrome extension",
    "Nakung AI LeetCode extension",
    "Zone founder",
    "AIC-SMUTBI",
    "buildc3",
    "LeadRadar",
    "Portfolio",
  ],
  alternates: { canonical: `${siteUrl}/` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    title: `${fullName} — Engineering, as art`,
    description,
    siteName: fullName,
    locale: "en_IN",
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: `Engineering, as art — ${fullName}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${fullName} — Engineering, as art`,
    description,
    images: [`${siteUrl}/og.jpg`],
  },
  // filled in from the environment once the site is verified in Google Search Console / Bing Webmaster Tools
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#f4f4f1" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="paper"
      suppressHydrationWarning
      className={`${archivo.variable} ${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            // day or night by the visitor's own clock (night: 19:00 - 05:59); a manual choice lasts for this visit only
            __html: `try{localStorage.removeItem("theme");var t=sessionStorage.getItem("theme");if(t!=="ink"&&t!=="paper"){var h=new Date().getHours();t=h>=19||h<6?"ink":"paper"}document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: rootStructuredData }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
