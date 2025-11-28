'use client'

import { useEffect, useRef } from 'react'
import { useNavigationStore } from '@/store/navigation'
import { useUIStore } from '@/store/ui'

const SCROLL_THRESHOLD = 50
const COOLDOWN_MS = 700

export function useScrollNavigation() {
  const lastNavigationTime = useRef(0)
  const accumulatedDelta = useRef(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const store = useNavigationStore.getState()
      const uiStore = useUIStore.getState()

      if (!uiStore.hasInteracted) {
        uiStore.setHasInteracted(true)
      }

      if (store.isTransitioning) {
        return
      }

      const now = Date.now()
      if (now - lastNavigationTime.current < COOLDOWN_MS) {
        return
      }

      accumulatedDelta.current += e.deltaY

      if (Math.abs(accumulatedDelta.current) >= SCROLL_THRESHOLD) {
        if (accumulatedDelta.current > 0) {
          store.nextSection()
        } else {
          store.previousSectionNav()
        }
        accumulatedDelta.current = 0
        lastNavigationTime.current = now
      }
    }

    const resetDelta = () => {
      accumulatedDelta.current = 0
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    const resetInterval = setInterval(resetDelta, 200)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearInterval(resetInterval)
    }
  }, [])
}
