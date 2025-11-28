'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '@/store/navigation'

export function LandingOverlay() {
  const { currentSection } = useNavigationStore()
  const isVisible = currentSection === 'landing'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
        >
          <div className="text-center max-w-2xl px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="heading-1 mb-6"
            >
              <span className="text-gradient">Observatory</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="body-large"
              style={{ color: 'var(--text-secondary)' }}
            >
              A precision instrument for exploring digital craft
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 mx-auto w-24 h-px"
              style={{ background: 'var(--border)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
