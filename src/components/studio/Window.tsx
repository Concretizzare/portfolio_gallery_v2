'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useStudioStore, WindowState } from './store'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export function Window({ window: win, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useStudioStore()

  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  if (win.isMinimized) return null

  const position = win.isMaximized
    ? { x: 0, y: 28 }
    : win.position

  const size = win.isMaximized
    ? { width: '100vw', height: 'calc(100vh - 28px - 80px)' }
    : { width: win.size.width, height: win.size.height }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: win.zIndex,
      }}
      className="flex flex-col rounded-xl overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.1)]"
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title Bar */}
      <motion.div
        drag={!win.isMaximized}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false)
          updateWindowPosition(win.id, {
            x: win.position.x + info.offset.x,
            y: win.position.y + info.offset.y,
          })
        }}
        onDoubleClick={() => maximizeWindow(win.id)}
        className="h-10 bg-[#2a2a2d] flex items-center justify-between px-3 cursor-move flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => closeWindow(win.id)}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
          />
          <button
            onClick={() => minimizeWindow(win.id)}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 transition-all"
          />
          <button
            onClick={() => maximizeWindow(win.id)}
            className="w-3 h-3 rounded-full bg-[#28ca41] hover:brightness-110 transition-all"
          />
        </div>

        <span className="text-xs text-[#A1A1A6] font-medium absolute left-1/2 -translate-x-1/2">
          {win.title}
        </span>

        <div className="w-16" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 bg-[#1a1a1d] overflow-auto">
        {children}
      </div>
    </motion.div>
  )
}
