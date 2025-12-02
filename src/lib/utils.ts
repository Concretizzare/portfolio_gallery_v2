import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function lerpVector3(
  start: [number, number, number],
  end: [number, number, number],
  factor: number
): [number, number, number] {
  return [
    lerp(start[0], end[0], factor),
    lerp(start[1], end[1], factor),
    lerp(start[2], end[2], factor),
  ]
}

export function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

export function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const PROJECTS = [
  {
    id: 'ecommerce',
    slug: 'project-ecommerce',
    title: 'Antonio Lupi USA',
    subtitle: 'E-Commerce',
    description: 'Full-scale luxury e-commerce platform for Italian bathroom design brand. Enterprise-grade Shopify implementation with custom design system, complex variant management, and showroom integration.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS3', 'REST APIs'],
    color: '#1E3A5F',
    url: 'https://antoniolupiusa.com',
    client: 'Antonio Lupi USA',
    role: 'Lead Developer & Technical Architect',
    year: 2024,
    metrics: {
      products: '100+',
      variants: '2000+',
    },
    screenshot: '/assets/projects/ecommerce/homepage.png',
  },
  {
    id: 'hybrid',
    slug: 'project-hybrid',
    title: 'Luxury Design Warehouse',
    subtitle: 'Code + No-Code Platform',
    description: 'Full-stack luxury furniture platform built with Next.js 16 App Router, designed for Italian premium brands. Fully custom-coded architecture with Sanity CMS headless integration, enabling complete no-code content management for non-technical users while maintaining full developer control over the codebase.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Resend API', 'ISR'],
    color: '#8B7355',
    url: 'https://luxurydesignwarehouse.com',
    client: 'Luxury Design Warehouse',
    role: 'Full-Stack Developer & Technical Architect',
    year: 2024,
    metrics: {
      products: '50+',
      brands: '5',
    },
    screenshot: '/assets/projects/hybrid/homepage.png',
  },
  {
    id: 'boutique',
    slug: 'project-boutique',
    title: "Feelippo's",
    subtitle: 'Curated Timepieces • Long-form Storytelling',
    description: 'Editorial platform and digital showroom dedicated to vintage and high-end watches and jewelry. The site combines a visually led portfolio of standout pieces with in-depth articles that unpack the history, design, and cultural context behind each watch.',
    tech: ['Static HTML', 'CSS', 'Responsive Design'],
    color: '#E07A5F',
    url: 'https://feelippo.it',
    client: "Feelippo's Watches",
    role: 'Experience Designer & Editorial/Content Architect',
    year: 2024,
    screenshot: '/assets/projects/boutique/homepage.png',
  },
  {
    id: 'shipping',
    slug: 'project-shipping',
    title: 'Shipping Calculator',
    subtitle: 'Real-Time Rate Intelligence',
    description: 'Custom real-time shipping rate calculator for luxury Italian bathroom brand\'s US market with Telegram live notifications. Enterprise-grade Carrier Service API integrated with Shopify checkout, featuring dynamic FedEx rate calculations, intelligent warehouse routing, and White Glove delivery pricing based on weight tiers.',
    tech: ['Python', 'Flask', 'Shopify Carrier API', 'FedEx API', 'PostgreSQL', 'Vercel Serverless', 'Telegram Bot API'],
    color: '#7C3AED',
    url: null,
    client: 'Antonio Lupi USA',
    role: 'Lead Developer & System Architect',
    year: 2024,
    metrics: {
      scenarios: '5',
      warehouses: '5',
    },
    screenshot: '/assets/projects/shipping/homepage.png',
  },
  {
    id: 'ai-render',
    slug: 'project-ai-render',
    title: 'Smart Render',
    subtitle: 'AI Rendering Tool',
    description: 'AI-powered interior design visualization platform that transforms raw room photos into photorealistic rendered interiors. Users upload unfinished spaces, select premium materials from a curated library of 294 professional finishes, and receive stunning visualizations in seconds. Features advanced editing with point-and-click precision, multi-angle support, and complete design iteration workflow.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Google Gemini AI', 'Vercel Serverless'],
    color: '#F5F5F5',
    url: null,
    role: 'Full-Stack Developer & AI Integration Architect',
    year: 2024,
    metrics: {
      finishes: '290+',
      endpoints: '5',
    },
    screenshot: '/assets/projects/ai-render/homepage.png',
  },
  {
    id: 'logistics',
    slug: 'project-logistics',
    title: 'Logistics Management',
    subtitle: 'Container Optimization & Shipping Dashboard',
    description: 'End-to-end logistics optimization system for international furniture shipping. Features intelligent 3D bin-packing algorithms respecting furniture constraints, real-time multi-tab dashboard, automated PDF/Excel reporting, and AI-powered email generation for vendor coordination.',
    tech: ['Python', 'Pandas', 'Dash/Plotly', 'Scikit-learn', 'OpenAI API', 'ReportLab', 'OpenPyXL'],
    color: '#1B4332',
    url: null,
    client: 'Furniture Logistics',
    role: 'Full-Stack Developer & Algorithm Designer',
    year: 2024,
    metrics: {
      utilization: '87%+',
      tabs: '6',
    },
    screenshot: '/assets/projects/logistics/homepage.png',
  },
  {
    id: 'budget-dashboard',
    slug: 'project-budget-dashboard',
    title: 'Budget & Sales Dashboard',
    subtitle: 'Real-Time Performance Tracking',
    description: 'Interactive web dashboard for real-time monitoring of budget allocation, invoiced sales and commercial pipeline. Multi-vendor system with automatic monthly target calculations with day-precision and dynamic visualizations for management decision-making.',
    tech: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'PapaParse'],
    color: '#1E3A5F',
    url: null,
    client: 'Luxury Furniture Retailer',
    role: 'Full-Stack Developer',
    year: 2024,
    metrics: {
      vendors: '7+',
      transactions: '400+',
    },
    screenshot: '/assets/projects/budget-dashboard/homepage.png',
  },
  {
    id: 'profitability-analysis',
    slug: 'project-profitability-analysis',
    title: 'Profitability Analysis',
    subtitle: 'Margin Optimization System',
    description: 'Comprehensive profitability analysis system for interior design projects. Combines advanced Excel modeling, Python automation, and executive documentation to identify opportunity loss, analyze vendor performance, and drive strategic margin improvements.',
    tech: ['Excel', 'Python', 'OpenPyXL', 'Financial Modeling', 'Data Analysis'],
    color: '#40916C',
    url: null,
    client: 'Interior Design Firm',
    role: 'Financial Analyst & System Designer',
    year: 2024,
    metrics: {
      worksheets: '5',
      impact: '€248K+',
    },
    screenshot: '/assets/projects/profitability/homepage.png',
  },
] as const

export type Project = typeof PROJECTS[number]
