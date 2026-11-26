import type { Metadata } from "next";
import Link from "next/link";
import SubPage from "@/site/SubPage";
import { projects } from "@/site/data";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SubPage plate="404 — OFF THE LETTERS" title="NOTHING HOLDS HERE" lead="This page fell through the gaps. It is rebuilt at its mark: start again from one of these.">
      <ul className="grid gap-x-8 gap-y-3 font-mono text-[12px] tracking-[0.14em] sm:grid-cols-2">
        <li><Link className="link-u" href="/">HOME · ENGINEERING, AS ART</Link></li>
        <li><Link className="link-u" href="/about">ABOUT ARUNODOY BANERJEE</Link></li>
        <li><Link className="link-u" href="/projects">ALL {projects.length} PROJECTS</Link></li>
        <li><Link className="link-u" href="/notes">NOTES</Link></li>
        <li><Link className="link-u" href="/contact">CONTACT</Link></li>
        <li><Link className="link-u" href="/projects/zone">ZONE · OFFLINE MESH APP</Link></li>
      </ul>
    </SubPage>
  );
}
