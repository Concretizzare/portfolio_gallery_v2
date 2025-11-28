'use client'

import dynamic from 'next/dynamic'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { Header } from './ui/Header'
import { Navigation, SectionIndicator } from './ui/Navigation'
import { ScrollPrompt } from './ui/ScrollPrompt'
import { CommandPalette } from './ui/CommandPalette'
import { LandingOverlay } from './sections/LandingOverlay'
import { IndexOverlay } from './sections/IndexOverlay'
import { ProjectOverlay } from './sections/ProjectOverlay'
import { AboutOverlay } from './sections/AboutOverlay'
import { ContactOverlay } from './sections/ContactOverlay'

const Scene = dynamic(
  () => import('./3d/Scene').then((mod) => mod.Scene),
  { ssr: false }
)

export function App() {
  useScrollNavigation()
  useKeyboardNavigation()

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Scene />

      <div className="ui-layer">
        <Header />
        <Navigation />
        <SectionIndicator />
        <ScrollPrompt />

        <LandingOverlay />
        <IndexOverlay />
        <ProjectOverlay />
        <AboutOverlay />
        <ContactOverlay />

        <CommandPalette />
      </div>
    </main>
  )
}
