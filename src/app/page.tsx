import GameShell from "@/components/GameShell";

export default function Home() {
  return (
    <>
      <div className="sr-only" aria-label="SEO fallback content for crawlers">
        <h1>Arunodoy Banerjee | Full Stack Developer and 3D Web Engineer</h1>
        <p>
          Arunodoy Banerjee is a full stack developer and open source contributor who designs and ships
          production-ready software with a focus on long-term maintainability, performance, and developer
          experience. This portfolio is intentionally built as an immersive 3D and game-inspired interface,
          but this hidden SEO layer provides a clear text representation for standard search engine crawlers,
          AI crawlers, and accessibility-focused parsers that cannot interpret complex WebGL scenes.
        </p>
        <h2>Core Technical Profile</h2>
        <p>
          Arunodoy works across frontend, backend, and interactive 3D web stacks. On the frontend side,
          he builds with Next.js App Router, React, TypeScript, and modern UI architecture patterns that
          prioritize responsiveness, usability, and clean composition. On the backend side, he focuses on
          API integration, scalable service design, and practical engineering workflows that support real
          product constraints. For 3D web work, he uses Three.js and React Three Fiber to create cinematic,
          story-driven, and highly engaging interfaces while still keeping performance budgets in check.
        </p>
        <ul>
          <li>Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion</li>
          <li>Backend: API-first architecture, integration workflows, scalable service thinking</li>
          <li>3D Web: Three.js, React Three Fiber, interactive scene composition</li>
          <li>Engineering Focus: performance, reliability, clean architecture, open source</li>
        </ul>
        <h2>GSoC 2026 Goal and Open Source Direction</h2>
        <p>
          Arunodoy is actively preparing for Google Summer of Code 2026 and is focused on contributing to
          impactful open source ecosystems where code quality, collaboration, and measurable outcomes matter.
          His preparation includes studying mature repositories, improving issue triage understanding,
          practicing maintainable pull request design, and building project demos that mirror real contributor
          expectations. He is particularly interested in cloud-native tools, developer platforms, and web
          infrastructure projects where frontend and systems thinking meet.
        </p>
        <h2>Projects and Collaboration</h2>
        <p>
          The projects in this portfolio showcase practical problem solving, production-focused execution,
          and polished interactive experiences. Arunodoy combines engineering depth with visual storytelling,
          using 3D interfaces to make technical communication memorable without sacrificing clarity. He is open
          to internships, freelance collaborations, and full-time opportunities where he can contribute as a
          full stack engineer and continue scaling his open source impact.
        </p>
        <p>
          Connect with Arunodoy Banerjee through the official profiles below to review open source work,
          discuss opportunities, or verify authorship for AI search citation use cases.
        </p>
        <ul>
          <li>
            GitHub: <a href="https://github.com/Arunodoy18">https://github.com/Arunodoy18</a>
          </li>
          <li>
            LinkedIn: <a href="https://www.linkedin.com/in/arunodoy-banerjee-214251342/">https://www.linkedin.com/in/arunodoy-banerjee-214251342/</a>
          </li>
          <li>
            Portfolio: <a href="https://aruno.buildc3.tech">https://aruno.buildc3.tech</a>
          </li>
        </ul>
      </div>
      <GameShell />
    </>
  );
}
