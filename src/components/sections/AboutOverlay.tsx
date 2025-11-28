'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '@/store/navigation'

const SKILLS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
  { category: 'Design', items: ['Figma', 'Motion Design', 'UI/UX', '3D'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel'] },
]

export function AboutOverlay() {
  const { currentSection, setSection } = useNavigationStore()
  const isVisible = currentSection === 'about'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="min-h-screen px-8 py-32 flex items-center justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="caption mb-4 block"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  ABOUT
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="heading-2 mb-6"
                >
                  The Operator
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <p className="body" style={{ color: 'var(--text-secondary)' }}>
                    Creative Director and Principal Software Engineer with a passion
                    for crafting digital experiences that blur the line between
                    technology and art.
                  </p>
                  <p className="body" style={{ color: 'var(--text-secondary)' }}>
                    Specializing in high-end web experiences, 3D interfaces, and
                    luxury e-commerce platforms. Every project is an opportunity
                    to push boundaries and create something memorable.
                  </p>
                  <p className="body" style={{ color: 'var(--text-secondary)' }}>
                    Based in the intersection of code and design, where precision
                    meets creativity.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSection('contact')}
                    className="px-6 py-3 rounded-full transition-colors duration-300"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'var(--bg-primary)',
                    }}
                  >
                    <span className="text-sm font-medium">Get in Touch</span>
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/resume.pdf"
                    className="px-6 py-3 rounded-full transition-colors duration-300"
                    style={{
                      background: 'var(--glass)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span className="text-sm font-medium">View Resume</span>
                  </motion.a>
                </motion.div>
              </div>

              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="caption mb-6 block"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  CAPABILITIES
                </motion.span>

                <div className="space-y-8">
                  {SKILLS.map((skill, i) => (
                    <motion.div
                      key={skill.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    >
                      <h3
                        className="text-sm font-medium mb-3"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {skill.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 rounded-full text-xs"
                            style={{
                              background: 'var(--glass)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="mt-12 p-6 rounded-xl"
                  style={{
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <h4
                    className="caption mb-3"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    PHILOSOPHY
                  </h4>
                  <p
                    className="body-large italic"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    "Every pixel is intentional. Every interaction is considered.
                    Every project is a statement."
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
