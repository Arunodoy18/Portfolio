import type { Metadata } from "next";
import SubPage from "@/site/SubPage";
import { metaDescriptions, profile } from "@/site/data";
import { alternatesFor, breadcrumbs, graph, siteUrl } from "@/site/seo";

export const metadata: Metadata = {
  title: "Privacy",
  description: metaDescriptions.privacy,
  alternates: alternatesFor("/privacy"),
};

const schema = graph(
  { "@type": "WebPage", "@id": `${siteUrl}/privacy`, url: `${siteUrl}/privacy`, name: "Privacy · Arunodoy Banerjee", dateModified: "2026-11-26" },
  breadcrumbs([{ name: "Privacy", path: "/privacy" }]),
);

export default function PrivacyPage() {
  return (
    <SubPage plate="PRIVACY · LAST UPDATED 26 NOVEMBER 2026" title="PRIVACY" lead="A personal website that does not watch you. Here is everything it keeps, and where.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <div className="max-w-[68ch] space-y-8 text-[16px] leading-relaxed text-ink/85">
        <section>
          <h2 className="cast text-[28px] leading-none">No tracking</h2>
          <p className="mt-3">This site has no analytics, no advertising, no tracking cookies and no third-party scripts. Fonts and images are served from this site itself.</p>
        </section>
        <section>
          <h2 className="cast text-[28px] leading-none">What your browser keeps</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Day or night:</strong> if you switch the theme, your choice is kept in your browser for that visit only (session storage).</li>
            <li><strong>Sound:</strong> if you mute the walkway music, that choice is kept in your browser (local storage) so it stays muted next time.</li>
          </ul>
          <p className="mt-3">Neither is sent anywhere. Clearing your browser&rsquo;s site data removes both.</p>
        </section>
        <section>
          <h2 className="cast text-[28px] leading-none">Hosting</h2>
          <p className="mt-3">The site is hosted on Netlify, which, like any web host, processes standard request logs (such as IP address and user agent) to deliver pages and keep the service secure.</p>
        </section>
        <section>
          <h2 className="cast text-[28px] leading-none">Links to other sites</h2>
          <p className="mt-3">Links to GitHub, LinkedIn, LeetCode and project sites take you to services with their own privacy policies.</p>
        </section>
        <section>
          <h2 className="cast text-[28px] leading-none">Questions</h2>
          <p className="mt-3">
            Write to <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </section>
      </div>
    </SubPage>
  );
}
