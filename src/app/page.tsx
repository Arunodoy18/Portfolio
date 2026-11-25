import Bio from "@/site/Bio";
import Hud from "@/site/Hud";
import Manifesto from "@/site/Manifesto";
import Notes from "@/site/Notes";
import Opening from "@/site/Opening";
import Forme from "@/site/Forme";
import Practice from "@/site/Practice";
import Taste from "@/site/Taste";
import Works from "@/site/Works";
import { profile, projects } from "@/site/data";

export default function Home() {
  return (
    <>
      <Hud />
      <main className="focus-in">
        {/* plain-text layer for screen readers and crawlers */}
        <div className="sr-only">
          <p>
            {profile.first} {profile.last} is a backend-focused software engineer from {profile.place}, studying Computer
            Science (AI &amp; ML) at Sikkim Manipal Institute of Technology and preparing for GSoC 2026.
          </p>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                {p.name}: {p.line}
              </li>
            ))}
          </ul>
        </div>
        <Opening />
        <Manifesto />
        <Forme />
        <Bio />
        <Works />
        <Practice />
        <Taste />
        <Notes />
      </main>
    </>
  );
}
