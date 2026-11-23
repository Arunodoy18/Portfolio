export const profile = {
  first: "ARUNODOY",
  last: "BANERJEE",
  role: "ENGINEER",
  email: "barun4927@gmail.com",
  github: "https://github.com/Arunodoy18",
  linkedin: "https://www.linkedin.com/in/arunodoy-banerjee-214251342/",
  leetcode: "https://leetcode.com/u/Arunodoy45",
  place: "Rangpo, Sikkim, India",
  placeShort: "RANGPO",
  coords: "27.17°N · 88.53°E",
  timeZone: "Asia/Kolkata",
  school: "B.Tech CSE (AI & ML) · Sikkim Manipal Institute of Technology",
  years: "2024 — 2028",
};

export type Glyph = "rings" | "wave" | "planet" | "compass" | "cube" | "diamond" | "eye" | "grid";

export type Project = {
  slug: string;
  name: string;
  kind: "App" | "Extension" | "Platform" | "Agent" | "System";
  year: string;
  line: string;
  body: string;
  stack: string[];
  live?: string;
  code?: string;
  image?: string;
  glyph: Glyph;
};

export const projects: Project[] = [
  {
    slug: "zone",
    name: "Zone",
    kind: "App",
    year: "2026",
    line: "A phone network that works when every network is gone.",
    body:
      "Native Android app that forms an offline Bluetooth store-carry-forward mesh between phones during a disaster. A trapped person's phone broadcasts a 31-byte packet; any phone in range carries it and rebroadcasts it, so the signal walks out of the zone in a rescuer's pocket. Every packet declares when it will speak next, so the network can tell a phone that went quiet from a phone that was destroyed.",
    stack: ["Kotlin", "Jetpack Compose", "BLE mesh", "Offline-first"],
    live: "https://zone-thezone.vercel.app/",
    code: "https://github.com/Arunodoy18/TheZone",
    image: "/work/zone.jpg",
    glyph: "rings",
  },
  {
    slug: "cadence",
    name: "Cadence",
    kind: "App",
    year: "2026",
    line: "Duolingo builds a habit. Cadence builds a speaker.",
    body:
      "A language-learning app built around talking, not tapping. Real conversations with an AI partner, neural voices, speech-to-text and pronunciation scoring on every sentence, shipped as a native Android app with a Next.js API behind it.",
    stack: ["Next.js", "Capacitor", "Azure Speech", "Whisper", "Neon Postgres"],
    live: "https://cadence.buildc3.tech/",
    code: "https://github.com/Arunodoy18/Cadence",
    image: "/work/cadence.jpg",
    glyph: "wave",
  },
  {
    slug: "nura",
    name: "Nura",
    kind: "App",
    year: "2026",
    line: "Nutrition tracking for the whole family.",
    body:
      "An offline-first Android app that turns a photo, a barcode or a few typed words into calories and macros, with child-safe targets, meal plans, reminders driven by native alarms and Health Connect sync.",
    stack: ["Next.js 16", "Android", "Drizzle", "Gemini", "Upstash Redis"],
    live: "https://dietbuddy.buildc3.tech/",
    code: "https://github.com/Arunodoy18/NutTrack",
    image: "/work/nura.jpg",
    glyph: "planet",
  },
  {
    slug: "meow",
    name: "Meow AI",
    kind: "Extension",
    year: "2026",
    line: "A universal developer copilot that lives in the browser.",
    body:
      "A zero-setup Chrome extension that reads the page you are on and adapts: senior-level PR review on GitHub, hint-first tutoring on LeetCode, the real answer on StackOverflow, plain-language breakdowns on arXiv.",
    stack: ["Chrome Extension", "Cloudflare Workers", "LLMs"],
    code: "https://github.com/Arunodoy18/Meow",
    glyph: "eye",
  },
  {
    slug: "nakung",
    name: "Nakung AI",
    kind: "Extension",
    year: "2025",
    line: "Turns LeetCode into a place to be taught, not told.",
    body:
      "A Chrome extension that slides an AI partner into every LeetCode problem. Partner mode guides with Socratic questions; Reviewer mode interrogates you like a FAANG interviewer. Llama 3.3 70B via Groq behind a small serverless backend.",
    stack: ["Chrome Extension", "Groq", "Llama 3.3", "Vercel"],
    live: "https://nakung-backend.vercel.app/",
    code: "https://github.com/Arunodoy18/Nakung",
    image: "/work/nakung.jpg",
    glyph: "compass",
  },
  {
    slug: "your-reviewer",
    name: "Your-Reviewer",
    kind: "Platform",
    year: "2026",
    line: "Open-source AI code review. Bring your own model.",
    body:
      "Plug in any LLM, connect your own MCP servers and let an agent review every pull request through GitHub webhooks. FastAPI with async workers on the back, React on the front, a VS Code extension on the way.",
    stack: ["FastAPI", "Celery", "Redis", "React", "MCP"],
    code: "https://github.com/Arunodoy18/Your-reviewer",
    glyph: "diamond",
  },
  {
    slug: "redzone",
    name: "RedZone",
    kind: "System",
    year: "2026",
    line: "Hazard red zones and relocation priority for disaster authorities.",
    body:
      "Decision support for a District Disaster Management Authority in Sikkim: multi-hazard red zones calibrated on historical loss, a trained landslide model, carrying-capacity deficits and relocation solved as an optimisation problem. Built for SIH 2026.",
    stack: ["Python", "GeoPandas", "scikit-learn", "SciPy MILP", "FastAPI"],
    code: "https://github.com/Arunodoy18/SIH_2026",
    glyph: "grid",
  },
  {
    slug: "vaayu",
    name: "Vaayu",
    kind: "Platform",
    year: "2026",
    line: "A carbon-footprint platform for India, built bottom-up.",
    body:
      "One calculation engine serving three readers: a student logging daily habits, a campus rolling up a dashboard, and a city reading a region. Every logged day becomes one anonymised row in a dataset that does not exist today.",
    stack: ["Next.js 16", "Prisma", "Auth.js", "Postgres"],
    code: "https://github.com/Arunodoy18/campusCarbon",
    glyph: "cube",
  },
  {
    slug: "talentsync",
    name: "TalentSync",
    kind: "Platform",
    year: "2026",
    line: "A career operating system, from resume to interview.",
    body:
      "Resume parsing, weighted ATS scoring, semantic job matching with explanations, AI tailoring and skill-gap roadmaps, with subscriptions and scheduled jobs running underneath.",
    stack: ["Next.js", "OpenAI", "Prisma", "Razorpay"],
    code: "https://github.com/Arunodoy18/TalentSync",
    glyph: "rings",
  },
  {
    slug: "primer",
    name: "Primer",
    kind: "App",
    year: "2026",
    line: "An AI reading tutor for kids aged five to nine.",
    body:
      "Listens to a child read aloud, scores accuracy and writes tomorrow's story at their level, seeded with the words they struggled with today.",
    stack: ["Expo", "React Native", "TypeScript", "Speech"],
    code: "https://github.com/Arunodoy18/Primer",
    glyph: "wave",
  },
  {
    slug: "youinst",
    name: "YouInst",
    kind: "Agent",
    year: "2025",
    line: "An autonomous studio for Shorts and Reels.",
    body:
      "Writes the script, voices it, scores it, cuts it with word-level captions and uploads it, across niches and voices, without a human in the loop.",
    stack: ["Groq", "Edge TTS", "Whisper", "ffmpeg"],
    code: "https://github.com/Arunodoy18/YouInst-Automator",
    glyph: "planet",
  },
  {
    slug: "wastifi",
    name: "Wastifi",
    kind: "System",
    year: "2025",
    line: "Snap a photo, know where it goes.",
    body:
      "AI waste classification with confidence-aware recommendations across five categories, driver verification, pickup tracking and impact analytics.",
    stack: ["FastAPI", "React", "PostgreSQL", "Vision"],
    live: "https://wastifi.netlify.app/",
    image: "/work/wastifi.jpg",
    glyph: "compass",
  },
];

export const practice = {
  title: "BACKEND ENGINEERING & AI SYSTEMS",
  groups: [
    { label: "Languages", items: ["Java", "Python", "TypeScript", "C / C++", "SQL", "Kotlin"] },
    { label: "Frameworks", items: ["Spring Boot", "FastAPI", "Next.js", "React", "Node.js", "Compose"] },
    { label: "Systems", items: ["Postgres", "Redis", "Celery", "Docker", "Azure", "GCP"] },
    { label: "AI", items: ["LLMs", "RAG", "MCP", "Whisper", "Agents", "n8n"] },
  ],
};

export const images = ["/work/zone.jpg", "/work/nura.jpg", "/work/cadence.jpg", "/work/nakung.jpg", "/work/wastifi.jpg", "/work/zone-install.jpg"];
