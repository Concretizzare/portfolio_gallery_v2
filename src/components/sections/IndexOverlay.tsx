'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '@/store/navigation'
import { PROJECTS } from '@/lib/utils'

export function IndexOverlay() {
  const { currentSection, setSection } = useNavigationStore()
  const isVisible = currentSection === 'index'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-10 pointer-events-none"
        >
          <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-md">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="caption mb-4 block"
              style={{ color: 'var(--text-tertiary)' }}
            >
              SELECTED WORKS
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="heading-2 mb-6"
            >
              Five Masterpieces
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="body mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Scroll through the aperture to explore each project,
              or select directly from the instrument.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-2 pointer-events-auto"
            >
              {PROJECTS.map((project, i) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  onClick={() => setSection(project.slug as any)}
                  className="group flex items-center gap-4 py-2 text-left transition-colors duration-200"
                >
                  <span
                    className="mono text-sm w-6"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="body group-hover:text-[var(--accent-primary)] transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.title}
                  </span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    →
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
