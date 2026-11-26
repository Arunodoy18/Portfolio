/**
 * One source of truth for how search engines and answer engines see the site:
 * the person, the website, and helpers for breadcrumbs. Every page links back to the
 * same @id so all the structured data describes one entity.
 */
import { practice, profile, projects, recognition } from "./data";

export const siteUrl = "https://aruno.buildc3.tech";
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const fullName = "Arunodoy Banerjee";
export const jobTitle = "Software Engineer (Backend & AI)";
export const shortBio =
  "Arunodoy Banerjee is a backend and AI software engineer from India: founder of Zone, an incubated offline disaster-communication app, an AI automation developer at buildc3.tech, and a Computer Science (AI & ML) student at Sikkim Manipal Institute of Technology.";

export const sameAs = [profile.github, profile.linkedin, profile.leetcode];

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: fullName,
  givenName: "Arunodoy",
  familyName: "Banerjee",
  url: `${siteUrl}/`,
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/work/portrait.jpg`,
    caption: `${fullName}, portrait`,
  },
  jobTitle,
  description: shortBio,
  email: `mailto:${profile.email}`,
  nationality: { "@type": "Country", name: "India" },
  homeLocation: {
    "@type": "Place",
    name: profile.place,
    address: { "@type": "PostalAddress", addressLocality: "Rangpo", addressRegion: "Sikkim", addressCountry: "IN" },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sikkim Manipal Institute of Technology",
    address: { "@type": "PostalAddress", addressLocality: "Rangpo", addressRegion: "Sikkim", addressCountry: "IN" },
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    skills: practice.groups.flatMap((g) => g.items).join(", "),
  },
  knowsAbout: [
    "Backend engineering",
    "Distributed systems",
    "Bluetooth mesh networking",
    "Offline-first mobile apps",
    "Large language models",
    "Model Context Protocol",
    "Browser extensions",
    "Disaster management technology",
    ...practice.groups.flatMap((g) => g.items),
  ],
  sameAs,
  worksFor: [
    { "@type": "Organization", name: "buildc3.tech", url: "https://buildc3.tech", description: "AI Automation Developer, 2025 – present" },
    { "@id": `${siteUrl}/#zone` },
  ],
  award: recognition.slice(0, 2).map((r) => `${r.title}: ${r.detail}`),
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Advanced Software Engineering Job Simulation",
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: "Walmart Global Tech" },
    dateCreated: "2026-07",
  },
  makesOffer: { "@type": "Offer", description: "Open to internships, collaborations and engineering roles" },
};

/** Zone, the company: founded by him, incubated at AIC-SMUTBI */
export const zoneOrg = {
  "@type": "Organization",
  "@id": `${siteUrl}/#zone`,
  name: "Zone",
  url: "https://zone-thezone.vercel.app/",
  description: "An offline disaster-communication app: phones relay distress packets over a Bluetooth LE mesh when towers and the internet fail.",
  founder: { "@id": personId },
  foundingDate: "2026-07",
  foundingLocation: { "@type": "Place", name: "Sikkim Manipal Institute of Technology, Rangpo, Sikkim, India" },
  sameAs: ["https://github.com/Arunodoy18/TheZone"],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: `${siteUrl}/`,
  name: fullName,
  alternateName: "Arunodoy Banerjee — Engineering, as art",
  description: shortBio,
  inLanguage: "en",
  publisher: { "@id": personId },
  author: { "@id": personId },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

/** canonical URL plus hreflang (English, and x-default for everyone else) */
export const alternatesFor = (path: string) => {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;
  return { canonical: url, languages: { en: url, "x-default": url } };
};

export const projectUrl = (slug: string) => `${siteUrl}/projects/${slug}`;

export const projectList = {
  "@type": "ItemList",
  name: `Projects by ${fullName}`,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: projectUrl(p.slug),
    name: p.name,
  })),
};

/** wrap one or more nodes in a JSON-LD graph */
export const graph = (...nodes: object[]) => JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
