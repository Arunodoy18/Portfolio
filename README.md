# Arunodoy Banerjee — Portfolio

> **Engineering future systems with mathematical precision**

An immersive 3D portfolio showcasing production-ready projects, open-source contributions, and my passion for building scalable distributed systems. Built with Next.js, React Three Fiber, and Framer Motion.

---

## 👨‍💻 About Me

I'm **Arunodoy Banerjee**, a software engineer and open-source contributor specializing in:

- **Production-Ready Systems:** Building real-world applications end-to-end
- **High-Performance Backends:** Distributed architectures and scalable services
- **3D Web Interfaces:** Fluid, interactive experiences with Three.js
- **Open Source:** Contributing to cloud-native tools and infrastructure

**Currently:** Open for **Internships**, **Freelance**, and **Full-time** opportunities. Actively preparing for **GSoC 2026** with focus on cloud-native computing.

**Core Tech:** Java / TypeScript / React / Next.js / Three.js / Distributed Systems

---

## 🚀 What This Portfolio Represents

This project is a **full-stack engineering showcase** demonstrating:

- **Advanced 3D Graphics:** Scroll-driven animations, holographic elements, and interactive 3D scenes
- **Modern React Patterns:** Server/client components, performance optimization, and smooth transitions
- **Production-Grade Code:** TypeScript, clean architecture, and deployment-ready configuration
- **Design + Engineering:** Beautiful UI meeting technical excellence

No backend required—everything runs as a self-contained Next.js application.

---

## 🛠️ Tech Stack

| Category          | Technologies                                |
|-------------------|---------------------------------------------|
| **Framework**     | Next.js 16 (App Router), React 19           |
| **3D Graphics**   | React Three Fiber, Three.js, @react-three/drei |
| **Animations**    | Framer Motion                               |
| **Styling**       | Tailwind CSS v4                             |
| **Language**      | TypeScript                                  |
| **Icons**         | Lucide React                                |

---

## 📦 Local Setup

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Arunodoy18/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

### Scripts

- `npm run dev` — Start development server (port 3000)
- `npm run build` — Create production build
- `npm start` — Start production server
- `npm run lint` — Run ESLint

### Troubleshooting

**Port 3000 already in use?**

```bash
# Windows PowerShell
Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Then retry
npm run dev
```

---

## 🌐 Deploy to Netlify

This portfolio is optimized for **Netlify** deployment with zero configuration.

### Quick Deploy (GitHub Integration)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Polish portfolio for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect your GitHub account and select this repository

3. **Configure build settings** (Netlify auto-detects these):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 18 or higher

4. **Deploy:**
   - Click **"Deploy site"**
   - Your portfolio will be live in ~2 minutes

### Environment Variables
None required. This is a static/SSR site with no external API calls.

### Custom Domain (Optional)
After deployment, go to **Domain settings** in Netlify to add your custom domain.

---

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── three/              # 3D components (Canvas, Lights, Scene)
│   │   ├── sections/           # Section overlays (Hero, About, Projects, etc.)
│   │   └── ui/                 # Reusable UI components (Button, Container)
│   └── sections/               # Legacy section components (unused)
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── netlify.toml                # Netlify deployment config
└── package.json
```

---

## ✨ Features

- **Scroll-Driven 3D Animation:** Navigate through sections with parallax effects
- **Interactive Elements:** Holographic avatar, skills orbit, 3D project cards
- **Responsive Design:** Optimized for desktop, tablet, and mobile
- **Performance Optimized:** Suspense boundaries, lazy loading, efficient rendering
- **Accessible:** ARIA labels, keyboard navigation, semantic HTML
- **Dark Theme:** Professional dark mode with gradient accents

---

## 🎯 What I Build

- **Smart Waste Management AI:** Computer vision + IoT for real-time waste classification
- **Code Review Platform:** High-performance tool for open-source collaboration
- **Open Source Contributions:** Cloud-native tools, DevOps, distributed systems

[View live projects →](https://frontend.jollysea-c5c0b121.centralus.azurecontainerapps.io)

---

## 📬 Get In Touch

- **Email:** barun4927@gmail.com
- **LinkedIn:** [arunodoy-banerjee](https://www.linkedin.com/in/arunodoy-banerjee-214251342/)
- **GitHub:** [@Arunodoy18](https://github.com/Arunodoy18)
- **Phone:** +91 9864446805

**Open to:** Build, Collaborate, Work

---

## 📄 License

This project is private and proprietary. All rights reserved © 2026 Arunodoy Banerjee.

