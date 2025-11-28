'use client'

import { motion } from 'framer-motion'
import { useStudioStore } from './store'
import { PROJECTS } from '@/lib/utils'

const dockItems = [
  { id: 'finder', label: 'Projects', icon: '📁', type: 'finder' as const },
  { id: 'about', label: 'About', icon: '👤', type: 'about' as const },
  { id: 'contact', label: 'Contact', icon: '✉️', type: 'contact' as const },
]

export function Dock() {
  const { windows, openWindow, focusWindow } = useStudioStore()
  const minimizedWindows = windows.filter(w => w.isMinimized)

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998]"
    >
      <div className="flex items-end gap-1 px-3 py-2 rounded-2xl bg-[#2a2a2d]/80 backdrop-blur-xl border border-[rgba(255,255,255,0.1)]">
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => openWindow(item.type, item.label)}
            isActive={windows.some(w => w.type === item.type && !w.isMinimized)}
          />
        ))}

        <div className="w-px h-8 bg-[rgba(255,255,255,0.1)] mx-2" />

        {PROJECTS.map((project) => (
          <DockIcon
            key={project.id}
            icon={project.title.charAt(0)}
            label={project.title}
            color={project.color}
            onClick={() => openWindow('project', project.title, project.id)}
            isActive={windows.some(w => w.projectId === project.id && !w.isMinimized)}
          />
        ))}

        {minimizedWindows.length > 0 && (
          <>
            <div className="w-px h-8 bg-[rgba(255,255,255,0.1)] mx-2" />
            {minimizedWindows.map((win) => (
              <DockIcon
                key={win.id}
                icon="◻️"
                label={win.title}
                onClick={() => focusWindow(win.id)}
                isMinimized
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  )
}

interface DockIconProps {
  icon: string
  label: string
  color?: string
  onClick: () => void
  isActive?: boolean
  isMinimized?: boolean
}

function DockIcon({ icon, label, color, onClick, isActive, isMinimized }: DockIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex flex-col items-center group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border border-[rgba(255,255,255,0.1)] transition-colors"
        style={{
          backgroundColor: color ? color + '20' : '#3a3a3d',
          color: color || '#fff',
        }}
      >
        {icon.length === 1 && !icon.match(/\p{Emoji}/u) ? (
          <span className="font-semibold">{icon}</span>
        ) : (
          icon
        )}
      </div>

      {isActive && (
        <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white" />
      )}

      <div className="absolute -top-8 px-2 py-1 rounded bg-[#1a1a1d] text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
    </motion.button>
  )
}
