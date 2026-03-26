import type { Metadata } from "next";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project portfolio of Arunodoy Banerjee featuring full stack systems, AI tools, and 3D web applications.",
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: "Projects | AGENT ARUNODOY",
    description:
      "Explore shipped and active projects by Arunodoy Banerjee across AI, full stack engineering, and developer tooling.",
    url: `${siteUrl}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Projects | AGENT ARUNODOY",
    description:
      "Project showcase covering Smart Waste Management AI, Code Review Platform, and Nakung AI Assistant.",
  },
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/projects#collection-page`,
  url: `${siteUrl}/projects`,
  name: "Projects by Arunodoy Banerjee",
  hasPart: [
    {
      "@type": "CreativeWork",
      name: "Smart Waste Management AI",
      url: "https://wastifi.netlify.app/",
      creator: { "@id": `${siteUrl}#person` },
    },
    {
      "@type": "CreativeWork",
      name: "Code Review Platform",
      url: "https://yours-code-assitant.netlify.app/login",
      creator: { "@id": `${siteUrl}#person` },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "Nakung AI Assistant",
      codeRepository: "https://github.com/Arunodoy18/Nakung",
      creator: { "@id": `${siteUrl}#person` },
    },
  ],
};

const projects = [
  {
    name: "Smart Waste Management AI",
    summary:
      "Computer vision and IoT-driven waste classification platform for operational efficiency and lower manual sorting errors.",
    live: "https://wastifi.netlify.app/",
    source: "https://github.com/Arunodoy18",
  },
  {
    name: "Code Review Platform",
    summary:
      "High-performance review workflow platform supporting open-source contributor collaboration.",
    live: "https://yours-code-assitant.netlify.app/login",
    source: "https://github.com/Arunodoy18",
  },
  {
    name: "Nakung AI Assistant",
    summary:
      "AI-powered assistant focused on developer productivity, context-aware coding help, and better debugging flow.",
    live: "",
    source: "https://github.com/Arunodoy18/Nakung",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-[#b9bac5] leading-relaxed">
          This page documents selected projects built by Arunodoy Banerjee. Each project demonstrates a
          production-focused approach to architecture, maintainability, and user impact.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} className="border border-[#2a2b37] p-5 rounded-lg bg-[#111118]">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-[#b9bac5] mb-4">{project.summary}</p>
              <div className="flex gap-4 text-sm">
                {project.live ? (
                  <a className="underline" href={project.live} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                ) : null}
                <a className="underline" href={project.source} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
