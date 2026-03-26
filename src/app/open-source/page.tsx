import type { Metadata } from "next";

const siteUrl = "https://aruno.buildc3.tech";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Open source contribution focus and collaboration goals by Arunodoy Banerjee.",
  alternates: {
    canonical: `${siteUrl}/open-source`,
  },
  openGraph: {
    title: "Open Source | AGENT ARUNODOY",
    description:
      "Read about open-source contribution areas, engineering interests, and collaboration direction.",
    url: `${siteUrl}/open-source`,
  },
  twitter: {
    card: "summary",
    title: "Open Source | AGENT ARUNODOY",
    description: "Open-source contribution profile of Arunodoy Banerjee.",
  },
};

export default function OpenSourcePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Open Source</h1>
        <p className="text-[#b9bac5] leading-relaxed">
          Open source is a core part of my engineering growth strategy. I focus on contribution quality,
          maintainable pull requests, and practical improvements that help teams ship faster and with more
          confidence. My active preparation for GSoC 2026 is centered on collaborative development, codebase
          onboarding speed, and measurable technical outcomes.
        </p>
        <h2 className="text-2xl font-semibold">Contribution Themes</h2>
        <ul className="list-disc pl-6 space-y-2 text-[#b9bac5]">
          <li>Developer tooling and workflow automation</li>
          <li>Cloud-native and platform engineering practices</li>
          <li>Documentation quality and contributor onboarding</li>
          <li>Testing and reliability in production-facing systems</li>
        </ul>
        <p className="text-[#b9bac5]">
          Primary profile: <a className="underline" href="https://github.com/Arunodoy18">https://github.com/Arunodoy18</a>
        </p>
      </div>
    </main>
  );
}
