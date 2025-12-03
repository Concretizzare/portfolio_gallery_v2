'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PROJECTS, PORTFOLIO_CATEGORIES, PROJECT_SLUG_MAP, getCategoryBySlug } from '@/lib/utils'
import type { PortfolioCategory } from '@/lib/utils'

// Showcase data for media presentation - ALL reels from presentation_marketing
const SHOWCASE_ITEMS = [
  {
    id: 'reel1',
    title: 'Reel 1 - Dynamic Motion',
    description: 'Transforming static photography into dynamic motion, breathing life into still imagery with cinematic movement.',
    originals: [
      '/showcase/reel1/frames/C5iKX3oMlyW_1.jpg',
      '/showcase/reel1/frames/C5iKX3oMlyW_2.jpg',
      '/showcase/reel1/frames/C5iKX3oMlyW_4.jpg',
    ],
    generated: [
      { src: '/showcase/reel1/kling_20251008_Image_to_Video_Maintain_a_14_0 (1).mp4', type: 'video' },
      { src: '/showcase/reel1/kling_20251008_Image_to_Video_Maintain_a_3_0 (1).mp4', type: 'video' },
    ],
  },
  {
    id: 'reel2',
    title: 'Reel 2 - Camera Movement',
    description: 'Creating dynamic camera movements and cinematic transitions from static photographs.',
    originals: ['/showcase/reel2/C2W36nes1Zt.jpg'],
    generated: [
      { src: '/showcase/reel2/kling_20251005_Image_to_Video_The_camera_5541_0 (1).mp4', type: 'video' },
    ],
  },
  {
    id: 'reel3',
    title: 'Reel 3 - Creative Directions',
    description: 'Multiple motion interpretations from the same source, exploring diverse creative directions.',
    originals: [
      '/showcase/reel3/Cy2jjpRMBe7_1.jpg',
      '/showcase/reel3/Cy2jjpRMBe7_2.jpg',
      '/showcase/reel3/Cy2jjpRMBe7_3.jpg',
    ],
    generated: [
      { src: '/showcase/reel3/kling_20251004_Image_to_Video_Maintain_a_4737_0 (1).mp4', type: 'video' },
      { src: '/showcase/reel3/kling_20251005_Image_to_Video__269_0.mp4', type: 'video' },
    ],
  },
  {
    id: 'reel4',
    title: 'Reel 4 - Brand Storytelling',
    description: 'Building cohesive visual narratives with sequential motion, perfect for brand storytelling.',
    originals: [
      '/showcase/reel4/C2UCZBToZJi_1.jpg',
      '/showcase/reel4/C2UCZBToZJi_2.jpg',
      '/showcase/reel4/C2UCZBToZJi_3.jpg',
    ],
    generated: [
      { src: '/showcase/reel4/kling_20251007_Image_to_Video_Maintain_a_5684_0 (1).mp4', type: 'video' },
      { src: '/showcase/reel4/kling_20251007_Image_to_Video_Maintain_a_5696_0 (1).mp4', type: 'video' },
      { src: '/showcase/reel4/kling_20251007_Image_to_Video_Maintain_a_5703_0 (1).mp4', type: 'video' },
    ],
  },
  {
    id: 'reel5',
    title: 'Reel 5 - Luxury Quality',
    description: 'Maintaining premium quality and aesthetic integrity in motion content for luxury brands.',
    originals: [
      '/showcase/reel5/frames/C4nMnxSL38V_2.jpg',
      '/showcase/reel5/frames/C4nMnxSL38V_3.jpg',
    ],
    generated: [
      { src: '/showcase/reel5/kling_20251007_Image_to_Video_Maintain_a_6051_0 (1).mp4', type: 'video' },
    ],
  },
  {
    id: 'reel6',
    title: 'Reel 6 - Cinematic Sequences',
    description: 'Professional-grade cinematic sequences with sophisticated motion dynamics and timing.',
    originals: [
      '/showcase/reel6/C7-4EpjIDEW_1.jpg',
      '/showcase/reel6/C7-4EpjIDEW_2.jpg',
      '/showcase/reel6/C7-4EpjIDEW_3.jpg',
    ],
    generated: [
      { src: '/showcase/reel6/kling_20251007_Image_to_Video_Maintain_a_5829_0 (1).mp4', type: 'video' },
      { src: '/showcase/reel6/kling_20251007_Image_to_Video_Maintain_a_5836_0 (1).mp4', type: 'video' },
    ],
  },
  {
    id: 'reel7',
    title: 'Reel 7 - Atmospheric Motion',
    description: 'Subtle atmospheric motion that enhances mood and emotional depth.',
    originals: [
      '/showcase/reel7/C_Kh-H6ouu3_1.jpg',
      '/showcase/reel7/C_Kh-H6ouu3_2.jpg',
    ],
    generated: [
      { src: '/showcase/reel7/kling_20251003_Image_to_Video__5677_0 (2).mp4', type: 'video' },
    ],
  },
  {
    id: 'reel8',
    title: 'Reel 8 - Full Pipeline',
    description: 'Complete creative pipeline: from source image to generated frames to animated videos.',
    originals: [
      '/showcase/reel8/original/BORGHI_bathtub_4.jpg',
      '/showcase/reel8/original/C3hbrhrsmrA.jpg',
    ],
    generatedFrames: [
      '/showcase/reel8/frame generated/1def.png',
      '/showcase/reel8/frame generated/2def.png',
      '/showcase/reel8/frame generated/3def.png',
      '/showcase/reel8/frame generated/4def.png',
      '/showcase/reel8/frame generated/5def.png',
    ],
    generated: [
      { src: '/showcase/reel8/all clip/kling_20251009_Image_to_Video_Maintain_a_5585_0.mp4', type: 'video' },
      { src: '/showcase/reel8/all clip/kling_20251009_Image_to_Video_Maintain_a_5590_0.mp4', type: 'video' },
      { src: '/showcase/reel8/all clip/kling_20251009_Image_to_Video_Maintain_a_5591_0.mp4', type: 'video' },
      { src: '/showcase/reel8/all clip/kling_20251009_Image_to_Video_Maintain_a_5595_0.mp4', type: 'video' },
    ],
  },
  {
    id: 'model-integration',
    title: 'Model Integration',
    description: 'Adding models and people seamlessly into existing scenes with precise composition and lighting.',
    originals: ['/showcase/vasca_modella/C_e4sQ7IGnx.jpg'],
    generated: [
      { src: '/showcase/vasca_modella/Generated Image October 05, 2025 - 4_15PM.png', type: 'image' },
      { src: '/showcase/vasca_modella/vlcsnap-2025-10-08-18h26m14s756.png', type: 'image' },
    ],
  },
  {
    id: 'reflex-post',
    title: 'Multi-Style Generation',
    description: 'From a single source, we generate multiple variations maintaining consistent subject identity while exploring diverse styles.',
    originals: [
      '/showcase/reflex_post/originals/C4nMnxSL38V_2.jpg',
      '/showcase/reflex_post/originals/Cy2jjpRMBe7_2.jpg',
      '/showcase/reflex_post/originals/C7-4EpjIDEW_2.jpg',
    ],
    generated: [
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 4_19PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 4_55PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 4_58PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 5_03PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 5_12PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 5_23PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 5_52PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 5_53PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 6_01PM.png', type: 'image' },
      { src: '/showcase/reflex_post/Generated Image October 08, 2025 - 6_09PM.png', type: 'image' },
    ],
  },
]

// Auto-rotate carousel component
function AutoRotateCarousel({
  activeIndex,
  setActiveIndex,
  totalItems,
  interval = 5000
}: {
  activeIndex: number
  setActiveIndex: (fn: (prev: number) => number) => void
  totalItems: number
  interval?: number
}) {
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev: number) => (prev + 1) % totalItems)
    }, interval)

    return () => clearInterval(timer)
  }, [activeIndex, setActiveIndex, totalItems, interval]) // activeIndex resets timer on manual change

  return null
}

// Props interface for GalleryPage
interface GalleryPageProps {
  initialCategory?: string | null
  initialProject?: string | null
  initialShowcase?: boolean
}

export default function GalleryPage({ initialCategory = null, initialProject = null, initialShowcase = false }: GalleryPageProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)

  // Compute initial state from props
  const computeInitialState = () => {
    if (initialCategory) {
      const category = getCategoryBySlug(initialCategory)
      if (category && initialProject) {
        const projectIndex = category.projectIds.indexOf(initialProject)
        return {
          selectedProject: initialProject,
          selectedCategory: null,  // Don't show category page when project is open
          projectParentCategory: category.id,
          categorySectionIndex: projectIndex >= 0 ? projectIndex + 1 : 0,
          showShowcase: false
        }
      } else if (category) {
        return {
          selectedProject: null,
          selectedCategory: initialShowcase ? null : category.slug,
          projectParentCategory: null,
          categorySectionIndex: 0,
          showShowcase: initialShowcase
        }
      }
    }
    return {
      selectedProject: null,
      selectedCategory: null,
      projectParentCategory: null,
      categorySectionIndex: 0,
      showShowcase: false
    }
  }

  const initialState = computeInitialState()

  const [selectedProject, setSelectedProject] = useState<string | null>(initialState.selectedProject)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [showShowcase, setShowShowcase] = useState(initialState.showShowcase)
  const [activeShowcaseItem, setActiveShowcaseItem] = useState(0)
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialState.selectedCategory)
  const [categorySectionIndex, setCategorySectionIndex] = useState(initialState.categorySectionIndex)
  const [projectParentCategory, setProjectParentCategory] = useState<string | null>(initialState.projectParentCategory)
  const [playingPreviewReel, setPlayingPreviewReel] = useState<string | null>(null)
  const [showcasePreviewIndex, setShowcasePreviewIndex] = useState(0)
  const closingByPop = useRef(false)
  const categoryClosingByPop = useRef(false)
  const showcaseClosingByPop = useRef(false)
  const isInitialMount = useRef(true)

  // Sync state with props when they change (for navigation between routes)
  useEffect(() => {
    const newState = computeInitialState()
    setSelectedProject(newState.selectedProject)
    setSelectedCategory(newState.selectedCategory)
    setProjectParentCategory(newState.projectParentCategory)
    setCategorySectionIndex(newState.categorySectionIndex)
    setShowShowcase(newState.showShowcase)
  }, [initialCategory, initialProject, initialShowcase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setFormStatus('idle'), 3000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 3000)
      }
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  const MCP_PROJECTS = [
    {
      id: 'netsuite-mcp',
      title: 'NetSuite MCP Server',
      description: 'Production-ready Model Context Protocol server for NetSuite ERP integration. Enables AI assistants to interact with NetSuite data through natural language.',
      tags: ['Open Source', 'TypeScript', 'ERP Integration'],
      color: '#4ECDC4',
      github: 'https://github.com/Concretizzare/netsuite-mcp-server',
    },
    {
      id: 'outlook-mcp',
      title: 'Outlook MCP Server',
      description: 'Bring email intelligence to AI workflows. Connects AI assistants to Microsoft Outlook for smart email management and automation.',
      tags: ['Open Source', 'TypeScript', 'Email Automation'],
      color: '#0078D4',
      github: 'https://github.com/Concretizzare/outlook-mcp-server',
    },
  ]

  const sections = [
    { id: 'gallery', label: 'Portfolio Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout
    let touchpadDelta = 0
    let touchpadTimeout: NodeJS.Timeout
    let touchStartY = 0
    let touchDelta = 0

    const handleWheel = (e: WheelEvent) => {
      if (selectedProject || showShowcase) return

      // Detect if it's a mouse wheel (large deltaY) or touchpad (small deltaY)
      const isTouchpad = Math.abs(e.deltaY) < 50

      if (isTouchpad) {
        // Touchpad: accumulate small deltas
        e.preventDefault()
        touchpadDelta += e.deltaY

        // Clear previous timeout
        clearTimeout(touchpadTimeout)

        // When accumulated delta reaches threshold, change section
        // Higher threshold (250) to prevent skipping sections with fast swipes
        if (Math.abs(touchpadDelta) > 250 && !isScrolling) {
          isScrolling = true
          const delta = touchpadDelta > 0 ? 1 : -1
          setActiveSection(prev => Math.max(0, Math.min(sections.length - 1, prev + delta)))
          touchpadDelta = 0

          setTimeout(() => {
            isScrolling = false
          }, 600)
        }

        // Reset accumulated delta if user stops scrolling
        touchpadTimeout = setTimeout(() => {
          touchpadDelta = 0
        }, 200)
      } else {
        // Mouse wheel: hijack and snap to sections immediately
        if (!isScrolling) {
          e.preventDefault()
          isScrolling = true

          const delta = e.deltaY > 0 ? 1 : -1
          setActiveSection(prev => Math.max(0, Math.min(sections.length - 1, prev + delta)))

          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            isScrolling = false
          }, 800)
        } else {
          e.preventDefault()
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (selectedProject || showShowcase) return
      touchStartY = e.touches[0].clientY
      touchDelta = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (selectedProject || showShowcase) return
      e.preventDefault()
      const currentY = e.touches[0].clientY
      touchDelta = touchStartY - currentY
    }

    const handleTouchEnd = () => {
      if (selectedProject || showShowcase) return

      if (Math.abs(touchDelta) > 50 && !isScrolling) {
        isScrolling = true
        const delta = touchDelta > 0 ? 1 : -1
        setActiveSection(prev => Math.max(0, Math.min(sections.length - 1, prev + delta)))

        setTimeout(() => {
          isScrolling = false
        }, 600)
      }
      touchDelta = 0
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(scrollTimeout)
      clearTimeout(touchpadTimeout)
    }
  }, [sections.length, selectedProject, showShowcase])

  // No manual URL management needed - Next.js handles routing via real pages

  // Get category data for modal (handle both id and slug)
  const currentCategory = selectedCategory ? PORTFOLIO_CATEGORIES.find(c => c.id === selectedCategory || c.slug === selectedCategory) : null
  const categoryProjects = currentCategory ? PROJECTS.filter(p => currentCategory.projectIds.includes(p.id)) : []

  // Handle scroll navigation for Category modal
  useEffect(() => {
    if (!selectedCategory || !currentCategory) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout
    let touchpadDelta = 0
    let touchpadTimeout: NodeJS.Timeout
    let touchStartY = 0
    let touchStartTime = 0

    const totalSections = categoryProjects.length + (currentCategory.showShowcase || currentCategory.mcpProjects ? 3 : 2)

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Always accumulate - works for both touchpad and mouse wheel
      touchpadDelta += e.deltaY
      clearTimeout(touchpadTimeout)

      // When accumulated delta reaches threshold, change section
      if (Math.abs(touchpadDelta) > 120 && !isScrolling) {
        isScrolling = true
        if (touchpadDelta > 0 && categorySectionIndex < totalSections - 1) {
          setCategorySectionIndex(prev => prev + 1)
        } else if (touchpadDelta < 0 && categorySectionIndex > 0) {
          setCategorySectionIndex(prev => prev - 1)
        }
        touchpadDelta = 0

        setTimeout(() => {
          isScrolling = false
        }, 700)
      }

      // Reset accumulated delta if user stops scrolling
      touchpadTimeout = setTimeout(() => {
        touchpadDelta = 0
      }, 150)
    }

    // Touch event handlers for mobile swipe
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const deltaTime = Date.now() - touchStartTime

      // Minimum swipe distance (50px) and maximum time (500ms)
      if (Math.abs(deltaY) > 50 && deltaTime < 500) {
        isScrolling = true

        if (deltaY > 0 && categorySectionIndex < totalSections - 1) {
          // Swipe up - next section
          setCategorySectionIndex(prev => prev + 1)
        } else if (deltaY < 0 && categorySectionIndex > 0) {
          // Swipe down - previous section
          setCategorySectionIndex(prev => prev - 1)
        }

        scrollTimeout = setTimeout(() => {
          isScrolling = false
        }, 800)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(scrollTimeout)
      clearTimeout(touchpadTimeout)
    }
  }, [selectedCategory, currentCategory, categorySectionIndex, categoryProjects.length])

  // Auto-rotate showcase preview carousel on mobile (6800ms)
  // Reset timer when user swipes by including showcasePreviewIndex in deps
  useEffect(() => {
    if (!selectedCategory || !currentCategory?.showShowcase) return
    if (categorySectionIndex !== categoryProjects.length + 1) return

    const interval = setInterval(() => {
      setShowcasePreviewIndex(prev => (prev + 1) % 3)
    }, 6800)

    return () => clearInterval(interval)
  }, [selectedCategory, currentCategory, categorySectionIndex, categoryProjects.length, showcasePreviewIndex])

  const project = selectedProject ? PROJECTS.find(p => p.id === selectedProject) : null

  return (
    <div className="h-[100svh] md:h-screen w-screen bg-[#0A0A0B] overflow-hidden relative">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-[200] px-5 pb-3 md:px-8 md:pb-5 flex items-center justify-between bg-[#0A0A0B]/80 backdrop-blur-sm"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 20px)' }}
      >
        <button
          onClick={() => {
            // Hierarchical navigation: project → category → home
            if (selectedProject && projectParentCategory) {
              const category = PORTFOLIO_CATEGORIES.find(c => c.id === projectParentCategory)
              if (category) {
                router.push(`/${category.slug}`)
              } else {
                router.push('/')
              }
            } else {
              router.push('/')
            }
          }}
          className="text-sm md:text-base text-[#6B6B70] hover:text-white transition-colors font-light"
        >
          Portfolio
        </button>
        <nav className="flex items-center gap-5 md:gap-8">
          {['Work', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => {
                // Hierarchical navigation: project → category → home
                if (selectedProject && projectParentCategory) {
                  const category = PORTFOLIO_CATEGORIES.find(c => c.id === projectParentCategory)
                  if (category) {
                    router.push(`/${category.slug}`)
                  } else {
                    router.push('/')
                  }
                } else if (selectedCategory || showShowcase) {
                  router.push('/')
                } else {
                  setActiveSection(item === 'Work' ? 0 : item === 'About' ? 1 : 2)
                }
              }}
              className="text-sm md:text-base text-[#6B6B70] hover:text-white transition-colors font-light"
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Navigation Dots - Hidden */}
      <div className="hidden fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(i)}
            className="group flex items-center gap-3"
          >
            <span className={`text-[10px] transition-opacity ${activeSection === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
              {section.label}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                activeSection === i ? 'bg-[#E8E4DF] scale-125' : 'bg-[#3a3a3d] hover:bg-[#6B6B70]'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Main Content - Hidden when project, category or showcase is open */}
      <div className={`relative h-full ${selectedProject || selectedCategory || showShowcase ? 'invisible' : ''}`}>
        {/* Portfolio Gallery - Horizontal Carousel Section (Homepage) */}
        <GallerySection isActive={activeSection === 0}>
          <div className="relative h-full overflow-hidden">
            {/* Auto-rotation effect */}
            <AutoRotateCarousel
              activeIndex={activeCarouselIndex}
              setActiveIndex={setActiveCarouselIndex}
              totalItems={PORTFOLIO_CATEGORIES.length}
              interval={6800}
            />

            {/* Title - positioned between menu and cards */}
            <div className="absolute top-[4%] md:top-[12%] left-0 right-0 z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight">
                  Portfolio
                </h1>
                <p className="text-[#52525b] text-sm mt-2 mb-3 md:mb-0">Select a category to explore</p>
              </motion.div>
            </div>

            {/* Cards - vertically centered */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">

              {/* Carousel Container with swipe support */}
              <div
                className="relative flex items-center justify-center px-4 md:px-12 lg:px-20 w-full"
                style={{ perspective: '1500px' }}
                onTouchStart={(e) => {
                  const touch = e.touches[0]
                  e.currentTarget.dataset.touchStartX = String(touch.clientX)
                  e.currentTarget.dataset.touchStartTime = String(Date.now())
                }}
                onTouchEnd={(e) => {
                  const startX = parseFloat(e.currentTarget.dataset.touchStartX || '0')
                  const startTime = parseFloat(e.currentTarget.dataset.touchStartTime || '0')
                  const endX = e.changedTouches[0].clientX
                  const deltaX = startX - endX
                  const deltaTime = Date.now() - startTime

                  // Minimum swipe distance (60px) and maximum time (400ms)
                  if (Math.abs(deltaX) > 60 && deltaTime < 400) {
                    if (deltaX > 0) {
                      // Swipe left - next card
                      setActiveCarouselIndex(prev => prev === PORTFOLIO_CATEGORIES.length - 1 ? 0 : prev + 1)
                    } else {
                      // Swipe right - previous card
                      setActiveCarouselIndex(prev => prev === 0 ? PORTFOLIO_CATEGORIES.length - 1 : prev - 1)
                    }
                  }
                }}
              >
              {PORTFOLIO_CATEGORIES.map((category, idx) => {
                const offset = idx - activeCarouselIndex
                const isActive = offset === 0
                const isVisible = Math.abs(offset) <= 1

                return (
                  <motion.div
                    key={category.id}
                    className="absolute w-[85%] sm:w-full max-w-[680px] lg:max-w-[820px]"
                    initial={false}
                    animate={{
                      x: `${offset * 105}%`,
                      z: isActive ? 0 : -300,
                      rotateY: offset * -35,
                      scale: isActive ? 1 : 0.8,
                      opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 100 - Math.abs(offset),
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    {/* Horizontal Card */}
                    <motion.div
                      onClick={() => {
                        if (!isActive) {
                          setActiveCarouselIndex(idx)
                        } else if (category.projectIds.length > 0 || category.mcpProjects) {
                          router.push(`/${category.slug}`)
                        }
                      }}
                      whileHover={isActive ? { scale: 1.01 } : {}}
                      whileTap={isActive ? { scale: 0.99 } : {}}
                      className={`relative w-full h-[62svh] sm:h-auto sm:aspect-[16/10] md:aspect-[16/7] rounded-2xl md:rounded-3xl overflow-hidden ${
                        isActive && (category.projectIds.length > 0 || category.mcpProjects)
                          ? 'cursor-pointer'
                          : 'cursor-default'
                      }`}
                      style={{
                        background: '#111113',
                        boxShadow: isActive
                          ? `0 40px 80px -20px ${category.accentColor}35`
                          : '0 20px 40px -15px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* Card Layout: Vertical on mobile, Horizontal on desktop */}
                      <div className="flex flex-col md:flex-row h-full">
                        {/* Top/Left - Video (50% height on mobile, 45% width on desktop) */}
                        <div className="relative w-full h-[50%] md:w-[45%] md:h-full overflow-hidden">
                          {category.id === 'sales-marketing' ? (
                            /* Sales & Marketing: Camera movement video */
                            <video
                              autoPlay={isActive}
                              loop
                              muted
                              playsInline
                              preload={isActive ? 'auto' : isVisible ? 'metadata' : 'none'}
                              className="absolute inset-0 w-full h-full object-cover"
                              ref={(el) => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
                            >
                              <source src="/assets/homepage/sales-marketing-card.mp4" type="video/mp4" />
                            </video>
                          ) : category.id === 'operations' ? (
                            /* Operations: Logistics video */
                            <video
                              autoPlay={isActive}
                              loop
                              muted
                              playsInline
                              preload={isActive ? 'auto' : isVisible ? 'metadata' : 'none'}
                              className="absolute inset-0 w-full h-full object-cover"
                              ref={(el) => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
                            >
                              <source src="/assets/homepage/operations-card.mp4" type="video/mp4" />
                            </video>
                          ) : category.id === 'agent' ? (
                            /* Agent & AI: Code/AI video */
                            <video
                              autoPlay={isActive}
                              loop
                              muted
                              playsInline
                              preload={isActive ? 'auto' : isVisible ? 'metadata' : 'none'}
                              className="absolute inset-0 w-full h-full object-cover"
                              ref={(el) => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
                            >
                              <source src="/assets/homepage/agent-card.mp4" type="video/mp4" />
                            </video>
                          ) : category.id === 'finance' ? (
                            /* Finance: Dashboard video */
                            <video
                              autoPlay={isActive}
                              loop
                              muted
                              playsInline
                              preload={isActive ? 'auto' : isVisible ? 'metadata' : 'none'}
                              className="absolute inset-0 w-full h-full object-cover"
                              ref={(el) => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
                            >
                              <source src="/assets/homepage/finance-card.mp4" type="video/mp4" />
                            </video>
                          ) : (
                            /* Default placeholder for other categories */
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ background: `linear-gradient(145deg, ${category.accentColor}12 0%, #111113 80%)` }}
                            >
                              <div className="relative w-[85%] aspect-video rounded-lg overflow-hidden" style={{ background: `${category.accentColor}08` }}>
                                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
                                  <defs>
                                    <linearGradient id={`placeholder-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor={category.accentColor} stopOpacity="0.4" />
                                      <stop offset="100%" stopColor={category.accentColor} stopOpacity="0.1" />
                                    </linearGradient>
                                  </defs>
                                  <rect x="20" y="20" width="35" height="25" fill={`url(#placeholder-grad-${idx})`} rx="4" />
                                  <rect x="65" y="20" width="35" height="25" fill={`url(#placeholder-grad-${idx})`} rx="4" opacity="0.7" />
                                  <rect x="110" y="20" width="35" height="25" fill={`url(#placeholder-grad-${idx})`} rx="4" opacity="0.5" />
                                  <rect x="20" y="50" width="35" height="25" fill={`url(#placeholder-grad-${idx})`} rx="4" opacity="0.6" />
                                  <rect x="65" y="50" width="35" height="25" fill={`url(#placeholder-grad-${idx})`} rx="4" opacity="0.4" />
                                  <rect x="110" y="50" width="35" height="25" fill={`url(#placeholder-grad-${idx})`} rx="4" opacity="0.3" />
                                </svg>
                                <div className="absolute bottom-2 right-2 text-[10px] text-white/20 font-mono">16:9</div>
                              </div>
                            </div>
                          )}

                          {/* Accent line on far left */}
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1"
                            style={{ background: category.accentColor }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: isActive ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        </div>

                        {/* Bottom/Right - Content (50% height on mobile, 55% width on desktop) */}
                        <div className="flex-1 flex flex-col justify-start md:justify-center px-4 pt-6 pb-4 sm:p-6 md:p-10 lg:p-12">
                          {/* Title */}
                          <motion.h2
                            className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 md:mb-5 tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            {category.title}
                          </motion.h2>

                          {/* Subtitle */}
                          <motion.p
                            className="text-sm sm:text-sm md:text-lg font-medium mb-3 sm:mb-4"
                            style={{ color: category.accentColor }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0.5 }}
                            transition={{ delay: 0.2 }}
                          >
                            {category.subtitle}
                          </motion.p>

                          {/* Description */}
                          <motion.p
                            className="text-[#71717a] text-sm sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 max-w-md line-clamp-3 sm:line-clamp-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0.4 }}
                            transition={{ delay: 0.25 }}
                          >
                            {category.description}
                          </motion.p>

                          {/* Footer */}
                          <motion.div
                            className="flex items-center gap-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span className="text-xs md:text-sm text-[#52525b]">
                              {(() => {
                                const projectCount = category.projectIds.length + (category.mcpProjects ? 2 : 0)
                                return projectCount > 0
                                  ? `${projectCount} project${projectCount > 1 ? 's' : ''}`
                                  : 'Coming Soon'
                              })()}
                            </span>
                            {(category.projectIds.length > 0 || category.mcpProjects) && isActive && (
                              <motion.span
                                className="flex items-center gap-2 text-sm font-medium group"
                                style={{ color: category.accentColor }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ x: 5 }}
                              >
                                <span>Explore Projects</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </motion.span>
                            )}
                          </motion.div>
                        </div>
                      </div>

                      {/* Glow overlay */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            boxShadow: `inset 0 0 80px ${category.accentColor}08`
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )
              })}

              {/* Navigation Arrows - Hidden on mobile */}
              <button
                onClick={() => setActiveCarouselIndex(prev => prev === 0 ? PORTFOLIO_CATEGORIES.length - 1 : prev - 1)}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full hidden md:flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{
                  background: 'rgba(17,17,19,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-white transition-colors">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setActiveCarouselIndex(prev => prev === PORTFOLIO_CATEGORIES.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full hidden md:flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{
                  background: 'rgba(17,17,19,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-white transition-colors">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
            </div>

            {/* Progress bars - positioned at bottom, between cards and screen edge */}
            <div className="absolute bottom-[2%] md:bottom-[8%] left-0 right-0 flex items-center justify-center gap-3">
              {PORTFOLIO_CATEGORIES.map((category, idx) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCarouselIndex(idx)}
                  className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                  style={{
                    width: activeCarouselIndex === idx ? '48px' : '20px',
                    background: '#27272a'
                  }}
                >
                  {activeCarouselIndex === idx && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: category.accentColor }}
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 7, ease: 'linear' }}
                      key={`progress-${idx}-${activeCarouselIndex}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* About Section */}
        <GallerySection isActive={activeSection === sections.length - 2}>
              <div className="flex items-center justify-center h-full px-4 md:px-8 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl text-center"
                >
                  <span className="text-xs text-[#6B6B70] uppercase tracking-widest mb-6 block">About</span>
                  <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-8">Creative Director & Engineer</h2>
                  <p className="text-[#A1A1A6] leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                    Crafting digital experiences that blur the line between technology and art.
                    Specializing in high-end web experiences, 3D interfaces, and luxury platforms.
                  </p>
                  <p className="text-[#6B6B70] text-xs md:text-sm italic">
                    "Every pixel is intentional. Every interaction is considered."
                  </p>
                </motion.div>
              </div>
        </GallerySection>

        {/* Contact Section */}
        <GallerySection isActive={activeSection === sections.length - 1}>
              <div className="flex items-center justify-center h-full px-4 md:px-8 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-xl w-full"
                >
                  <span className="text-xs text-[#6B6B70] uppercase tracking-widest mb-6 block text-center">Contact</span>
                  <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-8 text-center">Let's work together</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b border-[#2a2a2d] focus:border-[#E8E4DF] outline-none transition-colors text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b border-[#2a2a2d] focus:border-[#E8E4DF] outline-none transition-colors text-sm"
                    />
                    <textarea
                      placeholder="Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b border-[#2a2a2d] focus:border-[#E8E4DF] outline-none transition-colors text-sm resize-none"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="block w-full py-3 bg-[#E8E4DF] text-[#0A0A0B] text-sm font-medium hover:opacity-90 transition-opacity mt-6 disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : formStatus === 'error' ? 'Error - Try Again' : 'Send Message'}
                    </button>
                  </form>

                  <div className="flex justify-center gap-6 mt-12">
                    <a href="https://github.com/Concretizzare/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B70] hover:text-white transition-colors">
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/luca-franchi-325b83198" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B70] hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </motion.div>
              </div>
        </GallerySection>
      </div>

      {/* Project Page */}
      <AnimatePresence mode="wait">
        {selectedProject && project && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0B] overflow-auto"
          >
            <div className="min-h-screen px-3 pt-20 pb-12 sm:px-8 sm:pt-20 sm:pb-14 md:p-12 md:pt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-5xl mx-auto"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-12">
                  <div>
                    <h1 className="text-5xl font-light mb-4">{project.title}</h1>
                    <p className="text-[#A1A1A6] text-xl">{project.subtitle}</p>
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0B] text-sm font-medium rounded hover:opacity-90 transition-opacity"
                    >
                      Visit Live Site
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Browser Preview */}
                {'screenshot' in project && project.screenshot && (
                  <BrowserPreview
                    url={project.url || ''}
                    screenshot={project.screenshot}
                    projectColor={project.color}
                  />
                )}

                {/* Metrics */}
                {'metrics' in project && project.metrics && (
                  <div className="flex justify-center gap-8 mb-12">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-6 bg-[#141416] rounded-lg border border-[#2a2a2d] min-w-[140px]">
                        <div className="text-3xl font-light text-[#E8E4DF] mb-2">{String(value)}</div>
                        <div className="text-xs uppercase tracking-widest text-[#6B6B70]">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description & Tech */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <div className="order-2 md:order-1">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-4">Overview</h3>
                    <p className="text-[#A1A1A6] leading-relaxed mb-6">{project.description}</p>
                    {'role' in project && (
                      <p className="text-sm text-[#6B6B70]">
                        <span className="text-[#A1A1A6]">Role:</span> {project.role}
                      </p>
                    )}
                  </div>
                  <div className="order-1 md:order-2">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-[#1a1a1d] text-[#A1A1A6] text-sm rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skill Cards - Antonio Lupi */}
                {project.id === 'ecommerce' && (
                  <div className="mb-12">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-6 text-center">Key Implementations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: '📦', title: 'Product Catalog', desc: 'Built full product catalog of over 5,000 products via CSV import from scratch' },
                        { icon: '⚙️', title: 'Custom Logic', desc: 'Custom frontend logic for tailored product & client requirements' },
                        { icon: '🎨', title: 'Dynamic Finishes', desc: 'Variant-specific finish displayed dynamically with product variant change' },
                        { icon: '🚚', title: 'Shipping Calc', desc: 'Real-time shipping cost calculation integrated in checkout flow' },
                        { icon: '🔍', title: 'SEO Architecture', desc: 'SEO-driven architecture with AI-generated content for improved visibility' },
                        { icon: '🔗', title: 'ERP Ready', desc: 'Backend-ready for ERP/CRM integration (e.g., NetSuite) and future automation' },
                      ].map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="p-4 bg-[#141416] rounded-lg border border-[#2a2a2d] hover:border-[#3a3a3d] transition-colors"
                        >
                          <div className="text-2xl mb-2">{skill.icon}</div>
                          <h4 className="text-sm font-medium text-[#E8E4DF] mb-1">{skill.title}</h4>
                          <p className="text-xs text-[#6B6B70] leading-relaxed">{skill.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Cards - Luxury Design Warehouse */}
                {project.id === 'hybrid' && (
                  <div className="mb-12">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-6 text-center">Key Implementations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: '🗄️', title: 'Headless CMS', desc: 'Sanity.io integration with GROQ queries, real-time preview, and static JSON fallback for resilient data layer' },
                        { icon: '⚡', title: 'ISR Revalidation', desc: 'Incremental Static Regeneration with 60s revalidation for optimal performance without full rebuilds' },
                        { icon: '🔍', title: 'Filtering Engine', desc: 'Real-time multi-parameter filtering (brand, category, location, search) with dynamic product counts' },
                        { icon: '🖼️', title: 'Custom Zoom', desc: 'Mouse-tracking zoom magnifier with transformOrigin calculations based on cursor position' },
                        { icon: '📧', title: 'Email System', desc: 'Resend API integration with HTML templates for product inquiries and contact forms' },
                        { icon: '📊', title: 'Hybrid Data Layer', desc: 'getAllProducts(), getProductById(), filterProducts() abstraction with Sanity primary + JSON fallback' },
                        { icon: '🎨', title: 'Material Variants', desc: 'Dynamic finish/material swatches with per-product image references' },
                        { icon: '📄', title: 'PDF Tearsheets', desc: 'Product specification documents served from /tearsheets/ with Sanity file asset support' },
                      ].map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="p-4 bg-[#141416] rounded-lg border border-[#2a2a2d] hover:border-[#3a3a3d] transition-colors"
                        >
                          <div className="text-2xl mb-2">{skill.icon}</div>
                          <h4 className="text-sm font-medium text-[#E8E4DF] mb-1">{skill.title}</h4>
                          <p className="text-xs text-[#6B6B70] leading-relaxed">{skill.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Cards - Feelippo's */}
                {project.id === 'boutique' && (
                  <div className="mb-12">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-6 text-center">Key Implementations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: '⌚', title: 'Curated Watch Portfolio', desc: 'Homepage "Watch Portfolio" section presenting a hand-picked set of pieces under categories, each with a short teaser and dedicated detail page' },
                        { icon: '📝', title: 'Long-form Editorial Articles', desc: 'Blog area featuring deep-dive stories on iconic references, blending historical background, design analysis, and collector insight' },
                        { icon: '🎨', title: 'Story-Driven Watch Pages', desc: 'Individual watch pages structured like mini editorials, with image galleries, narrative sections on provenance, design, rarity, and significance' },
                        { icon: '🖼️', title: 'Image-Led Layout', desc: 'Multi-image galleries and hero images for each key piece and article, allowing visitors to appreciate case details, dials, bracelets, and textures while reading the narrative' },
                        { icon: '🏛️', title: '"Legacy of Passion" About', desc: 'Dedicated section framing the collection as the result of a lifelong journey into fine watchmaking and jewelry, emphasizing heirlooms, craftsmanship, and the idea of watches as tangible pieces of history' },
                        { icon: '✉️', title: 'Contact & Inquiry Funnel', desc: 'Simple contact form that turns the site into a lightweight lead-gen channel for questions, stories, or acquisition inquiries, keeping the overall UX minimal and focused on content' },
                      ].map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="p-4 bg-[#141416] rounded-lg border border-[#2a2a2d] hover:border-[#3a3a3d] transition-colors"
                        >
                          <div className="text-2xl mb-2">{skill.icon}</div>
                          <h4 className="text-sm font-medium text-[#E8E4DF] mb-1">{skill.title}</h4>
                          <p className="text-xs text-[#6B6B70] leading-relaxed">{skill.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Cards - Shipping Calculator */}
                {project.id === 'shipping' && (
                  <div className="mb-12">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-6 text-center">Key Implementations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: '🔄', title: 'Real-Time Rates', desc: 'Live FedEx API integration calculating shipping costs per-product with automatic Parcel/Freight selection based on weight thresholds' },
                        { icon: '🏭', title: 'Smart Warehouse Routing', desc: '5 US warehouses with automatic selection based on customer state for optimized delivery costs' },
                        { icon: '🎯', title: '5 Shipping Scenarios', desc: 'Dynamic pricing: Sea Curbside, Sea White Glove, Air Curbside, Air White Glove, Mirrors handling' },
                        { icon: '👔', title: 'White Glove Integration', desc: 'Tiered delivery costs ($550-$2,100) based on weight, reflecting real crew requirements' },
                        { icon: '📦', title: 'Volumetric Container', desc: 'Custom container cost algorithm using product dimensions with area-based pricing' },
                        { icon: '📱', title: 'Real-Time Monitoring', desc: 'Telegram bot notifications + admin dashboard for every shipping request' },
                        { icon: '🔐', title: 'Enterprise Security', desc: 'HMAC signature validation + Shopify IP whitelist verification' },
                        { icon: '⚡', title: 'Serverless Architecture', desc: 'Vercel deployment with PostgreSQL (Neon) for zero-downtime scaling' },
                      ].map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="p-4 bg-[#141416] rounded-lg border border-[#2a2a2d] hover:border-[#3a3a3d] transition-colors"
                        >
                          <div className="text-2xl mb-2">{skill.icon}</div>
                          <h4 className="text-sm font-medium text-[#E8E4DF] mb-1">{skill.title}</h4>
                          <p className="text-xs text-[#6B6B70] leading-relaxed">{skill.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Cards - Smart Render */}
                {project.id === 'ai-render' && (
                  <div className="mb-12">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B6B70] mb-6 text-center">Key Implementations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: '🤖', title: 'AI Room Analysis', desc: 'Intelligent detection of room components (walls, floors, cabinets) using Gemini vision models with structured JSON output' },
                        { icon: '🎨', title: '294 Premium Finishes', desc: 'Curated material library from Ernestomeda & Antoniolupi luxury brands with high-res previews' },
                        { icon: '✨', title: 'Photorealistic Rendering', desc: 'AI-powered image generation preserving spatial composition and lighting' },
                        { icon: '🖱️', title: 'Interactive Editing', desc: 'Three edit modes: text commands, point-click object selection, area masking for precision changes' },
                        { icon: '📐', title: 'Multi-Angle Support', desc: 'Apply consistent designs across multiple room views with per-angle customization' },
                        { icon: '⏪', title: 'Full Edit History', desc: 'Linear undo/redo system with complete iteration tracking' },
                      ].map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="p-4 bg-[#141416] rounded-lg border border-[#2a2a2d] hover:border-[#3a3a3d] transition-colors"
                        >
                          <div className="text-2xl mb-2">{skill.icon}</div>
                          <h4 className="text-sm font-medium text-[#E8E4DF] mb-1">{skill.title}</h4>
                          <p className="text-xs text-[#6B6B70] leading-relaxed">{skill.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Showcase Modal - Full Presentation */}
      <AnimatePresence>
        {showShowcase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0B] overflow-y-auto overscroll-contain"
            style={{ touchAction: 'pan-y' }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => router.push('/sales_marketing')}
              className="fixed top-6 right-6 z-20 text-[#6B6B70] hover:text-white transition-colors flex items-center gap-2"
            >
              <span className="text-sm">Close</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="pt-20 pb-8 px-6 md:px-12 text-center border-b border-[#2a2a2d]">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-light mb-4"
              >
                Visual Excellence
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#6B6B70] text-sm md:text-base max-w-2xl mx-auto"
              >
                A showcase of creative and technical mastery through generative AI content.
                See how we transform static images into dynamic motion and integrate models seamlessly into scenes.
              </motion.p>
            </div>

            {/* Navigation Tabs - Scrollable */}
            <div className="sticky top-0 z-10 bg-[#0A0A0B]/98 backdrop-blur-sm border-b border-[#2a2a2d]">
              <div className="flex overflow-x-auto gap-1 p-4 max-w-7xl mx-auto scrollbar-hide">
                {SHOWCASE_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveShowcaseItem(idx)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                      activeShowcaseItem === idx
                        ? 'bg-[#E8E4DF] text-[#0A0A0B] font-medium'
                        : 'text-[#6B6B70] hover:text-white hover:bg-[#1a1a1d]'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Content - Single Section View with Navigation */}
            <div className="px-4 md:px-12 py-12 max-w-7xl mx-auto min-h-[60vh]">
              <AnimatePresence mode="wait">
                {(() => {
                  const item = SHOWCASE_ITEMS[activeShowcaseItem]
                  return (
                    <motion.div
                      key={activeShowcaseItem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Section Header */}
                      <div className="text-center mb-8">
                        <span className="text-xs text-[#6B6B70] uppercase tracking-widest mb-2 block">
                          {String(activeShowcaseItem + 1).padStart(2, '0')} / {String(SHOWCASE_ITEMS.length).padStart(2, '0')}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-light mb-2">
                          {item.title}
                        </h2>
                        <p className="text-[#6B6B70] max-w-2xl mx-auto">
                          {item.description}
                        </p>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Originals */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-xs text-[#6B6B70] uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-[#6B6B70]" />
                            Original{item.originals.length > 1 ? 's' : ''}
                          </div>
                          <div className={`grid gap-3 ${item.originals.length > 1 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                            {item.originals.map((src, i) => (
                              <div
                                key={i}
                                className="relative rounded-xl overflow-hidden border border-[#2a2a2d] bg-[#141416] aspect-square"
                              >
                                <img
                                  src={src}
                                  alt={`Original ${i + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Generated */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-[#4ECDC4]" />
                            <span className="text-[#4ECDC4]">AI Generated</span>
                          </div>
                          <div className={`grid gap-3 ${item.generated.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {item.generated.map((gen, i) => (
                              <div
                                key={i}
                                className="relative rounded-xl overflow-hidden border border-[#2a2a2d] bg-[#141416] aspect-square group"
                              >
                                {gen.type === 'video' ? (
                                  <>
                                    <video
                                      key={`${activeShowcaseItem}-${i}`}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="w-full h-full object-cover"
                                    >
                                      <source src={gen.src} type="video/mp4" />
                                    </video>
                                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[10px] text-white flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                      Video
                                    </div>
                                  </>
                                ) : (
                                  <img
                                    src={gen.src}
                                    alt={`Generated ${i + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Generated Frames (for reel8) */}
                          {'generatedFrames' in item && item.generatedFrames && (
                            <div className="mt-6">
                              <div className="flex items-center gap-2 text-xs uppercase tracking-widest mb-3">
                                <div className="w-2 h-2 rounded-full bg-[#A855F7]" />
                                <span className="text-[#A855F7]">Generated Frames</span>
                              </div>
                              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                                {item.generatedFrames.map((src, i) => (
                                  <div
                                    key={i}
                                    className="relative rounded-lg overflow-hidden border border-[#2a2a2d] bg-[#141416] aspect-square"
                                  >
                                    <img
                                      src={src}
                                      alt={`Frame ${i + 1}`}
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Navigation Arrows */}
                      <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                          onClick={() => setActiveShowcaseItem(prev => Math.max(0, prev - 1))}
                          disabled={activeShowcaseItem === 0}
                          className="p-3 rounded-full border border-[#2a2a2d] text-[#6B6B70] hover:text-white hover:border-[#4a4a4d] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-1.5">
                          {SHOWCASE_ITEMS.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveShowcaseItem(idx)}
                              className={`h-2 rounded-full transition-all ${
                                activeShowcaseItem === idx ? 'bg-[#E8E4DF] w-6' : 'bg-[#3a3a3d] w-2 hover:bg-[#5a5a5d]'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveShowcaseItem(prev => Math.min(SHOWCASE_ITEMS.length - 1, prev + 1))}
                          disabled={activeShowcaseItem === SHOWCASE_ITEMS.length - 1}
                          className="p-3 rounded-full border border-[#2a2a2d] text-[#6B6B70] hover:text-white hover:border-[#4a4a4d] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )
                })()}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-[#2a2a2d] px-6 py-12 text-center bg-[#0A0A0B]">
              <p className="text-[#6B6B70] text-sm mb-6">
                Interested in how we can transform your visual content?
              </p>
              <button
                onClick={() => {
                  router.push('/')
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8E4DF] text-[#0A0A0B] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Page - Shows projects for selected category */}
      <AnimatePresence mode="wait">
        {selectedCategory && currentCategory && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0B] overflow-hidden"
          >
            {/* Navigation Dots - Hidden */}
            <div className="hidden fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-2">
              {/* Category intro dot */}
              <button
                onClick={() => setCategorySectionIndex(0)}
                className="group flex items-center gap-3"
              >
                <span className={`text-[10px] transition-opacity ${categorySectionIndex === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                  {currentCategory.title}
                </span>
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    categorySectionIndex === 0 ? 'scale-125' : 'bg-[#3a3a3d] hover:bg-[#6B6B70]'
                  }`}
                  style={{ backgroundColor: categorySectionIndex === 0 ? currentCategory.accentColor : undefined }}
                />
              </button>
              {/* Project dots */}
              {categoryProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setCategorySectionIndex(idx + 1)}
                  className="group flex items-center gap-3"
                >
                  <span className={`text-[10px] transition-opacity ${categorySectionIndex === idx + 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                    {proj.title}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      categorySectionIndex === idx + 1 ? 'scale-125' : 'bg-[#3a3a3d] hover:bg-[#6B6B70]'
                    }`}
                    style={{ backgroundColor: categorySectionIndex === idx + 1 ? currentCategory.accentColor : undefined }}
                  />
                </button>
              ))}
              {/* Visual Excellence dot (for Sales & Marketing) */}
              {currentCategory.showShowcase && (
                <button
                  onClick={() => setCategorySectionIndex(categoryProjects.length + 1)}
                  className="group flex items-center gap-3"
                >
                  <span className={`text-[10px] transition-opacity ${categorySectionIndex === categoryProjects.length + 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                    Visual Excellence
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      categorySectionIndex === categoryProjects.length + 1 ? 'scale-125' : 'bg-[#3a3a3d] hover:bg-[#6B6B70]'
                    }`}
                    style={{ backgroundColor: categorySectionIndex === categoryProjects.length + 1 ? currentCategory.accentColor : undefined }}
                  />
                </button>
              )}
              {/* MCP dot (for Agent & AI) */}
              {currentCategory.mcpProjects && (
                <button
                  onClick={() => setCategorySectionIndex(categoryProjects.length + 1)}
                  className="group flex items-center gap-3"
                >
                  <span className={`text-[10px] transition-opacity ${categorySectionIndex === categoryProjects.length + 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                    MCP Servers
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      categorySectionIndex === categoryProjects.length + 1 ? 'scale-125' : 'bg-[#3a3a3d] hover:bg-[#6B6B70]'
                    }`}
                    style={{ backgroundColor: categorySectionIndex === categoryProjects.length + 1 ? currentCategory.accentColor : undefined }}
                  />
                </button>
              )}
            </div>

            {/* Sections Container */}
            <div className="h-full w-full relative">
              {/* Category Intro Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: categorySectionIndex === 0 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6"
                style={{ pointerEvents: categorySectionIndex === 0 ? 'auto' : 'none' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-10 md:mb-12"
                  style={{ backgroundColor: currentCategory.accentColor + '15' }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentCategory.accentColor }}
                  />
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: currentCategory.accentColor }}
                  >
                    {currentCategory.subtitle}
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight mb-6"
                >
                  {currentCategory.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-[#6B6B70] text-base md:text-lg max-w-md"
                >
                  {currentCategory.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex flex-col items-center gap-2 text-[#6B6B70]"
                >
                  <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ↓
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Project Sections */}
              {categoryProjects.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: categorySectionIndex === idx + 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-12"
                  style={{ pointerEvents: categorySectionIndex === idx + 1 ? 'auto' : 'none' }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 max-w-6xl w-full items-center">
                    {/* Left - Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: categorySectionIndex === idx + 1 ? 1 : 0, x: categorySectionIndex === idx + 1 ? 0 : -50 }}
                      transition={{ duration: 0.6 }}
                      className="order-2 lg:order-1"
                    >
                      <span className="text-xs uppercase tracking-widest mb-2 md:mb-4 block" style={{ color: currentCategory.accentColor }}>
                        {String(idx + 1).padStart(2, '0')} / {String(categoryProjects.length).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl md:text-3xl lg:text-5xl font-light mb-2 md:mb-4">{proj.title}</h2>
                      <p className="text-[#A1A1A6] mb-2 md:mb-4 lg:mb-6 text-sm md:text-base">{proj.subtitle}</p>
                      <p className="text-[#6B6B70] text-sm leading-relaxed mb-4 md:mb-6 lg:mb-8">{proj.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6 lg:mb-8">
                        {proj.tech.slice(0, 4).map(tech => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 text-xs border border-[#3a3a3d] text-[#6B6B70]"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.tech.length > 4 && (
                          <span className="px-2 md:px-3 py-1 text-xs border border-[#3a3a3d] text-[#6B6B70]">
                            +{proj.tech.length - 4}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const categorySlug = currentCategory.slug
                          const projectSlug = PROJECT_SLUG_MAP[proj.id] ?? proj.id
                          router.push(`/${categorySlug}/${projectSlug}`)
                        }}
                        className="inline-flex items-center gap-2 text-sm hover:gap-4 transition-all"
                        style={{ color: currentCategory.accentColor }}
                      >
                        View Project <span>→</span>
                      </button>
                    </motion.div>

                    {/* Right - Preview */}
                    <motion.div
                      initial={{ opacity: 0, x: 50, rotateY: -10 }}
                      animate={{
                        opacity: categorySectionIndex === idx + 1 ? 1 : 0,
                        x: categorySectionIndex === idx + 1 ? 0 : 50,
                        rotateY: categorySectionIndex === idx + 1 ? 0 : -10
                      }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative cursor-pointer order-1 lg:order-2"
                      style={{ perspective: '1000px' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        const categorySlug = currentCategory.slug
                        const projectSlug = PROJECT_SLUG_MAP[proj.id] ?? proj.id
                        router.push(`/${categorySlug}/${projectSlug}`)
                      }}
                    >
                      <div
                        className="rounded-xl overflow-hidden border border-[#2a2a2d] hover:border-[#4a4a4d] transition-colors"
                        style={{ boxShadow: `0 20px 60px -20px ${proj.color}40` }}
                      >
                        {/* Mini Browser Header */}
                        <div className="bg-[#1a1a1d] px-3 py-2 flex items-center border-b border-[#2a2a2d]">
                          <div className="flex gap-1.5 w-12">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                          </div>
                          <div className="flex-1 flex justify-center">
                            {proj.url && (
                              <div className="bg-[#0f0f12] rounded px-3 py-1 flex items-center gap-1.5 justify-center">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B6B70" strokeWidth="2">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <span className="text-[#6B6B70] text-xs">{new URL(proj.url).hostname}</span>
                              </div>
                            )}
                          </div>
                          <div className="w-12" />
                        </div>
                        {/* Screenshot */}
                        <img
                          src={proj.screenshot}
                          alt={proj.title}
                          className="w-full h-auto block max-h-[280px] md:max-h-none object-cover object-top"
                          loading="lazy"
                        />
                      </div>

                      {/* Floating accent */}
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-lg pointer-events-none"
                        style={{ backgroundColor: proj.color, opacity: 0.1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Visual Excellence Section (for Sales & Marketing) */}
              {currentCategory.showShowcase && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: categorySectionIndex === categoryProjects.length + 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-start md:items-center justify-center px-4 md:px-8 lg:px-12 pt-16 md:pt-0 overflow-y-auto"
                  style={{ pointerEvents: categorySectionIndex === categoryProjects.length + 1 ? 'auto' : 'none' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl w-full text-center"
                  >
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 md:mb-4 block" style={{ color: currentCategory.accentColor }}>
                      Creative Capabilities
                    </span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-4">
                      Visual Excellence
                    </h2>
                    <p className="text-[#6B6B70] text-xs md:text-base mb-6 md:mb-10 max-w-lg mx-auto">
                      AI-powered media generation showcasing our ability to transform static content into dynamic experiences
                    </p>

                    {/* Preview Cards - Carousel on mobile, Grid on desktop */}
                    {/* Mobile Carousel */}
                    <div
                      className="md:hidden relative mb-6"
                      onTouchStart={(e) => {
                        const touch = e.touches[0]
                        e.currentTarget.dataset.touchStartX = String(touch.clientX)
                        e.currentTarget.dataset.touchStartTime = String(Date.now())
                      }}
                      onTouchEnd={(e) => {
                        const startX = parseFloat(e.currentTarget.dataset.touchStartX || '0')
                        const startTime = parseFloat(e.currentTarget.dataset.touchStartTime || '0')
                        const endX = e.changedTouches[0].clientX
                        const deltaX = startX - endX
                        const deltaTime = Date.now() - startTime

                        if (Math.abs(deltaX) > 50 && deltaTime < 500) {
                          if (deltaX > 0 && showcasePreviewIndex < 2) {
                            setShowcasePreviewIndex(prev => prev + 1)
                          } else if (deltaX < 0 && showcasePreviewIndex > 0) {
                            setShowcasePreviewIndex(prev => prev - 1)
                          }
                        }
                      }}
                    >
                      <div className="overflow-hidden">
                        <motion.div
                          className="flex"
                          animate={{ x: `-${showcasePreviewIndex * 100}%` }}
                          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        >
                          {SHOWCASE_ITEMS.slice(0, 3).map((item, i) => {
                            const videoSrc = item.generated.find(g => g.type === 'video')?.src
                            return (
                              <div key={item.id} className="w-full flex-shrink-0 px-2">
                                <div
                                  className="relative rounded-xl overflow-hidden border border-[#2a2a2d] bg-[#141416] h-[55svh]"
                                >
                                  {videoSrc ? (
                                    <video
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="w-full h-full object-cover"
                                    >
                                      <source src={videoSrc} type="video/mp4" />
                                    </video>
                                  ) : (
                                    <img
                                      src={item.originals[0]}
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h4 className="text-base font-medium text-[#E8E4DF] mb-1">{item.title}</h4>
                                    <p className="text-sm text-[#6B6B70] line-clamp-2">{item.description}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </motion.div>
                      </div>
                      {/* Carousel Indicators */}
                      <div className="flex justify-center gap-2 mt-4">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => setShowcasePreviewIndex(idx)}
                            className="h-1 rounded-full transition-all duration-300"
                            style={{
                              width: showcasePreviewIndex === idx ? '24px' : '8px',
                              background: showcasePreviewIndex === idx ? currentCategory.accentColor : '#3a3a3d'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid md:grid-cols-3 gap-4 mb-8">
                      {SHOWCASE_ITEMS.slice(0, 3).map((item, i) => {
                        const videoSrc = item.generated.find(g => g.type === 'video')?.src
                        const isPlaying = playingPreviewReel === item.id
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            onClick={() => {
                              if (videoSrc) {
                                setPlayingPreviewReel(isPlaying ? null : item.id)
                              }
                            }}
                            className="relative group rounded-xl overflow-hidden border border-[#2a2a2d] bg-[#141416] aspect-square cursor-pointer"
                          >
                            {isPlaying && videoSrc ? (
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                              >
                                <source src={videoSrc} type="video/mp4" />
                              </video>
                            ) : (
                              <img
                                src={item.originals[0]}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                loading="lazy"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h4 className="text-sm font-medium text-[#E8E4DF] mb-1">{item.title}</h4>
                              <p className="text-xs text-[#6B6B70] line-clamp-2">{item.description}</p>
                            </div>
                            {videoSrc && (
                              <div className={`absolute top-3 right-3 w-8 h-8 rounded-full ${isPlaying ? 'bg-white/20' : 'bg-white/10'} backdrop-blur-sm flex items-center justify-center transition-all`}>
                                {isPlaying ? (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                  </svg>
                                ) : (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                    <polygon points="5 3 19 12 5 21" />
                                  </svg>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      onClick={() => {
                        router.push('/sales_marketing/visual-excellence')
                      }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-medium text-sm hover:opacity-90 transition-all hover:gap-4"
                      style={{ backgroundColor: currentCategory.accentColor, color: '#0A0A0B' }}
                    >
                      <span>Explore Full Showcase</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* MCP Projects Section (for Agent & AI) */}
              {currentCategory.mcpProjects && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: categorySectionIndex === categoryProjects.length + 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-12"
                  style={{ pointerEvents: categorySectionIndex === categoryProjects.length + 1 ? 'auto' : 'none' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl w-full"
                  >
                    <span className="text-xs text-[#6B6B70] uppercase tracking-widest mb-6 block text-center">Open Source</span>
                    <h2 className="text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center">MCP Servers</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          id: 'netsuite-mcp',
                          title: 'NetSuite MCP Server',
                          description: 'Production-ready Model Context Protocol server for NetSuite ERP integration. Enables AI assistants to interact with NetSuite data through natural language.',
                          tags: ['Open Source', 'TypeScript', 'ERP Integration'],
                          color: '#4ECDC4',
                          github: 'https://github.com/Concretizzare/netsuite-mcp-server',
                        },
                        {
                          id: 'outlook-mcp',
                          title: 'Outlook MCP Server',
                          description: 'Bring email intelligence to AI workflows. Connects AI assistants to Microsoft Outlook for smart email management and automation.',
                          tags: ['Open Source', 'TypeScript', 'Email Automation'],
                          color: '#0078D4',
                          github: 'https://github.com/Concretizzare/outlook-mcp-server',
                        },
                      ].map((mcp, i) => (
                        <motion.div
                          key={mcp.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02, borderColor: '#4a4a4d' }}
                          transition={{
                            opacity: { delay: 0.2 + (0.15 * i), duration: 0.8 },
                            y: { delay: 0.2 + (0.15 * i), duration: 0.8 },
                            scale: { duration: 0.3 },
                            borderColor: { duration: 0.3 }
                          }}
                          className="p-6 bg-[#141416] rounded-xl border border-[#2a2a2d] block"
                          style={{ boxShadow: `0 20px 60px -20px ${mcp.color}20` }}
                        >
                          <div className="flex items-start mb-4">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: mcp.color + '20' }}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={mcp.color} strokeWidth="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-lg font-medium text-[#E8E4DF] mb-2">{mcp.title}</h3>
                          <p className="text-sm text-[#6B6B70] leading-relaxed mb-4">{mcp.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {mcp.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{ backgroundColor: mcp.color + '15', color: mcp.color }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Empty State for Finance */}
              {categoryProjects.length === 0 && !currentCategory.mcpProjects && !currentCategory.showShowcase && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: categorySectionIndex === 0 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ pointerEvents: categorySectionIndex === 0 ? 'auto' : 'none' }}
                >
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ backgroundColor: currentCategory.accentColor + '15' }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={currentCategory.accentColor} strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-[#E8E4DF] mb-2">Coming Soon</h3>
                    <p className="text-[#6B6B70] text-sm max-w-md mx-auto">
                      We're working on exciting projects in this category. Check back soon or get in touch to discuss your needs.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: categorySectionIndex === categoryProjects.length + (currentCategory.showShowcase || currentCategory.mcpProjects ? 2 : 1) ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-12"
                style={{ pointerEvents: categorySectionIndex === categoryProjects.length + (currentCategory.showShowcase || currentCategory.mcpProjects ? 2 : 1) ? 'auto' : 'none' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-xl w-full"
                >
                  <span className="text-xs uppercase tracking-widest mb-6 block text-center" style={{ color: currentCategory.accentColor }}>Contact</span>
                  <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-8 text-center">Let's work together</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b border-[#2a2a2d] focus:outline-none transition-colors text-sm"
                      style={{ borderColor: formData.name ? currentCategory.accentColor : undefined }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b border-[#2a2a2d] focus:outline-none transition-colors text-sm"
                      style={{ borderColor: formData.email ? currentCategory.accentColor : undefined }}
                    />
                    <textarea
                      placeholder="Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b border-[#2a2a2d] focus:outline-none transition-colors text-sm resize-none"
                      style={{ borderColor: formData.message ? currentCategory.accentColor : undefined }}
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="block w-full py-3 text-[#0A0A0B] text-sm font-medium hover:opacity-90 transition-opacity mt-6 disabled:opacity-50"
                      style={{ backgroundColor: currentCategory.accentColor }}
                    >
                      {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : formStatus === 'error' ? 'Error - Try Again' : 'Send Message'}
                    </button>
                  </form>

                  <div className="flex justify-center gap-6 mt-12">
                    <a href="https://github.com/Concretizzare/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B70] hover:text-white transition-colors">
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/luca-franchi-325b83198" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6B6B70] hover:text-white transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div
              className="fixed left-4 right-4 bottom-3 sm:left-6 sm:right-6 sm:bottom-4 md:bottom-6 h-px bg-[#2a2a2d] z-20"
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: currentCategory.accentColor }}
                animate={{
                  width: `${((categorySectionIndex + 1) / (categoryProjects.length + (currentCategory.showShowcase || currentCategory.mcpProjects ? 3 : 2))) * 100}%`
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar - Hidden when project or category is open */}
      <div
        className={`fixed left-4 right-4 bottom-3 sm:left-6 sm:right-6 sm:bottom-4 md:bottom-6 h-px bg-[#2a2a2d] z-[5] ${selectedProject || selectedCategory ? 'invisible' : ''}`}
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <motion.div
          className="h-full bg-[#E8E4DF]"
          animate={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/393275762477"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-12 right-6 z-[250] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

function GallerySection({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 text-white section-shell"
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
    >
      {children}
    </motion.div>
  )
}

function BrowserPreview({ url, screenshot, projectColor }: { url: string | null; screenshot: string; projectColor: string }) {
  const domain = url ? new URL(url).hostname : ''
  const WrapperComponent = url ? 'a' : 'div'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10 sm:mb-12 w-full max-w-5xl mx-auto px-1 sm:px-0"
    >
      {/* Browser Window */}
      <WrapperComponent
        {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`block w-full rounded-xl overflow-hidden border border-[#2a2a2d] hover:border-[#4a4a4d] transition-colors ${url ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ boxShadow: `0 25px 80px -25px ${projectColor}40` }}
      >
        {/* Browser Header */}
        <div className="bg-[#1a1a1d] px-4 py-3 flex items-center border-b border-[#2a2a2d]">
          {/* Window Controls */}
          <div className="flex gap-2 w-16">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* URL Bar - Centered */}
          <div className="flex-1 flex items-center justify-center">
            {url && (
              <div className="bg-[#0f0f12] rounded-lg px-4 py-1.5 flex items-center gap-2 justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B6B70" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[#A1A1A6] text-sm">{domain}</span>
              </div>
            )}
          </div>

          {/* External Link Icon - Same width as dots for balance */}
          <div className="flex items-center justify-end w-16 text-[#6B6B70]">
            {url && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            )}
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative">
          <img
            src={screenshot}
            alt={url ? `${domain} preview` : 'Project preview'}
            className="w-full h-auto block max-h-[320px] sm:max-h-[420px] md:max-h-[760px] object-cover object-top"
            loading="lazy"
          />
        </div>
      </WrapperComponent>

      {/* Visit Site Button */}
      {url && (
        <div className="flex justify-center mt-6">
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-lg text-sm font-medium transition-all bg-white text-[#0A0A0B]"
          >
            Visit Live Site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        </div>
      )}
    </motion.div>
  )
}
