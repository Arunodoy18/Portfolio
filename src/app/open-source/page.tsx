import type { Metadata } from "next";
import SubPage from "@/site/SubPage";
import { metaDescriptions, profile, projects } from "@/site/data";
import { alternatesFor, breadcrumbs, graph, personId, siteUrl as SITE } from "@/site/seo";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "Open Source",
  description: metaDescriptions["open-source"],
  alternates: alternatesFor("/open-source"),
  openGraph: {
    title: "Open Source | Arunodoy Banerjee",
    description:
      "Read about open-source contribution areas, engineering interests, and collaboration direction.",
    url: `${siteUrl}/open-source`,
  },
  twitter: {
    card: "summary",
    title: "Open Source | Arunodoy Banerjee",
    description: "Open-source contribution profile of Arunodoy Banerjee.",
  },
};

export default function OpenSourcePage() {
  const open = projects.filter((p) => p.code);
  return (
    <SubPage
      plate="05 — OPEN SOURCE"
      title="IN THE OPEN"
      lead="Most of what I build is public. Small, reviewable pull requests; documentation people can actually onboard from; tools that make other developers faster."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            { "@type": "WebPage", "@id": `${SITE}/open-source`, url: `${SITE}/open-source`, name: "Open source · Arunodoy Banerjee", about: { "@id": personId } },
            breadcrumbs([{ name: "Open source", path: "/open-source" }]),
          ),
        }}
      />
      <p className="mb-8 max-w-[60ch] text-[15px] leading-relaxed text-ink/80">
        I am preparing for GSoC 2026, with a focus on developer tooling, reliability and contributor onboarding. Everything below
        has its source on <a className="underline" href={profile.github}>GitHub</a>.
      </p>
      <ul className="grid gap-px bg-ink/15 sm:grid-cols-2">
        {open.map((p) => (
          <li key={p.slug} className="bg-paper p-5">
            <a href={p.code} className="group block">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink/65">
                {p.kind.toUpperCase()} · {p.year}
              </p>
              <p className="mt-2 font-serif text-[28px] italic leading-none group-hover:underline">{p.name}</p>
              <p className="mt-2 text-[14px] leading-snug text-ink/75">{p.line}</p>
            </a>
          </li>
        ))}
      </ul>
    </SubPage>
  );
}
