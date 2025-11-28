# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS 4, Framer Motion
- React Three Fiber + Three.js + Drei (3D)
- Zustand (state management)

## Architecture Overview

Single-page portfolio with section-based scroll navigation and 3D background. All content renders as overlays on top of a React Three Fiber canvas.

### Section Flow

11 sections in order: `intro` → `services` → 5 projects → `opensource` → `showcase` → `about` → `contact`

```typescript
const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'services', label: 'Services' },         // 4-card service overview
  ...PROJECTS,                                    // 5 project sections
  { id: 'opensource', label: 'MCP Servers' },    // Open source MCP servers
  { id: 'showcase', label: 'Showcase' },         // AI media presentation
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
```

### Services Section

4-card overview before projects showing full consulting capabilities:
- **Sales & Marketing**: E-commerce, marketing automation, AI media generation
- **Finance**: P&L management, cash flow forecasting, analytics
- **Operations**: Container logistics, supply chain, scheduling
- **Agent & AI**: AI development, MCP servers, API integrations, Smart Render

### Showcase Section

AI-powered media presentation after MCP servers:
- Opens full-screen modal with before/after comparisons
- Showcases image-to-video generation and model integration
- Media assets stored in `public/showcase/` (reel1, reel3, reel4, vasca_modella)

Section order defined in `sections` array in `src/app/page.tsx`.

### State Management (Zustand)

**Navigation store** (`src/store/navigation.ts`):
- `currentSection`, `previousSection` - Track active section
- `isTransitioning` - Prevents rapid section changes during animation
- `cameraState`, `targetCameraState` - 3D camera position/target/fov per section
- `scrollAccumulator` - For touchpad gesture detection

**UI store** (`src/store/ui.ts`):
- Command palette, settings modal, loading state, audio toggle

### Scroll Navigation

Critical detection logic in `page.tsx`:
- **Mouse wheel**: `deltaY > 50` triggers immediate section snap
- **Touchpad**: `deltaY < 50`, accumulates until threshold (250) reached
- Scroll locked during transitions via `isTransitioning` state

### Project Modal & URL Routing

Hash-based routing for project modals:
```typescript
const projectHashMap = {
  ecommerce: 'antoniolupi', hybrid: 'luxury', boutique: 'feelippos',
  shipping: 'shippingapp', 'ai-render': 'smartrender'
}
```
- Opening project: `pushState` with `#hashname`
- Back button: `popstate` listener closes modal

### 3D Layer (`src/components/3d/`)

- `Scene.tsx` - Canvas with Suspense, dynamically imported (no SSR)
- `Experience.tsx` - Camera lerping between states on `useFrame`
- `OpticalInstrument.tsx` - Aperture blades animate based on active section
- Each section has defined `CameraState` (position, target, fov) in `CAMERA_STATES`

### Keyboard Shortcuts

Defined in `src/hooks/useKeyboardNavigation.ts`:
- `↑`/`↓`, `j`/`k`, `←`/`→` - Navigate sections
- `1-5` - Jump to specific project
- `Home`/`End` - Landing/contact
- `Cmd/Ctrl+K` - Command palette
- `Esc` - Close modals

### Project Data

All projects defined in `PROJECTS` array in `src/lib/utils.ts`. Structure:
```typescript
{ id, slug, title, subtitle, description, tech[], color, url?, client, role, year, metrics?, screenshot }
```

### Unused: Studio Mode

`src/components/studio/` has a macOS-style window UI - not currently active.

## API Endpoints

### POST /api/contact

Resend API integration. Body: `{ name, email, message }`. Sends via `onboarding@resend.dev` with user email as reply-to.

## Environment Variables

```
RESEND_API_KEY=...
CONTACT_EMAIL=your-inbox@example.com
```

## Design Guidelines

- **DO NOT modify the current design**: The existing portfolio gallery design/style is final and must not be changed
- **New sections only**: Style changes are allowed only for newly added sections
- **Frontend skill required**: All frontend modifications MUST use the `frontend-design` skill

## Git Workflow

- Remote: `https://github.com/Concretizzare/portfolio_gallery_v2.git`
- **No AI traces**: Never include AI attribution in commits, code comments, or anywhere in the codebase. No "Generated with Claude", no "Co-Authored-By: Claude", no AI-related markers of any kind.
- **Documentation updates**: CLAUDE.md and README.md must be updated with every significant code change to stay in sync with the codebase.

## Deployment

- **Current workflow**: Local development only, no Vercel deployment
- Commit changes to GitHub: `https://github.com/Concretizzare/portfolio_gallery_v2.git`
- Run server locally with `npm run dev`
