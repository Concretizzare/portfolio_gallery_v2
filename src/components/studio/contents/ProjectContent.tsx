'use client'

import { PROJECTS } from '@/lib/utils'

interface ProjectContentProps {
  projectId?: string
}

export function ProjectContent({ projectId }: ProjectContentProps) {
  const project = PROJECTS.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="p-8 text-center text-[#6B6B70]">
        Project not found
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-start gap-6 mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ backgroundColor: project.color + '20', color: project.color }}
        >
          {project.title.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">{project.title}</h1>
          <p className="text-sm text-[#A1A1A6]">{project.subtitle}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#6B6B70] mb-2">Description</h2>
          <p className="text-[#A1A1A6] leading-relaxed">{project.description}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#6B6B70] mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#2a2a2d] text-[#A1A1A6] border border-[rgba(255,255,255,0.05)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className="aspect-video rounded-xl bg-[#0f0f12] border border-[rgba(255,255,255,0.05)] flex items-center justify-center"
        >
          <span className="text-xs text-[#6B6B70] uppercase tracking-wider">Project Preview</span>
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: project.color, color: '#0A0A0B' }}
          >
            View Live Site
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
