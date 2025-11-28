'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/ui'

export function LoadingScreen() {
  const { isLoading, loadingProgress } = useUIStore()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: '#0A0A0B' }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                className="animate-spin-slow"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#E8E4DF"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${loadingProgress * 2.26} 226`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
                <circle
                  cx="40"
                  cy="40"
                  r="24"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="12"
                  fill="rgba(232, 228, 223, 0.1)"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="caption tracking-[0.2em]">OBSERVATORY</span>
              <span className="mono text-[var(--text-tertiary)]">
                {Math.round(loadingProgress)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
