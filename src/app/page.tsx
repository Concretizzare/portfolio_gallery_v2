'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/lib/utils'

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const closingByPop = useRef(false)

  const projectHashMap: Record<string, string> = {
    ecommerce: 'antoniolupi',
    hybrid: 'luxury',
    boutique: 'feelippos',
    shipping: 'shippingapp',
    'ai-render': 'smartrender',
  }

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
    { id: 'intro', label: 'Intro' },
    ...PROJECTS.map(p => ({ id: p.id, label: p.title })),
    { id: 'opensource', label: 'MCP Servers' },
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
      if (selectedProject) return

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
      if (selectedProject) return
      touchStartY = e.touches[0].clientY
      touchDelta = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (selectedProject) return
      e.preventDefault()
      const currentY = e.touches[0].clientY
      touchDelta = touchStartY - currentY
    }

    const handleTouchEnd = () => {
      if (selectedProject) return

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
  }, [sections.length, selectedProject])

  useEffect(() => {
    if (!selectedProject) return

    closingByPop.current = false

    const handlePopState = () => {
      closingByPop.current = true
      setSelectedProject(null)
    }

    window.addEventListener('popstate', handlePopState)
    const hash = projectHashMap[selectedProject] ?? selectedProject
    window.history.pushState({ project: selectedProject }, '', `#${hash}`)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      if (!closingByPop.current) {
        window.history.back()
      }
    }
  }, [selectedProject])

  const project = selectedProject ? PROJECTS.find(p => p.id === selectedProject) : null

  return (
    <div className="h-[100svh] md:h-screen w-screen bg-[#0A0A0B] overflow-hidden relative">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 pb-2 md:px-6 md:pb-5 flex items-center justify-between bg-[#0A0A0B]/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 20px)' }}
      >
        <button
          onClick={() => setActiveSection(0)}
          className="text-xs text-[#6B6B70] hover:text-white transition-colors"
        >
          Portfolio
        </button>
        <nav className="flex items-center gap-4 md:gap-6">
          {['Work', 'About', 'Contact'].map((item, i) => (
            <button
              key={item}
              onClick={() => setActiveSection(item === 'Work' ? 1 : item === 'About' ? sections.length - 2 : sections.length - 1)}
              className="text-xs text-[#6B6B70] hover:text-white transition-colors"
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

      {/* Main Content */}
      <div className="relative h-full">
        {/* Intro Section */}
        <GallerySection isActive={activeSection === 0}>
              <div className="flex flex-col items-center justify-center h-full text-center px-4 md:px-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tight mb-6"
                >
                  Portfolio Gallery
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-[#6B6B70] text-base md:text-lg max-w-md"
                >
                  A curated collection of digital experiences
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
              </div>
        </GallerySection>

        {/* Project Sections */}
        {PROJECTS.map((proj, i) => (
          <GallerySection key={proj.id} isActive={activeSection === i + 1}>
                <div className="flex items-center justify-center h-full px-4 md:px-8 lg:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 max-w-6xl w-full items-center landscape-grid">
                    {/* Left - Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="order-2 lg:order-1"
                    >
                      <span className="text-xs text-[#6B6B70] uppercase tracking-widest mb-2 md:mb-4 lg:mb-4 block">
                        {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl md:text-3xl lg:text-5xl font-light mb-2 md:mb-4 lg:mb-4 line-clamp-1 md:line-clamp-2 lg:line-clamp-none">{proj.title}</h2>
                      <p className="text-[#A1A1A6] mb-2 md:mb-4 lg:mb-6 text-sm md:text-base line-clamp-1 lg:line-clamp-none">{proj.subtitle}</p>
                      <p className="text-[#6B6B70] text-sm leading-relaxed mb-4 md:mb-6 lg:mb-8 line-clamp-2 md:line-clamp-3 lg:line-clamp-none landscape-hide">{proj.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6 lg:mb-8 landscape-hide">
                        {proj.tech.slice(0, 4).map(tech => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 text-xs border border-[#3a3a3d] text-[#6B6B70]"
                          >
                            {tech}
                          </span>
                        ))}
                        <span className="hidden lg:inline-flex flex-wrap gap-2">
                          {proj.tech.slice(4).map(tech => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs border border-[#3a3a3d] text-[#6B6B70]"
                            >
                              {tech}
                            </span>
                          ))}
                        </span>
                        {proj.tech.length > 4 && (
                          <span className="px-2 md:px-3 py-1 text-xs border border-[#3a3a3d] text-[#6B6B70] md:inline lg:hidden">
                            +{proj.tech.length - 4}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(proj.id)}
                        className="inline-flex items-center gap-2 text-sm text-[#E8E4DF] hover:gap-4 transition-all"
                      >
                        View Project <span>→</span>
                      </button>
                    </motion.div>

                    {/* Right - Preview */}
                    <motion.div
                      initial={{ opacity: 0, x: 50, rotateY: -10 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative cursor-pointer order-1 lg:order-2"
                      style={{ perspective: '1000px' }}
                      onClick={() => setSelectedProject(proj.id)}
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
                        />
                      </div>

                      {/* Floating accent */}
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-lg pointer-events-none landscape-hide"
                        style={{ backgroundColor: proj.color, opacity: 0.1 }}
                      />
                    </motion.div>
                  </div>
                </div>
          </GallerySection>
        ))}

        {/* Open Source Section */}
        <GallerySection isActive={activeSection === sections.length - 3}>
              <div className="flex items-center justify-center h-full px-4 md:px-8 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl w-full"
                >
                  <span className="text-xs text-[#6B6B70] uppercase tracking-widest mb-6 block text-center">Open Source</span>
                  <h2 className="text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center">MCP Servers</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MCP_PROJECTS.map((mcp, idx) => (
                      <motion.div
                        key={mcp.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02, borderColor: '#4a4a4d' }}
                        transition={{
                          opacity: { delay: 0.2 + (0.15 * idx), duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                          y: { delay: 0.2 + (0.15 * idx), duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                          scale: { duration: 0.3, ease: 'easeOut' },
                          borderColor: { duration: 0.3 }
                        }}
                        className="p-6 bg-[#141416] rounded-xl border border-[#2a2a2d] cursor-default"
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

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0B]/95 backdrop-blur-xl overflow-auto"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-6 right-6 text-[#6B6B70] hover:text-white transition-colors z-10"
            >
              ✕ Close
            </button>

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

      {/* Progress Bar */}
      <div
        className="fixed left-4 right-4 bottom-3 sm:left-6 sm:right-6 sm:bottom-4 md:bottom-6 h-px bg-[#2a2a2d]"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <motion.div
          className="h-full bg-[#E8E4DF]"
          animate={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
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
