'use client'

import { useState } from 'react'

export function ContactContent() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">Contact</h1>
        <p className="text-sm text-[#A1A1A6]">Let's work together</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-[#6B6B70] mb-2 block">
              Name
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#0f0f12] border border-[rgba(255,255,255,0.1)] text-white text-sm outline-none focus:border-[#E8E4DF] transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#6B6B70] mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#0f0f12] border border-[rgba(255,255,255,0.1)] text-white text-sm outline-none focus:border-[#E8E4DF] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#6B6B70] mb-2 block">
              Message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-[#0f0f12] border border-[rgba(255,255,255,0.1)] text-white text-sm outline-none focus:border-[#E8E4DF] transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button className="w-full py-2 rounded-lg bg-[#E8E4DF] text-[#0A0A0B] text-sm font-medium hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-[#6B6B70] mb-3">Direct</h2>
            <a href="mailto:hello@studio.dev" className="text-[#A1A1A6] hover:text-white transition-colors text-sm">
              hello@studio.dev
            </a>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-wider text-[#6B6B70] mb-3">Social</h2>
            <div className="flex gap-3">
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-3 py-1.5 rounded-lg bg-[#2a2a2d] text-[#A1A1A6] text-xs hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#28ca41] animate-pulse" />
            <span className="text-xs text-[#6B6B70]">Available for projects</span>
          </div>
        </div>
      </div>
    </div>
  )
}
