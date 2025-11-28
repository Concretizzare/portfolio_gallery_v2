'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { useNavigationStore, Section, SECTION_ORDER } from '@/store/navigation'
import { PROJECTS, cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  section: Section
  category: 'navigation' | 'project'
  shortcut?: string
}

const COMMANDS: CommandItem[] = [
  { id: 'home', label: 'Home', section: 'landing', category: 'navigation', shortcut: 'H' },
  { id: 'projects', label: 'All Projects', section: 'index', category: 'navigation', shortcut: 'P' },
  { id: 'about', label: 'About', section: 'about', category: 'navigation', shortcut: 'A' },
  { id: 'contact', label: 'Contact', section: 'contact', category: 'navigation', shortcut: 'C' },
  ...PROJECTS.map((p, i) => ({
    id: p.id,
    label: p.title,
    section: p.slug as Section,
    category: 'project' as const,
    shortcut: String(i + 1),
  })),
]

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette } = useUIStore()
  const { setSection } = useNavigationStore()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCommands = useMemo(() => {
    if (!query) return COMMANDS
    const lower = query.toLowerCase()
    return COMMANDS.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lower) ||
        cmd.id.toLowerCase().includes(lower)
    )
  }, [query])

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isCommandPaletteOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleSelect = (command: CommandItem) => {
    setSection(command.section)
    closeCommandPalette()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          handleSelect(filteredCommands[selectedIndex])
        }
        break
    }
  }

  const navigationCommands = filteredCommands.filter((c) => c.category === 'navigation')
  const projectCommands = filteredCommands.filter((c) => c.category === 'project')

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeCommandPalette}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
          >
            <div
              className="overflow-hidden rounded-xl border shadow-2xl"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border)',
              }}
            >
              <div
                className="flex items-center gap-3 px-4 py-3 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[var(--text-tertiary)]"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none body"
                />
                <kbd className="px-2 py-1 rounded text-xs bg-[var(--bg-surface)] text-[var(--text-tertiary)]">
                  ESC
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[var(--text-tertiary)]">
                    No results found
                  </div>
                ) : (
                  <>
                    {navigationCommands.length > 0 && (
                      <div className="px-2 py-1">
                        <div className="px-2 py-1.5 caption text-[var(--text-tertiary)]">
                          Navigation
                        </div>
                        {navigationCommands.map((cmd) => {
                          const globalIndex = filteredCommands.indexOf(cmd)
                          return (
                            <CommandItem
                              key={cmd.id}
                              command={cmd}
                              isSelected={selectedIndex === globalIndex}
                              onSelect={() => handleSelect(cmd)}
                              onHover={() => setSelectedIndex(globalIndex)}
                            />
                          )
                        })}
                      </div>
                    )}

                    {projectCommands.length > 0 && (
                      <div className="px-2 py-1">
                        <div className="px-2 py-1.5 caption text-[var(--text-tertiary)]">
                          Projects
                        </div>
                        {projectCommands.map((cmd) => {
                          const globalIndex = filteredCommands.indexOf(cmd)
                          return (
                            <CommandItem
                              key={cmd.id}
                              command={cmd}
                              isSelected={selectedIndex === globalIndex}
                              onSelect={() => handleSelect(cmd)}
                              onHover={() => setSelectedIndex(globalIndex)}
                            />
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface CommandItemProps {
  command: CommandItem
  isSelected: boolean
  onSelect: () => void
  onHover: () => void
}

function CommandItem({ command, isSelected, onSelect, onHover }: CommandItemProps) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-150',
        isSelected
          ? 'bg-[var(--accent-subtle)]'
          : 'hover:bg-[var(--glass)]'
      )}
    >
      <span
        className="body"
        style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}
      >
        {command.label}
      </span>
      {command.shortcut && (
        <kbd
          className="px-1.5 py-0.5 rounded text-[10px]"
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--text-tertiary)',
          }}
        >
          {command.shortcut}
        </kbd>
      )}
    </button>
  )
}
