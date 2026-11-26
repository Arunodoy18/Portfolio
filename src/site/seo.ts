/**
 * One source of truth for how search engines and answer engines see the site:
 * the person, the website, and helpers for breadcrumbs. Every page links back to the
 * same @id so all the structured data describes one entity.
 */
import { practice, profile, projects } from "./data";

export const siteUrl = "https://aruno.buildc3.tech";
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const fullName = "Arunodoy Banerjee";
export const jobTitle = "Software Engineer (Backend & AI)";
export const shortBio =
  "Arunodoy Banerjee is a backend-focused software engineer from India and a Computer Science (AI & ML) student at Sikkim Manipal Institute of Technology, building offline-first Android apps, AI developer tools and the systems underneath them.";

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
  makesOffer: { "@type": "Offer", description: "Open to internships, collaborations and engineering roles" },
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
