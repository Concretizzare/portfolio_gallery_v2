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

### Portfolio Categories

Homepage carousel with 4 categories, each opening a dedicated category page:

```typescript
const PORTFOLIO_CATEGORIES = [
  { id: 'sales-marketing', projectIds: ['ecommerce', 'hybrid', 'boutique'], showShowcase: true },  // 3 projects + Visual Excellence
  { id: 'finance', projectIds: ['budget-dashboard', 'profitability-analysis'] },                   // 2 projects
  { id: 'operations', projectIds: ['shipping', 'logistics'] },                                     // 2 projects
  { id: 'agent', projectIds: ['ai-render'], mcpProjects: true },                                   // 1 project + 2 MCP servers
]
```

### Category Pages Structure

Each category page has vertical scroll sections:
1. **Intro** - Category title, subtitle, description
2. **Projects** - Individual project cards (from projectIds)
3. **Visual Excellence** (Sales & Marketing only) - AI media showcase with playable video previews
4. **MCP Servers** (Agent & AI only) - Open source MCP server cards
5. **Contact** - Category-specific contact section

### Showcase Section

AI-powered media presentation (accessible from Sales & Marketing → Visual Excellence):
- Preview cards with click-to-play video functionality
- Full showcase modal with before/after comparisons
- Media assets stored in `public/showcase/` (reel1, reel2, reel3, reel4, vasca_modella)

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

Current projects (8 total):
- **ecommerce** - Antonio Lupi USA (E-Commerce)
- **hybrid** - Luxury Design Warehouse (Next.js + Sanity CMS)
- **boutique** - Feelippo's (Watches editorial)
- **shipping** - Shipping Calculator (Real-time rate API)
- **ai-render** - Smart Render (AI visualization)
- **logistics** - Logistics Management (Container optimization)
- **budget-dashboard** - Budget & Sales Dashboard
- **profitability-analysis** - Profitability Analysis

## Media Organization

### Homepage Card Media
Location: `public/assets/homepage/`
- Videos for homepage carousel cards (looping, muted)
- Duration: **7 seconds** (carousel auto-rotation interval: 6800ms)
- Naming convention: `{category-id}-card.mp4`

```
public/assets/homepage/
├── sales-marketing-card.mp4  # Camera movement video (7s, 2.2MB)
├── finance-card.mp4          # Dashboard animation (7s, 2.9MB)
├── operations-card.mp4       # Logistics video (7s, 5.2MB)
└── agent-card.mp4            # Agent & AI video (7s, 6.5MB)
```

### Project Screenshots
Location: `public/assets/projects/{project-id}/homepage.png`
- Dimensions: **2800 x 2160 px** (35:27 ratio, ~4:3)
- Format: PNG, RGB/RGBA

```
public/assets/projects/
├── ai-render/homepage.png
├── boutique/homepage.png
├── budget-dashboard/homepage.png
├── ecommerce/homepage.png
├── hybrid/homepage.png
├── logistics/homepage.png
├── profitability/homepage.png
└── shipping/homepage.png
```

### Showcase Media (AI-generated videos)
Location: `public/showcase/{reel-id}/`
- Original images + generated videos
- Video format: MP4

```
public/showcase/
├── reel1/          # Dynamic Motion
├── reel2/          # Camera Movement (also used for Sales & Marketing homepage card)
├── reel3/          # Creative Directions
├── reel4/          # Brand Storytelling
└── vasca_modella/  # Model Integration
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

## Contact Integration

### WhatsApp Floating Button
- Fixed bottom-right button (z-index 250)
- Opens WhatsApp chat: `https://wa.me/393275762477`
- Green (#25D366) with hover scale effect

## Design Guidelines

- **ALWAYS use `frontend-design` skill**: Any frontend modification (layout, styling, animations, components) MUST invoke the `frontend-design` skill before making changes. This is mandatory, not optional.
- **DO NOT modify the current design**: The existing portfolio gallery design/style is final and must not be changed
- **New sections only**: Style changes are allowed only for newly added sections

## Git Workflow

- Remote: `https://github.com/Concretizzare/portfolio_gallery_v2.git`
- **No AI traces**: Never include AI attribution in commits, code comments, or anywhere in the codebase. No "Generated with Claude", no "Co-Authored-By: Claude", no AI-related markers of any kind.
- **Documentation updates**: CLAUDE.md and README.md must be updated with every significant code change to stay in sync with the codebase.

## Deployment

- **Workflow**: Deploy via Vercel (connected to GitHub)
- **Always commit and push** to GitHub after changes: `https://github.com/Concretizzare/portfolio_gallery_v2.git`
- **No local-only work**: All changes must be committed and pushed to trigger Vercel deployment
- Development server: `npm run dev` (localhost:3000)
