# 3D Portfolio - Software Engineer

A modern, immersive 3D portfolio website built with Next.js, React Three Fiber, and Framer Motion. Features scroll-driven 3D animations, interactive holographic elements, and smooth transitions.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **3D Graphics:** React Three Fiber, Three.js, @react-three/drei
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Icons:** Lucide React

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Troubleshooting

**Port 3000 already in use?**
```bash
# On Windows PowerShell
Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Then retry
npm run dev
```

The dev server is configured to explicitly bind to port 3000. If you see "port already in use", another process (possibly another Next.js project) is running. Stop it first.

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── layout.tsx    # Root layout with fonts
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── three/        # 3D components (Canvas, Scene, etc.)
│   │   └── sections/     # Section overlays (Hero, About, etc.)
│   └── ui/               # Reusable UI components
├── public/               # Static assets
└── package.json
```

## 🎨 Features

- **Scroll-Driven 3D Scenes:** Navigate through different sections with smooth scroll-based animations
- **Interactive 3D Elements:**
  - Animated torus geometry
  - Holographic avatar
  - Skills orbit visualization
  - 3D project cards
  - Open source contribution nodes
- **Responsive Design:** Optimized for all screen sizes
- **Dark Theme:** Sleek dark color scheme with blue accents
- **Performance Optimized:** Suspense boundaries, dynamic imports, and efficient rendering

## 🛠️ Scripts

- `npm run dev` - Start development server on port 3000 (with port conflict check)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Deployment

This project is configured for deployment to any Node.js hosting platform. No external services are required.

### Build Output
```bash
npm run build
```
Creates an optimized production build in `.next/`

### Production Server
```bash
npm start
```
Starts the Next.js production server on port 3000

## 📝 Development Notes

- All 3D components use client-side rendering (`"use client"`)
- Scroll controls use 6 pages (configurable in Experience.tsx)
- Camera FOV is set to 45° for optimal perspective
- Fog and color gradients create depth

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Ensure `npm run build` succeeds
4. Test with `npm run dev`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

