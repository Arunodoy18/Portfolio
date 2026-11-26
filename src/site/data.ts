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

/** Notes on the plane: short pieces about the work, each placed by hand on a 3000 x 2300 board. */
export type Note = {
  id: string;
  kind: "Essay" | "Photographs";
  title: string;
  body: string;
  href?: string;
  link?: string;
  year: string;
  image?: string;
  x: number;
  y: number;
  w?: number;
};

export const notes: Note[] = [
  { id: "N-01", kind: "Essay", title: "Silence is a signal", body: "In a disaster the scary thing isn't a message. It's a phone that stops talking. So every Zone packet says when it will speak again.", href: "https://github.com/Arunodoy18/TheZone", link: "Read the source", year: "2026", image: "/work/zone.jpg", x: 110, y: 40 },
  { id: "N-02", kind: "Photographs", title: "Where the network forgets", body: "I study in the hills of Sikkim. Up here a dropped signal isn't an outage, it's the weather. That's why my things work offline.", year: "2026", image: "/work/hills.jpg", x: 640, y: 110 },
  { id: "N-03", kind: "Essay", title: "Talking, not tapping", body: "A streak teaches you to open an app. It doesn't teach you to speak. Cadence puts you in a real conversation from day one.", href: "https://github.com/Arunodoy18/Cadence", link: "Read the source", year: "2026", image: "/work/cadence.jpg", x: 1420, y: 560 },
  { id: "N-04", kind: "Essay", title: "Hints before answers", body: "The fastest way to stop learning is to be handed the answer. Nakung sits beside the problem and asks the next good question.", href: "https://github.com/Arunodoy18/Nakung", link: "Read the source", year: "2025", image: "/work/nakung.jpg", x: 2180, y: 600 },
  { id: "N-05", kind: "Essay", title: "Bring your own model", body: "My code reviews shouldn't depend on one company's mood. Your-Reviewer works with whatever model, and whatever tools, you trust.", href: "https://github.com/Arunodoy18/Your-reviewer", link: "Read the source", year: "2026", x: 90, y: 960 },
  { id: "N-06", kind: "Photographs", title: "The long way up", body: "Stone steps, tea gardens, too much green. The kind of walk where the ideas on this page sort themselves out.", year: "2026", image: "/work/steps.jpg", x: 660, y: 990, w: 300 },
  { id: "N-07", kind: "Essay", title: "Calibrated, not assumed", body: "When someone may move their home because of your number, the weights come from history, not a hunch. That was RedZone's one rule.", href: "https://github.com/Arunodoy18/SIH_2026", link: "Read the source", year: "2026", x: 90, y: 1560 },
  { id: "N-08", kind: "Essay", title: "A photo becomes a plan", body: "Nobody has the patience to log every meal. Nura takes a photo, a barcode or a sentence, and keeps a child's targets safe.", href: "https://github.com/Arunodoy18/NutTrack", link: "Read the source", year: "2026", image: "/work/nura.jpg", x: 2470, y: 1500 },
  { id: "N-09", kind: "Essay", title: "One engine, three readers", body: "A student, a campus and a city all want the same carbon number, told differently. Vaayu does the maths once and tells it three ways.", href: "https://github.com/Arunodoy18/campusCarbon", link: "Read the source", year: "2026", x: 1080, y: 2040 },
  { id: "N-10", kind: "Essay", title: "Snap it, sort it", body: "A bin is a two-second decision. Wastifi makes the call from a photo, and says how sure it is, so you can disagree with it.", href: "https://wastifi.netlify.app/", link: "Visit", year: "2025", image: "/work/wastifi.jpg", x: 1720, y: 2040 },
];

/** Things I keep going back to. */
export const taste = [
  { kind: "Game", title: "GTA V", meta: "Rockstar · 2013" },
  { kind: "Game", title: "GTA VI", meta: "Rockstar · 2026" },
  { kind: "Game", title: "BGMI", meta: "Krafton · 2021" },
  { kind: "Game", title: "Free Fire", meta: "Garena · 2017" },
  { kind: "Game", title: "Call of Duty", meta: "Activision · series" },
  { kind: "Music", title: "Haryanvi covers", meta: "on repeat" },
  { kind: "Music", title: "Bhaag Milkha Bhaag", meta: "soundtrack · 2013" },
  { kind: "Music", title: "Love Me", meta: "on repeat" },
  { kind: "Film", title: "F1", meta: "Joseph Kosinski · 2025" },
  { kind: "Film", title: "Oppenheimer", meta: "Christopher Nolan · 2023" },
  { kind: "Film", title: "Avengers: Endgame", meta: "Russo brothers · 2019" },
  { kind: "Film", title: "Avengers: Doomsday", meta: "Russo brothers · 2026" },
  { kind: "Film", title: "Ramayana", meta: "Nitesh Tiwari · 2026" },
] as const;

/** Facts for each project page, taken from the projects' own READMEs. Used by /projects/[slug] and the structured data. */
export const projectDetails: Record<string, { platform: string; category: string; facts: string[] }> = {
  zone: {
    platform: "Android",
    category: "CommunicationApplication",
    facts: [
      "A native Android app (Kotlin and Jetpack Compose) that forms an offline Bluetooth store-carry-forward mesh between phones during a disaster.",
      "No servers, no internet, no analytics and no downloaded map tiles: it runs the same in airplane mode.",
      "One APK with three modes chosen on first launch: Citizen, Responder and Map (for an emergency operations centre).",
      "A trapped person's phone broadcasts a 31-byte packet over Bluetooth Low Energy. Any phone in range copies it and rebroadcasts it with a hop count; duplicates are dropped by content hash, so the signal walks out of the zone in a rescuer's pocket.",
      "Every packet declares when the sender will transmit next, so the network can tell a phone that went quiet from a phone that was destroyed.",
      "Built for Avinya 2026, problem statements on ground-zero communication blackout and post-disaster information fog.",
    ],
  },
  cadence: {
    platform: "Android",
    category: "EducationalApplication",
    facts: [
      "A language-learning app built around speaking: \"Duolingo builds a habit. Cadence builds a speaker.\"",
      "Conversation with an AI partner from the first lesson, with gentle corrections on every sentence.",
      "Indian languages including Hindi, Marathi, Gujarati, Assamese, Malayalam and Kannada.",
      "Neural text-to-speech voices, speech-to-text with Whisper, and pronunciation scoring with Azure Pronunciation Assessment.",
      "A native Android app (Capacitor) whose screens ship inside the APK; only sign-in, conversation, speech and progress sync use the network.",
      "The API runs on Next.js with a Neon Postgres database, and the APK is rebuilt automatically on every push.",
    ],
  },
  nura: {
    platform: "Android",
    category: "HealthApplication",
    facts: [
      "An Android app for nutrition tracking for the whole family.",
      "Log food with a photo, a barcode or a few typed words; Nura works out calories and macros.",
      "Offline-first, with child-safe targets, meal plans and reminders driven by native Android alarms.",
      "Syncs with Health Connect.",
      "Built with Next.js 16, Drizzle ORM and Neon Postgres, with Gemini and Groq for the AI scans and Upstash Redis for rate limiting.",
      "The download page includes a live demo that runs the real food database, nutrition engine and meal planner in the browser.",
    ],
  },
  meow: {
    platform: "Chrome",
    category: "DeveloperApplication",
    facts: [
      "A zero-setup Chrome extension: a universal AI copilot for developers and technical learners.",
      "It detects what kind of page you are on and adapts: senior-level pull request review on GitHub and GitLab, hint-first tutoring on LeetCode, HackerRank, CodeChef and Codeforces.",
      "On StackOverflow it highlights the real answer and its caveats; on LinkedIn and job boards it gives career and skill-gap advice.",
      "Plain-language breakdowns of research papers on arXiv and Google Scholar, and quick-start notes on documentation sites.",
      "A side chat panel with multi-turn memory, backed by Cloudflare Workers.",
    ],
  },
  nakung: {
    platform: "Chrome",
    category: "EducationalApplication",
    facts: [
      "A Chrome extension that turns every LeetCode problem into a place to be taught, not told.",
      "A floating button opens a side-panel chat that recognises the problem you are solving.",
      "Partner mode guides with Socratic questions; Reviewer mode questions you like a FAANG-level interviewer.",
      "Powered by Llama 3.3 70B through Groq, behind a small serverless backend on Vercel.",
      "Keeps conversation history and highlights code, with one-click copy.",
    ],
  },
  "your-reviewer": {
    platform: "Web",
    category: "DeveloperApplication",
    facts: [
      "An open-source AI code review hub where you bring your own model: OpenAI, Claude, Groq or an open model.",
      "Connect your own Model Context Protocol (MCP) servers so the reviewing agent can use your internal tools.",
      "GitHub webhooks: raise a pull request and the agent analyses the diff and posts inline comments.",
      "A Python FastAPI backend with SQLAlchemy and asynchronous workers on Redis and Celery; a React and Tailwind front end.",
      "A VS Code extension is in progress.",
    ],
  },
  redzone: {
    platform: "Web",
    category: "GovernmentApplication",
    facts: [
      "Decision support for a District Disaster Management Authority in Sikkim, built for Smart India Hackathon 2026.",
      "Multi-hazard red zones (landslide, glacial lake outburst flood, seismic and flash flood) with weights calibrated on historical disaster loss rather than assumed.",
      "Landslide susceptibility from a RandomForest model; seismic hazard anchored to the 2011 magnitude 6.9 Sikkim earthquake.",
      "Carrying capacity and relocation priority per habitation; relocation solved as a capacitated assignment problem with SciPy and HiGHS.",
      "A 25-year cost-benefit view per settlement and an AI-drafted report narrative, built with Python, GeoPandas, scikit-learn and FastAPI.",
    ],
  },
  vaayu: {
    platform: "Web",
    category: "LifestyleApplication",
    facts: [
      "A carbon-footprint platform for India, built bottom-up.",
      "One calculation engine serves three roles: an individual logging daily habits, a campus with a dashboard, and a city or government body reading a region.",
      "Every logged day becomes one anonymised row in a dataset that does not exist today.",
      "Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Prisma and PostgreSQL, with Auth.js campus-email sign-in.",
    ],
  },
  talentsync: {
    platform: "Web",
    category: "BusinessApplication",
    facts: [
      "An AI career operating system that takes a job seeker from resume to interview pipeline.",
      "Resume parsing and structured editing, weighted ATS scoring, and semantic job matching that explains itself.",
      "AI resume tailoring, career roadmaps and skill-gap analysis.",
      "Built with Next.js, Prisma and Neon Postgres, OpenAI chat and embeddings, Razorpay subscriptions and scheduled functions.",
    ],
  },
  primer: {
    platform: "Android, iOS",
    category: "EducationalApplication",
    facts: [
      "An AI reading tutor for children aged five to nine.",
      "It listens to a child read aloud, scores accuracy, and writes the next story at their level, seeded with the words they struggled with.",
      "A parent dashboard shows streaks, accuracy trends and history.",
      "Built with Expo and React Native in TypeScript.",
    ],
  },
  youinst: {
    platform: "Web",
    category: "MultimediaApplication",
    facts: [
      "An autonomous studio that produces YouTube Shorts and Instagram Reels end to end.",
      "Writes 30 to 40 second scripts with a Groq LLM, voices them with Edge TTS and scores the hook for retention.",
      "Word-level captions from Whisper timestamps, burned in with ffmpeg, over AI-matched backgrounds.",
      "Uploads to YouTube Shorts with OAuth, with multi-user accounts.",
    ],
  },
  wastifi: {
    platform: "Web",
    category: "LifestyleApplication",
    facts: [
      "AI waste classification from a single photo, with confidence-aware recommendations.",
      "Five categories: recyclable, organic, electronic, hazardous and general.",
      "User dashboards, driver verification, map-based pickup tracking and environmental impact analytics.",
      "Built with FastAPI, React and PostgreSQL.",
    ],
  },
};

/** Questions people (and answer engines) ask, answered plainly. Used on /about with FAQPage structured data. */
export const faqs = [
  {
    q: "Who is Arunodoy Banerjee?",
    a: "Arunodoy Banerjee is a backend-focused software engineer from India and a Computer Science (AI & ML) student at Sikkim Manipal Institute of Technology. He builds offline-first Android apps, AI developer tools, browser extensions and the systems underneath them.",
  },
  {
    q: "What has Arunodoy Banerjee built?",
    a: "His projects include Zone, an offline Bluetooth mesh network for disasters; Cadence, a speaking-first language-learning app; Nura, family nutrition tracking on Android; Meow AI and Nakung AI, Chrome extensions for developers; Your-Reviewer, open-source AI code review; RedZone, hazard and relocation planning for Sikkim; and Vaayu, a carbon-footprint platform.",
  },
  {
    q: "What does Arunodoy Banerjee work with?",
    a: "Java, Python, TypeScript, Kotlin, C and C++ and SQL; Spring Boot, FastAPI, Next.js, React and Jetpack Compose; Postgres, Redis, Celery and Docker on Azure and Google Cloud; and large language models, retrieval, MCP and agents.",
  },
  {
    q: "Where is Arunodoy Banerjee based?",
    a: "He studies at Sikkim Manipal Institute of Technology in Rangpo, Sikkim, India (2024 to 2028).",
  },
  {
    q: "Is Arunodoy Banerjee open to internships or collaboration?",
    a: "Yes. He is open to internships, collaborations and engineering roles, and is preparing for Google Summer of Code 2026. The best way to reach him is by email at barun4927@gmail.com.",
  },
  {
    q: "What is Zone by Arunodoy Banerjee?",
    a: "Zone is a native Android app that lets phones pass a tiny distress signal from hand to hand over Bluetooth when every network is down, with no servers and no internet, until it walks out of the disaster zone in someone's pocket.",
  },
];
