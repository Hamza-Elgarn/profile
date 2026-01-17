<![CDATA[<div align="center">

# 🌌 TWISE OS | INTERACTIVE 3D PORTFOLIO

### *A Next-Generation Digital Experience*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r182-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

<br />

<img src="https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png" alt="Hero Preview" width="120" />

**Crafted by Hamza Elgarn**  
*Frontend Developer & Digital Artist*

[🚀 Live Demo](https://your-portfolio-url.vercel.app) • [📧 Contact Me](mailto:elgarnhamza2004@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/hamza-elgarn)

</div>

---

## ✨ Overview

**TWISE OS** is an immersive 3D portfolio experience that pushes the boundaries of web technology. Built with cutting-edge frameworks and featuring real-time 3D graphics, smooth scroll animations, and a futuristic holographic interface, this portfolio showcases the intersection of art and technology.

> 🎓 **Education:** Collège de Paris — Creative Design & Digital Arts

---

## 🛠️ Technology Stack

<table>
<tr>
<td align="center" width="150">

### Core
</td>
<td align="center" width="150">

### 3D & Animation
</td>
<td align="center" width="150">

### Styling
</td>
<td align="center" width="150">

### Tools
</td>
</tr>
<tr>
<td align="center">

![Next.js](https://img.shields.io/badge/-Next.js_16-000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/-React_19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)

</td>
<td align="center">

![Three.js](https://img.shields.io/badge/-Three.js-000?style=flat-square&logo=three.js)
![React Three Fiber](https://img.shields.io/badge/-R3F-000?style=flat-square&logo=three.js)
![GSAP](https://img.shields.io/badge/-GSAP_3-88CE02?style=flat-square&logo=greensock&logoColor=white)

</td>
<td align="center">

![Tailwind](https://img.shields.io/badge/-Tailwind_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)

</td>
<td align="center">

![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/-Vercel-000?style=flat-square&logo=vercel)
![pnpm](https://img.shields.io/badge/-pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)

</td>
</tr>
</table>

### Key Libraries

| Library | Purpose |
|---------|---------|
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Useful helpers for R3F |
| `@react-three/postprocessing` | Post-processing effects |
| `gsap` + `ScrollTrigger` | Premium scroll animations |
| `lenis` | Smooth scrolling experience |
| `howler` | Web audio management |
| `styled-components` | Dynamic CSS-in-JS |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **pnpm** (recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/twise-os-portfolio.git
cd twise-os-portfolio

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Run the development server
npm run dev
# or
pnpm dev
```

### 🌐 Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the magic! ✨

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── projects/          # Dynamic project pages
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── 3d/               # Three.js 3D components
│   │   ├── GlassCapsule.tsx
│   │   ├── HeroModel.tsx
│   │   ├── ParticleField.tsx
│   │   └── Scene.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── HolographicForm.tsx
│   └── ...
└── lib/                   # Utilities & configuration
    ├── projects.ts        # Project data
    ├── emailConfig.ts     # Email configuration
    └── soundEffects.ts    # Audio management
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Web3Forms API Key (get yours at https://web3forms.com)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here

# Contact Form Settings
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_FORM_FROM_NAME=Your Portfolio Name
```

> ⚠️ **Security Note:** Never commit `.env.local` to version control!

---

## 🌐 Deployment on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/twise-os-portfolio)

### Manual Deployment

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel Dashboard:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_FORM_FROM_NAME`
4. Deploy! 🚀

---

## 📜 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## ✨ Features

- 🎨 **Immersive 3D Experience** — Real-time WebGL graphics
- 🌊 **Smooth Scroll Animations** — GSAP-powered transitions
- 🎵 **Interactive Sound Design** — Immersive audio experience
- 📱 **Fully Responsive** — Optimized for all devices
- 🔒 **Security Hardened** — Production-ready security headers
- ⚡ **Performance Optimized** — Lazy loading & code splitting
- 🌙 **Dark Mode Native** — Sleek, futuristic aesthetic

---

## 👨‍💻 About the Developer

<div align="center">

**Hamza Elgarn**  
*Frontend Developer & Digital Artist*

🎓 **Education:** Collège de Paris — Creative Design & Digital Technologies

*Passionate about creating immersive digital experiences that blend creativity with cutting-edge technology.*

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/hamza-elgarn)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/hamza-elgarn)
[![Email](https://img.shields.io/badge/-Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:elgarnhamza2004@gmail.com)

</div>

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ and ☕ by [Hamza Elgarn](https://github.com/hamza-elgarn)**

*© 2024 TWISE OS. All rights reserved.*

</div>
]]>
