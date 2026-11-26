import type { Metadata } from "next";
import Link from "next/link";
import SubPage from "@/site/SubPage";
import { experience, faqs, practice, profile, projects, recognition } from "@/site/data";
import { breadcrumbs, fullName, graph, jobTitle, personId, personSchema, shortBio, siteUrl, zoneOrg } from "@/site/seo";

export const metadata: Metadata = {
  title: { absolute: `About ${fullName} — ${jobTitle}` },
  description: shortBio,
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/about`,
    title: `About ${fullName}`,
    description: shortBio,
    firstName: "Arunodoy",
    lastName: "Banerjee",
    images: [{ url: `${siteUrl}/work/portrait.jpg`, alt: fullName }],
  },
  twitter: { card: "summary_large_image", title: `About ${fullName}`, description: shortBio, images: [`${siteUrl}/work/portrait.jpg`] },
};

const schema = graph(
  {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/about`,
    url: `${siteUrl}/about`,
    name: `About ${fullName}`,
    mainEntity: { "@id": personId },
    isPartOf: { "@id": `${siteUrl}/#website` },
  },
  personSchema,
  zoneOrg,
  {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  breadcrumbs([{ name: "About", path: "/about" }]),
);

export default function AboutPage() {
  return (
    <SubPage
      plate="04 — ABOUT"
      title={fullName.toUpperCase()}
      lead="A backend-focused engineer who treats a system the way an artist treats a frame: what you leave out matters as much as what you put in."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <div className="grid gap-10 md:grid-cols-[1fr_300px]">
        <div className="space-y-4 text-[16px] leading-relaxed text-ink/85">
          <p>{shortBio}</p>
          <p>
            I work mostly in Java, Python and distributed systems, and reach for Android, browser extensions and AI agents when the
            problem calls for it. I build software for the moments it is needed most: when the network is gone, when the page is
            confusing, when a habit needs to become a skill.
          </p>
          <p>
            Some of the work: <Link className="underline" href="/projects/zone">Zone</Link>, an offline Bluetooth mesh for disasters;{" "}
            <Link className="underline" href="/projects/cadence">Cadence</Link>, a speaking-first language app;{" "}
            <Link className="underline" href="/projects/nura">Nura</Link>, family nutrition on Android; and two Chrome extensions for
            developers, <Link className="underline" href="/projects/meow">Meow AI</Link> and{" "}
            <Link className="underline" href="/projects/nakung">Nakung AI</Link>. All {projects.length} are on the{" "}
            <Link className="underline" href="/projects">projects page</Link>.
          </p>
          <p>
            I study Computer Science (AI &amp; ML) at Sikkim Manipal Institute of Technology, {profile.years}, contribute to open source
            and am preparing for GSoC 2026.
          </p>
        </div>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/portrait.jpg" alt={`${fullName}, standing on stone steps in a garden in Sikkim`} width={720} height={960} className="w-full grayscale" />
          <figcaption className="mt-2 font-mono text-[10px] tracking-[0.18em] text-ink/50">{profile.place.toUpperCase()}</figcaption>
        </figure>
      </div>

      <h2 className="cast mt-16 text-[clamp(28px,3vw,44px)] leading-none">Experience</h2>
      <ol className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
        {experience.map((e) => (
          <li key={e.org} className="grid gap-3 py-6 md:grid-cols-[220px_1fr]">
            <div className="font-mono text-[11px] tracking-[0.12em] text-ink/60">
              <p>{e.when.toUpperCase()}</p>
              <p className="mt-1">{e.where.toUpperCase()}</p>
            </div>
            <div>
              <h3 className="text-[19px] font-medium">
                {e.role},{" "}
                <a href={e.href} className="underline" rel="noopener">
                  {e.org}
                </a>
              </h3>
              <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-ink/80">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="cast mt-16 text-[clamp(28px,3vw,44px)] leading-none">Recognition</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {recognition.map((r) => (
          <li key={r.title} className="border border-ink/20 p-4">
            <p className="font-medium">{r.title}</p>
            <p className="mt-1 text-[14px] text-ink/70">{r.detail}</p>
          </li>
        ))}
      </ul>

      <h2 className="cast mt-16 text-[clamp(28px,3vw,44px)] leading-none">What I work with</h2>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.1em]">
        {practice.groups.map((g) => (
          <div key={g.label} className="contents">
            <dt className="text-ink/45">{g.label.toUpperCase()}</dt>
            <dd>{g.items.join(" · ")}</dd>
          </div>
        ))}
        <dt className="text-ink/45">BASED IN</dt>
        <dd>{profile.place}</dd>
      </dl>

      <h2 className="cast mt-16 text-[clamp(28px,3vw,44px)] leading-none">Questions</h2>
      <dl className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
        {faqs.map((f) => (
          <div key={f.q} className="py-5">
            <dt className="text-[18px] font-medium">{f.q}</dt>
            <dd className="mt-2 max-w-[70ch] text-ink/75">{f.a}</dd>
          </div>
        ))}
      </dl>
    </SubPage>
  );
}
