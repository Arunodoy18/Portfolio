import type { Metadata } from "next";
import SubPage from "@/site/SubPage";
import { projects } from "@/site/data";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Arunodoy Banerjee: Zone (offline Bluetooth mesh), Cadence, Nura, Meow AI, Nakung AI, Your-Reviewer, RedZone, Vaayu and more.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects | Arunodoy Banerjee",
    description: "Apps, browser extensions, platforms and systems built by Arunodoy Banerjee.",
    url: `${siteUrl}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Projects | Arunodoy Banerjee",
    description: "Zone, Cadence, Nura, Meow AI, Nakung AI and more.",
  },
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/projects#collection-page`,
  url: `${siteUrl}/projects`,
  name: "Projects by Arunodoy Banerjee",
  hasPart: projects.map((p) => ({
    "@type": p.code ? "SoftwareSourceCode" : "CreativeWork",
    name: p.name,
    description: p.line,
    ...(p.live ? { url: p.live } : {}),
    ...(p.code ? { codeRepository: p.code } : {}),
    creator: { "@id": `${siteUrl}#person` },
  })),
};

export default function ProjectsPage() {
  return (
    <SubPage
      plate="05 — WORKS"
      title="WORKS"
      lead="Things built to be used: apps that work with no network, extensions that sit beside you while you learn, and the systems underneath them."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} />
      <ol className="space-y-px bg-ink/15">
        {projects.map((p, i) => (
          <li key={p.slug} className="grid gap-4 bg-paper py-8 md:grid-cols-[80px_1fr_220px]">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink/45">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-serif text-[clamp(30px,3vw,44px)] italic leading-none">{p.name}</h2>
              <p className="mt-2 font-serif text-[17px] text-ink/85">{p.line}</p>
              <p className="mt-3 max-w-[70ch] text-[14px] leading-relaxed text-ink/70">{p.body}</p>
            </div>
            <div className="font-mono text-[10px] leading-relaxed tracking-[0.15em] text-ink/60">
              <p>
                {p.kind.toUpperCase()} · {p.year}
              </p>
              <p className="mt-2">{p.stack.join(" · ").toUpperCase()}</p>
              <p className="mt-3 flex gap-4 text-ink">
                {p.live && (
                  <a className="link-u" href={p.live}>
                    VISIT ↗
                  </a>
                )}
                {p.code && (
                  <a className="link-u" href={p.code}>
                    SOURCE ↗
                  </a>
                )}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SubPage>
  );
}
