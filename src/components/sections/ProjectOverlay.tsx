'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore, PROJECT_SECTIONS } from '@/store/navigation'
import { PROJECTS } from '@/lib/utils'

export function ProjectOverlay() {
  const { currentSection, setSection } = useNavigationStore()

  const projectIndex = PROJECT_SECTIONS.indexOf(currentSection)
  const isVisible = projectIndex >= 0
  const project = isVisible ? PROJECTS[projectIndex] : null

  if (!project) return null

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-10 pointer-events-none"
        >
          <div className="absolute inset-8 flex">
            <div className="flex-1 flex flex-col justify-center max-w-xl">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onClick={() => setSection('index')}
                className="pointer-events-auto flex items-center gap-2 mb-8 caption hover:text-[var(--accent-primary)] transition-colors duration-200"
                style={{ color: 'var(--text-tertiary)' }}
              >
                ← Back to Projects
              </motion.button>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="caption mb-4"
                style={{ color: project.color }}
              >
                {String(projectIndex + 1).padStart(2, '0')} / {PROJECTS.length.toString().padStart(2, '0')}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="heading-2 mb-2"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="body-large mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="body mb-8"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: 'var(--glass)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {project.url && (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  <span className="text-sm font-medium">View Live Site</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.a>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg aspect-video rounded-lg overflow-hidden"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="caption" style={{ color: 'var(--text-tertiary)' }}>
                    PROJECT MEDIA
                  </span>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: project.color, opacity: 0.5 }}
                />
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {projectIndex > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setSection(PROJECT_SECTIONS[projectIndex - 1])}
                className="pointer-events-auto flex items-center gap-2 caption hover:text-[var(--accent-primary)] transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
              >
                ← {PROJECTS[projectIndex - 1].title}
              </motion.button>
            )}

            {projectIndex < PROJECT_SECTIONS.length - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setSection(PROJECT_SECTIONS[projectIndex + 1])}
                className="pointer-events-auto flex items-center gap-2 caption hover:text-[var(--accent-primary)] transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {PROJECTS[projectIndex + 1].title} →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
