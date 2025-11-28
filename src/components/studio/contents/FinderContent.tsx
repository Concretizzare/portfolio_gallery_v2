'use client'

import { PROJECTS } from '@/lib/utils'
import { useStudioStore } from '../store'

export function FinderContent() {
  const openWindow = useStudioStore((s) => s.openWindow)

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 bg-[#141416] border-r border-[rgba(255,255,255,0.05)] p-3 flex-shrink-0">
        <div className="mb-4">
          <h3 className="text-[10px] uppercase tracking-wider text-[#6B6B70] mb-2 px-2">
            Favorites
          </h3>
          <div className="space-y-0.5">
            {['All Projects', 'Recent', 'Starred'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-2 py-1.5 rounded text-xs text-[#A1A1A6] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-wider text-[#6B6B70] mb-2 px-2">
            Categories
          </h3>
          <div className="space-y-0.5">
            {['E-Commerce', 'SaaS', 'AI/ML', 'Design'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-2 py-1.5 rounded text-xs text-[#A1A1A6] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-white">All Projects</h2>
          <span className="text-xs text-[#6B6B70]">{PROJECTS.length} items</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onDoubleClick={() => openWindow('project', project.title, project.id)}
              className="p-4 rounded-xl bg-[#0f0f12] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-colors text-left group"
            >
              <div
                className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center text-lg font-semibold"
                style={{ backgroundColor: project.color + '20', color: project.color }}
              >
                {project.title.charAt(0)}
              </div>
              <h3 className="text-sm text-white mb-1 group-hover:text-[#E8E4DF] transition-colors">
                {project.title}
              </h3>
              <p className="text-[10px] text-[#6B6B70] line-clamp-2">
                {project.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
