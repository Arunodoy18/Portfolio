import type { Metadata } from "next";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Arunodoy Banerjee, Full Stack Developer and Open Source Contributor focused on scalable systems and 3D web experiences.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | AGENT ARUNODOY",
    description:
      "Learn about Arunodoy Banerjee's engineering background, full stack skillset, and GSoC 2026 goals.",
    url: `${siteUrl}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About | AGENT ARUNODOY",
    description:
      "Engineering profile of Arunodoy Banerjee: Full Stack, Open Source, and 3D Web.",
  },
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/about#profile-page`,
  url: `${siteUrl}/about`,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Arunodoy Banerjee",
    jobTitle: "Full Stack Developer & Open Source Contributor",
    sameAs: [
      "https://github.com/Arunodoy18",
      "https://www.linkedin.com/in/arunodoy-banerjee-214251342/",
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">About Arunodoy Banerjee</h1>
        <p className="text-[#b9bac5] leading-relaxed">
          I am a full stack developer and open source contributor focused on building software that is
          reliable, scalable, and usable in real-world environments. My work combines practical product
          engineering with systems thinking, from frontend architecture to backend workflows and cloud-ready
          delivery patterns.
        </p>
        <p className="text-[#b9bac5] leading-relaxed">
          I also build interactive 3D web experiences using Three.js and React Three Fiber, translating
          complex technical stories into engaging interfaces. I am actively preparing for GSoC 2026 and
          contributing to open source communities where maintainability, collaboration, and impact matter.
        </p>
        <h2 className="text-2xl font-semibold">Core Focus Areas</h2>
        <ul className="list-disc pl-6 space-y-2 text-[#b9bac5]">
          <li>Frontend engineering with Next.js, React, and TypeScript</li>
          <li>Backend service workflows and API-driven architecture</li>
          <li>3D web interfaces and performance-conscious rendering</li>
          <li>Open source contribution and developer tooling</li>
        </ul>
        <p className="text-[#b9bac5]">
          Profiles: <a className="underline" href="https://github.com/Arunodoy18">GitHub</a> and <a className="underline" href="https://www.linkedin.com/in/arunodoy-banerjee-214251342/">LinkedIn</a>
        </p>
      </div>
    </main>
  );
}
