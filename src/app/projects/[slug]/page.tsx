import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPage from "@/site/SubPage";
import { projectDetails, projects } from "@/site/data";
import { breadcrumbs, fullName, graph, personId, projectUrl, siteUrl } from "@/site/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

// short, search-shaped titles (Google shows about 60 characters)
const seoTitle: Record<string, string> = {
  zone: "Zone — Offline Bluetooth Mesh Network App",
  cadence: "Cadence — Speaking-First Language Learning App",
  nura: "Nura — Family Nutrition Tracking App",
  meow: "Meow AI — AI Copilot Chrome Extension",
  nakung: "Nakung AI — LeetCode AI Tutor Extension",
  "your-reviewer": "Your-Reviewer — Open-Source AI Code Review",
  redzone: "RedZone — Disaster Hazard & Relocation Planning",
  vaayu: "Vaayu — Carbon Footprint Platform for India",
  talentsync: "TalentSync — AI Career Operating System",
  primer: "Primer — AI Reading Tutor for Kids",
  youinst: "YouInst — Autonomous Shorts & Reels Studio",
  wastifi: "Wastifi — AI Waste Classification App",
};

const kindLabel = { App: "app", Extension: "browser extension", Platform: "platform", System: "system", Agent: "AI agent" } as const;

/** "an Android app", "a Chrome browser extension", "a web platform" */
function describe(kind: keyof typeof kindLabel, platform?: string) {
  const phrase = `${platform && platform !== "Web" ? `${platform.split(",")[0]} ` : platform === "Web" ? "web " : ""}${kindLabel[kind]}`;
  return `${/^[aeiou]/i.test(phrase) ? "an" : "a"} ${phrase}`;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const d = projectDetails[slug];
  const title = seoTitle[slug] ?? `${p.name} — ${p.line.replace(/\.$/, "")}`;
  const description = `${p.name} is ${describe(p.kind, d?.platform)} by ${fullName}. ${p.body}`.slice(0, 300);
  const image = p.image ? `${siteUrl}${p.image}` : `${siteUrl}/og.jpg`;
  return {
    title,
    description,
    alternates: { canonical: projectUrl(slug) },
    keywords: [p.name, `${p.name} app`, fullName, ...p.stack],
    openGraph: { type: "article", url: projectUrl(slug), title: `${p.name} · ${fullName}`, description, images: [{ url: image, alt: `${p.name} by ${fullName}` }] },
    twitter: { card: "summary_large_image", title: `${p.name} · ${fullName}`, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const d = projectDetails[slug];
  const others = projects.filter((x) => x.slug !== slug);

  const qa = [
    { q: `What is ${p.name}?`, a: `${p.name} is ${describe(p.kind, d?.platform)} built by ${fullName}. ${p.line} ${p.body}` },
    { q: `What is ${p.name} built with?`, a: `${p.name} is built with ${p.stack.join(", ")}.` },
    ...(p.live || p.code
      ? [{ q: `Where can I try ${p.name} or read its code?`, a: [p.live && `You can try it at ${p.live}.`, p.code && `The source is on GitHub at ${p.code}.`].filter(Boolean).join(" ") }]
      : []),
  ];

  const app = {
    "@type": p.code && !p.live ? "SoftwareSourceCode" : "SoftwareApplication",
    "@id": `${projectUrl(slug)}#software`,
    name: p.name,
    description: `${p.line} ${p.body}`,
    url: p.live ?? projectUrl(slug),
    ...(p.code ? { codeRepository: p.code } : {}),
    ...(p.image ? { image: `${siteUrl}${p.image}`, screenshot: `${siteUrl}${p.image}` } : {}),
    ...(d && !(p.code && !p.live) ? { applicationCategory: d.category, operatingSystem: d.platform, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } } : {}),
    ...(p.code && !p.live ? { programmingLanguage: p.stack.slice(0, 3) } : {}),
    keywords: p.stack.join(", "),
    dateCreated: p.year,
    author: { "@id": personId },
    creator: { "@id": personId },
  };
  const faq = {
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
  const page = {
    "@type": "WebPage",
    "@id": projectUrl(slug),
    url: projectUrl(slug),
    name: `${p.name} · ${fullName}`,
    about: { "@id": `${projectUrl(slug)}#software` },
    author: { "@id": personId },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return (
    <SubPage plate={`04 — WORKS · ${p.kind.toUpperCase()} · ${p.year}`} title={p.name.toUpperCase()} lead={p.line}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph(page, app, faq, breadcrumbs([{ name: "Projects", path: "/projects" }, { name: p.name, path: `/projects/${slug}` }])) }}
      />
      <nav aria-label="Breadcrumb" className="-mt-8 mb-10 font-mono text-[10px] tracking-[0.18em] text-ink/50">
        <Link href="/" className="link-u">HOME</Link> / <Link href="/projects" className="link-u">PROJECTS</Link> / <span className="text-ink">{p.name.toUpperCase()}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <p className="max-w-[62ch] text-[17px] leading-relaxed text-ink/85">{p.body}</p>
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={`${p.name} by ${fullName}: screenshot`} width={1440} height={900} className="mt-8 w-full border border-ink/15" loading="lazy" />
          )}
          {d && (
            <>
              <h2 className="cast mt-12 text-[clamp(28px,3vw,44px)] leading-none">How it works</h2>
              <ul className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/85">
                {d.facts.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-[0.6em] h-[6px] w-[6px] shrink-0 bg-ink" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="cast mt-12 text-[clamp(28px,3vw,44px)] leading-none">Questions</h2>
          <dl className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
            {qa.map((x) => (
              <div key={x.q} className="py-4">
                <dt className="font-medium">{x.q}</dt>
                <dd className="mt-1 text-ink/75">{x.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="space-y-6 font-mono text-[11px] tracking-[0.12em]">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-ink/45">TYPE</dt>
            <dd>{p.kind.toUpperCase()}</dd>
            {d && (
              <>
                <dt className="text-ink/45">RUNS ON</dt>
                <dd>{d.platform.toUpperCase()}</dd>
              </>
            )}
            <dt className="text-ink/45">YEAR</dt>
            <dd>{p.year}</dd>
            <dt className="text-ink/45">BY</dt>
            <dd>
              <Link href="/about" className="link-u">{fullName.toUpperCase()}</Link>
            </dd>
          </dl>
          <div>
            <p className="text-ink/45">STACK</p>
            <ul className="mt-2 space-y-1">
              {p.stack.map((s) => (
                <li key={s}>{s.toUpperCase()}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            {p.live && (
              <a href={p.live} className="border border-ink px-3 py-2 hover:bg-ink hover:text-paper" rel="noopener">
                VISIT {p.name.toUpperCase()} ↗
              </a>
            )}
            {p.code && (
              <a href={p.code} className="border border-ink px-3 py-2 hover:bg-ink hover:text-paper" rel="noopener">
                SOURCE ON GITHUB ↗
              </a>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-20 border-t border-ink/15 pt-8">
        <h2 className="font-mono text-[10px] tracking-[0.25em] text-ink/50">MORE WORK BY {fullName.toUpperCase()}</h2>
        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/projects/${o.slug}`} className="group block">
                <span className="font-serif text-[22px] italic group-hover:underline">{o.name}</span>
                <span className="block text-[13px] text-ink/60">{o.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SubPage>
  );
}
