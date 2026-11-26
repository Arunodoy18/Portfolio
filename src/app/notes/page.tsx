import type { Metadata } from "next";
import Link from "next/link";
import SubPage from "@/site/SubPage";
import { metaDescriptions, notes, webp } from "@/site/data";
import { alternatesFor, breadcrumbs, fullName, graph, personId, siteUrl } from "@/site/seo";

export const metadata: Metadata = {
  title: "Notes on Offline-First Software & AI",
  description: metaDescriptions.notes,
  alternates: alternatesFor("/notes"),
  openGraph: { type: "website", url: `${siteUrl}/notes`, title: `Notes · ${fullName}`, description: metaDescriptions.notes, images: [{ url: `${siteUrl}/og.jpg` }] },
  twitter: { card: "summary_large_image", title: `Notes · ${fullName}`, description: metaDescriptions.notes, images: [`${siteUrl}/og.jpg`] },
};

const schema = graph(
  {
    "@type": "Blog",
    "@id": `${siteUrl}/notes`,
    url: `${siteUrl}/notes`,
    name: `Notes by ${fullName}`,
    author: { "@id": personId },
    blogPost: notes.map((n) => ({
      "@type": "BlogPosting",
      "@id": `${siteUrl}/notes#${n.id.toLowerCase()}`,
      headline: n.title,
      articleBody: n.body,
      datePublished: `${n.year}-01-01`,
      author: { "@id": personId },
      ...(n.image ? { image: `${siteUrl}${n.image}` } : {}),
      ...(n.href ? { about: n.href.startsWith("/") ? `${siteUrl}${n.href}` : n.href } : {}),
    })),
  },
  breadcrumbs([{ name: "Notes", path: "/notes" }]),
);

export default function NotesPage() {
  return (
    <SubPage plate="06 — NOTES" title="NOTES" lead="Short pieces on what I build and why: offline-first software, AI that teaches instead of tells, and the hills I write it from.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <ol className="space-y-px bg-ink/15">
        {notes.map((n) => (
          <li key={n.id} id={n.id.toLowerCase()} className="grid gap-5 bg-paper py-8 md:grid-cols-[120px_1fr_200px]">
            <p className="font-mono text-[11px] tracking-[0.2em] text-ink/65">
              {n.id}
              <br />
              {n.kind.toUpperCase()}
            </p>
            <article>
              <h2 className="text-[28px] font-medium leading-tight">{n.title}</h2>
              <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed text-ink/80">{n.body}</p>
              {n.href && (
                <p className="mt-3 font-mono text-[11px] tracking-[0.18em]">
                  {n.href.startsWith("/") ? (
                    <Link className="link-u" href={n.href}>{(n.link ?? "Read more").toUpperCase()} →</Link>
                  ) : (
                    <a className="link-u" href={n.href} rel="noopener">{(n.link ?? "Read more").toUpperCase()} ↗</a>
                  )}
                </p>
              )}
            </article>
            {n.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={webp(n.image)} alt={n.title} loading="lazy" decoding="async" width={400} height={n.kind === "Photographs" ? 500 : 280} className="w-full object-cover grayscale-[0.35]" />
            )}
          </li>
        ))}
      </ol>
    </SubPage>
  );
}
