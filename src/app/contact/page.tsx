import type { Metadata } from "next";
import SubPage from "@/site/SubPage";
import { profile } from "@/site/data";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Arunodoy Banerjee for internships, collaboration, and full stack engineering opportunities.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact | Arunodoy Banerjee",
    description:
      "Get in touch with Arunodoy Banerjee for projects, internships, and engineering collaboration.",
    url: `${siteUrl}/contact`,
  },
  twitter: {
    card: "summary",
    title: "Contact | Arunodoy Banerjee",
    description: "Connect with Arunodoy Banerjee via email, GitHub, and LinkedIn.",
  },
};

export default function ContactPage() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, note: profile.email },
    { label: "GitHub", href: profile.github, note: "Arunodoy18" },
    { label: "LinkedIn", href: profile.linkedin, note: "arunodoy-banerjee" },
    { label: "LeetCode", href: profile.leetcode, note: "Arunodoy45" },
  ];
  return (
    <SubPage
      plate="06 — NOTES"
      title="CONTACT"
      lead="If it has to work when everything else doesn't, write to me. Open to internships, collaborations and engineering roles."
    >
      <ul>
        {links.map((l) => (
          <li key={l.label} className="border-t border-ink/15">
            <a href={l.href} className="group flex items-baseline justify-between py-4">
              <span className="cast text-[clamp(26px,3vw,44px)] leading-none">{l.label.toUpperCase()}</span>
              <span className="font-mono text-[11px] tracking-[0.12em] text-ink/60 group-hover:text-ink">{l.note} ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </SubPage>
  );
}
