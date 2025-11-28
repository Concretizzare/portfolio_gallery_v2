'use client'

import { motion } from 'framer-motion'
import { useStudioStore } from './store'
import { PROJECTS } from '@/lib/utils'

const desktopIcons = [
  { id: 'about', label: 'About Me', type: 'about' as const, icon: '👤' },
  { id: 'contact', label: 'Contact', type: 'contact' as const, icon: '✉️' },
  { id: 'finder', label: 'Projects', type: 'finder' as const, icon: '📁' },
]

export function Desktop() {
  const openWindow = useStudioStore((s) => s.openWindow)

  return (
    <div
      className="fixed inset-0 pt-7 pb-20"
      style={{
        background: 'linear-gradient(180deg, #1a1a1d 0%, #0f0f12 100%)',
      }}
    >
      {/* Desktop Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {desktopIcons.map((icon, i) => (
          <motion.button
            key={icon.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onDoubleClick={() => openWindow(icon.type, icon.label)}
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors w-20"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2a2a2d] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-2xl">
              {icon.icon}
            </div>
            <span className="text-[10px] text-white text-center leading-tight">
              {icon.label}
            </span>
          </motion.button>
        ))}

        <div className="h-4" />

        {/* Project Icons */}
        {PROJECTS.slice(0, 3).map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            onDoubleClick={() => openWindow('project', project.title, project.id)}
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors w-20"
          >
            <div
              className="w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-lg font-medium"
              style={{ backgroundColor: project.color + '20', color: project.color }}
            >
              {project.title.charAt(0)}
            </div>
            <span className="text-[10px] text-white text-center leading-tight truncate w-full">
              {project.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
