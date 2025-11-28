'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '@/store/navigation'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'LI' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'TW' },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: 'DR' },
]

export function ContactOverlay() {
  const { currentSection } = useNavigationStore()
  const isVisible = currentSection === 'contact'

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: '', email: '', message: '' })

    setTimeout(() => setIsSubmitted(false), 3000)
  }

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
                  CONTACT
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="heading-2 mb-6"
                >
                  Let's Connect
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="body mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Have a project in mind? Looking to collaborate?
                  Or just want to say hello? I'd love to hear from you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <a
                    href="mailto:hello@observatory.dev"
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'var(--glass)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-[var(--text-tertiary)]"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 5-10-5" />
                      </svg>
                    </span>
                    <span
                      className="body group-hover:text-[var(--accent-primary)] transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      hello@observatory.dev
                    </span>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <span
                    className="caption mb-4 block"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    ELSEWHERE
                  </span>
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                        style={{
                          background: 'var(--glass)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-secondary)',
                        }}
                        title={link.label}
                      >
                        <span className="text-xs font-medium">{link.icon}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="mt-12 flex items-center gap-3"
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#4ECDC4' }}
                  />
                  <span className="caption" style={{ color: 'var(--text-tertiary)' }}>
                    AVAILABLE FOR PROJECTS
                  </span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="caption mb-2 block"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-lg bg-transparent transition-colors duration-200 outline-none body"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="caption mb-2 block"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-lg bg-transparent transition-colors duration-200 outline-none body"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="caption mb-2 block"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-lg bg-transparent transition-colors duration-200 outline-none body resize-none"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-lg font-medium transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isSubmitted
                        ? '#4ECDC4'
                        : 'var(--accent-primary)',
                      color: 'var(--bg-primary)',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg
                            className="animate-spin w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray="32"
                              strokeLinecap="round"
                            />
                          </svg>
                          Transmitting...
                        </motion.span>
                      ) : isSubmitted ? (
                        <motion.span
                          key="submitted"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Message Sent!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Transmit Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
