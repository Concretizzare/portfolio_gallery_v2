'use client'

import { useEffect } from 'react'
import { useNavigationStore, Section } from '@/store/navigation'
import { useUIStore } from '@/store/ui'

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const navStore = useNavigationStore.getState()
      const uiStore = useUIStore.getState()

      if (e.key === 'Escape') {
        if (uiStore.isCommandPaletteOpen) {
          uiStore.closeCommandPalette()
          return
        }
        if (uiStore.isSettingsOpen) {
          uiStore.closeSettings()
          return
        }
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        uiStore.toggleCommandPalette()
        return
      }

      if (uiStore.isCommandPaletteOpen || uiStore.isSettingsOpen) return

      if (navStore.isTransitioning) return

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'j':
          e.preventDefault()
          navStore.nextSection()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'k':
          e.preventDefault()
          navStore.previousSectionNav()
          break
        case 'Home':
          e.preventDefault()
          navStore.setSection('landing')
          break
        case 'End':
          e.preventDefault()
          navStore.setSection('contact')
          break
        case '1':
          e.preventDefault()
          navStore.setSection('project-ecommerce')
          break
        case '2':
          e.preventDefault()
          navStore.setSection('project-hybrid')
          break
        case '3':
          e.preventDefault()
          navStore.setSection('project-boutique')
          break
        case '4':
          e.preventDefault()
          navStore.setSection('project-shipping')
          break
        case '5':
          e.preventDefault()
          navStore.setSection('project-ai-render')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
