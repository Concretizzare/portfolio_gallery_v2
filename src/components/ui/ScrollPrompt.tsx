'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { useNavigationStore } from '@/store/navigation'

export function ScrollPrompt() {
  const { hasInteracted, isLoading } = useUIStore()
  const { currentSection } = useNavigationStore()

  const showPrompt = !hasInteracted && !isLoading && currentSection === 'landing'

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        >
          <span className="caption tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>
            SCROLL TO EXPLORE
          </span>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-6 h-10 rounded-full border"
            style={{ borderColor: 'var(--border)' }}
          >
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full"
              style={{ background: 'var(--accent-primary)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
