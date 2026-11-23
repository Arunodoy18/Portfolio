import type { Metadata } from "next";
import SubPage from "@/site/SubPage";
import { practice, profile } from "@/site/data";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Arunodoy Banerjee, a backend-focused software engineer building offline mesh networks, AI developer tools and Android apps.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | Arunodoy Banerjee",
    description:
      "Arunodoy Banerjee's engineering background, skills, and what he is building next.",
    url: `${siteUrl}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About | Arunodoy Banerjee",
    description:
      "Engineering profile of Arunodoy Banerjee: backend, systems and AI.",
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
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/Arunodoy18",
      "https://www.linkedin.com/in/arunodoy-banerjee-214251342/",
    ],
  },
};

export default function AboutPage() {
  return (
    <SubPage
      plate="04 — ABOUT"
      title="ARUNODOY BANERJEE"
      lead="A backend-focused engineer who treats a system the way an artist treats a frame: what you leave out matters as much as what you put in."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-[15px] leading-relaxed text-ink/80">
          <p>
            I work mostly in Java, Python and distributed systems, and reach for Android, browser extensions and AI agents
            when the problem calls for it. I build software for the moments it is needed most: when the network is gone, when
            the page is confusing, when a habit needs to become a skill.
          </p>
          <p>
            I study Computer Science (AI &amp; ML) at Sikkim Manipal Institute of Technology, {profile.years}, and contribute to
            open source while preparing for GSoC 2026.
          </p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.1em]">
          {practice.groups.map((g) => (
            <div key={g.label} className="contents">
              <dt className="text-ink/45">{g.label.toUpperCase()}</dt>
              <dd>{g.items.join(" · ")}</dd>
            </div>
          ))}
          <dt className="text-ink/45">BASED IN</dt>
          <dd>{profile.place}</dd>
        </dl>
      </div>
    </SubPage>
  );
}
