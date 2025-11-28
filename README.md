# Portfolio Gallery

Personal portfolio showcasing web development projects and open source contributions.

## Live Site

**Production**: [portfolio-gallery-v2.vercel.app](https://portfolio-gallery-v2.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment

Contact form emails are sent through the Resend REST API. Add a `.env.local` based on `.env.example` with:

```
RESEND_API_KEY=...
CONTACT_EMAIL=your-inbox@example.com
```

`CONTACT_EMAIL` is where messages are delivered. The email entered in the form is used as reply-to; the message is sent via `onboarding@resend.dev`.

## Featured Projects

### Web Development

1. **Antonio Lupi USA** - E-Commerce
   - Full-scale luxury e-commerce platform
   - 5,000+ products via CSV import
   - Custom frontend logic and variant management
   - Live at: [antoniolupiusa.com](https://antoniolupiusa.com)

2. **Luxury Design Warehouse** - Code + No-Code Platform
   - Next.js + Sanity CMS integration
   - Live at: [luxurydesignwarehouse.com](https://luxurydesignwarehouse.com)

3. **Feelippo's** - Typography & Restraint
   - Pure elegance through typography and whitespace
   - Live at: [feelippo.it](https://feelippo.it)

4. **Shipping SaaS** - Real-Time Rate Intelligence
   - Data visualization and dashboard complexity
   - Real-time shipping rate calculations

5. **Smart Render** - AI Rendering Tool
   - Before/after rendering with AI controls
   - Prompt-driven UI for designers

### Open Source

- **NetSuite MCP Server** - Model Context Protocol server for NetSuite ERP integration
- **Outlook MCP Server** - Email intelligence for AI workflows

## Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↑` `↓` / `j` `k` | Navigate sections |
| `1-5` | Jump to project |
| `Home` / `End` | Go to first/last section |
| `Cmd/Ctrl + K` | Open command palette |
| `Esc` | Close modal/palette |

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main gallery page with all sections
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles and CSS variables
│   └── api/contact/       # Contact form API endpoint
├── components/
│   ├── 3d/                # React Three Fiber components
│   ├── sections/          # Section overlay components
│   ├── studio/            # Alternative macOS-style UI
│   └── ui/                # Header, Navigation, CommandPalette
├── hooks/
│   ├── useScrollNavigation.ts
│   └── useKeyboardNavigation.ts
├── store/
│   ├── navigation.ts      # Section navigation state (Zustand)
│   └── ui.ts              # UI state (loading, modals)
└── lib/
    └── utils.ts           # Project data and utilities
```

## Contact

- Email: utentegpt4@gmail.com
- GitHub: [Concretizzare](https://github.com/Concretizzare/)
- LinkedIn: [Luca Franchi](https://www.linkedin.com/in/luca-franchi-325b83198)
