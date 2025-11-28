'use client'

import { AnimatePresence } from 'framer-motion'
import { useStudioStore } from './store'
import { Window } from './Window'
import { ProjectContent } from './contents/ProjectContent'
import { AboutContent } from './contents/AboutContent'
import { ContactContent } from './contents/ContactContent'
import { FinderContent } from './contents/FinderContent'

export function WindowManager() {
  const windows = useStudioStore((s) => s.windows)

  return (
    <AnimatePresence>
      {windows.map((win) => (
        <Window key={win.id} window={win}>
          {win.type === 'project' && <ProjectContent projectId={win.projectId} />}
          {win.type === 'about' && <AboutContent />}
          {win.type === 'contact' && <ContactContent />}
          {win.type === 'finder' && <FinderContent />}
        </Window>
      ))}
    </AnimatePresence>
  )
}
