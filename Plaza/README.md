# Srinirvana Grand Plaza

A production-grade luxury boutique hotel website built with Next.js 15, Framer Motion, and Claude AI.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion (scroll effects, page transitions, hover states)
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (display) + DM Sans (body)
- **AI**: Anthropic Claude API via Next.js API Route

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd srinirvana-grand-plaza
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` → your Anthropic API key
4. Deploy — Vercel handles everything automatically

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, About, Rooms preview, Testimonials |
| `/rooms` | Full rooms & suites listing with details |
| `/dining` | Dining venues and hotel amenities |
| `/contact` | Contact info, map, and reservation enquiry form |

## Features

- **AI Concierge**: Floating chat bubble powered by Claude — answers questions about rooms, pricing, amenities, and more
- **Cinematic Hero**: Full-screen parallax hero with Framer Motion scroll effects
- **Smooth Animations**: All sections animate on scroll with staggered reveals
- **Responsive**: Fully mobile-first, tested from 375px to 1440px+
- **Dark Luxury Design**: Deep obsidian palette with warm gold accents
- **Navbar**: Transparent → frosted glass transition on scroll

## Project Structure

```
app/
├── layout.tsx          ← Root layout with fonts, Navbar, FloatingConcierge
├── page.tsx            ← Home page
├── rooms/page.tsx      ← Rooms & Suites
├── dining/page.tsx     ← Dining & Amenities
├── contact/page.tsx    ← Contact & Reservation form
└── api/concierge/      ← Claude AI API route
components/
├── Navbar.tsx          ← Fixed, scroll-aware navbar
├── FloatingConcierge.tsx ← AI chat widget
├── HeroSection.tsx     ← Full-screen cinematic hero
├── AboutSection.tsx    ← Hotel story section
├── RoomsPreview.tsx    ← Home page rooms grid
├── TestimonialsSection.tsx ← Guest reviews
├── FooterSection.tsx   ← Site footer
├── RoomCard.tsx        ← Reusable room card
├── SectionReveal.tsx   ← Scroll-triggered reveal wrapper
└── PageTransition.tsx  ← Page transition wrapper
lib/
└── hotelKnowledge.ts   ← Hotel data & AI system prompt
```
