'use client'

import { motion } from 'framer-motion'
import { useNavigationStore, SECTION_ORDER, Section } from '@/store/navigation'
import { useUIStore } from '@/store/ui'
import { cn } from '@/lib/utils'

const SECTION_LABELS: Record<Section, string> = {
  landing: 'Home',
  index: 'Projects',
  'project-ecommerce': 'E-Commerce',
  'project-hybrid': 'Hybrid',
  'project-boutique': 'Boutique',
  'project-shipping': 'Shipping',
  'project-ai-render': 'AI Render',
  about: 'About',
  contact: 'Contact',
}

export function Navigation() {
  const { currentSection, setSection, isTransitioning } = useNavigationStore()
  const { hasInteracted } = useUIStore()

  const currentIndex = SECTION_ORDER.indexOf(currentSection)

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-20">
      <div className="flex flex-col items-end gap-3">
        {SECTION_ORDER.map((section, index) => {
          const isActive = currentSection === section
          const isPast = index < currentIndex

          return (
            <button
              key={section}
              onClick={() => !isTransitioning && setSection(section)}
              disabled={isTransitioning}
              className={cn(
                'group flex items-center gap-3 transition-opacity duration-300',
                isTransitioning && 'pointer-events-none'
              )}
            >
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="caption text-right"
                style={{ color: 'var(--text-primary)' }}
              >
                {SECTION_LABELS[section]}
              </motion.span>

              <div className="relative flex items-center justify-center w-3 h-3">
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    background: isActive
                      ? 'var(--accent-primary)'
                      : isPast
                      ? 'var(--text-tertiary)'
                      : 'var(--border)',
                  }}
                  animate={{
                    width: isActive ? 12 : 6,
                    height: isActive ? 12 : 6,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />

                {isActive && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{ background: 'var(--accent-primary)' }}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function SectionIndicator() {
  const { currentSection } = useNavigationStore()
  const currentIndex = SECTION_ORDER.indexOf(currentSection)

  return (
    <div className="fixed left-8 bottom-8 z-20 flex items-center gap-4">
      <span className="mono" style={{ color: 'var(--text-tertiary)' }}>
        {String(currentIndex + 1).padStart(2, '0')}
      </span>
      <div
        className="w-16 h-px"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          className="h-full"
          style={{ background: 'var(--accent-primary)' }}
          animate={{
            width: `${((currentIndex + 1) / SECTION_ORDER.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="mono" style={{ color: 'var(--text-tertiary)' }}>
        {String(SECTION_ORDER.length).padStart(2, '0')}
      </span>
    </div>
  )
}
