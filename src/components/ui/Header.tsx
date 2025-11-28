'use client'

import { motion } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { useNavigationStore } from '@/store/navigation'

export function Header() {
  const { toggleCommandPalette, toggleSettings } = useUIStore()
  const { setSection, currentSection } = useNavigationStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-20 px-8 py-6">
      <div className="flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={() => setSection('landing')}
          className="group flex items-center gap-3"
        >
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300"
              />
              <circle
                cx="16"
                cy="16"
                r="8"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[var(--border)] group-hover:text-[var(--accent-primary)] transition-colors duration-300"
              />
              <circle
                cx="16"
                cy="16"
                r="3"
                fill="currentColor"
                className="text-[var(--accent-primary)]"
              />
            </svg>
          </div>
          <span className="caption tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            OBSERVATORY
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <button
            onClick={toggleCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md glass-panel hover:bg-[var(--glass-highlight)] transition-colors duration-200"
          >
            <span className="mono text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Navigate
            </span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--bg-surface)] text-[var(--text-tertiary)]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setSection('about')}
            className="caption hover:text-[var(--accent-primary)] transition-colors duration-200"
            style={{ color: currentSection === 'about' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
          >
            About
          </button>

          <button
            onClick={() => setSection('contact')}
            className="caption hover:text-[var(--accent-primary)] transition-colors duration-200"
            style={{ color: currentSection === 'contact' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
          >
            Contact
          </button>
        </motion.div>
      </div>
    </header>
  )
}
