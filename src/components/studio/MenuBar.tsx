'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function MenuBar() {
  const [time, setTime] = useState(new Date())

  useState(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  })

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-[#2a2a2d]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-4 z-[9999]">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#E8E4DF] to-[#a8a4a0]" />
          <span className="text-xs font-semibold text-white">Studio</span>
        </Link>

        <nav className="flex items-center gap-4">
          {['File', 'Edit', 'View', 'Window', 'Help'].map((item) => (
            <button
              key={item}
              className="text-xs text-[#A1A1A6] hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-[#A1A1A6]">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}
