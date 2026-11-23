import Link from "next/link";
import { profile } from "./data";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open Source" },
  { href: "/contact", label: "Contact" },
];

/** Plain, fast, crawlable pages in the same paper & ink language as the main site. */
export default function SubPage({
  plate,
  title,
  lead,
  children,
}: {
  plate: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper px-[5vw] pb-16 pt-6 text-ink">
      <header className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em]">
        <Link href="/" className="cast text-[14px] tracking-[0.02em]">
          {profile.first} {profile.last}
        </Link>
        <nav className="flex gap-5">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="link-u">
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto mt-[14vh] max-w-5xl">
        <p className="font-mono text-[10px] tracking-[0.25em] text-ink/50">{plate}</p>
        <h1 className="cast mt-3 text-[clamp(56px,10vw,160px)] leading-[0.82]">{title}</h1>
        <p className="mt-8 max-w-[38ch] font-serif text-[clamp(20px,2.2vw,32px)] font-light italic leading-snug text-ink/80">{lead}</p>
        <div className="mt-14">{children}</div>
      </main>
      <footer className="mx-auto mt-24 flex max-w-5xl justify-between border-t border-ink/15 pt-4 font-mono text-[10px] tracking-[0.18em] text-ink/55">
        <Link href="/" className="link-u">
          ← BACK TO THE LENS
        </Link>
        <span>
          © {new Date().getFullYear()} {profile.first} {profile.last}
        </span>
      </footer>
    </div>
  );
}
