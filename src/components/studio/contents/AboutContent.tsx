'use client'

export function AboutContent() {
  return (
    <div className="p-6">
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E8E4DF] to-[#a8a4a0] flex items-center justify-center text-3xl">
          👤
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">About Me</h1>
          <p className="text-sm text-[#A1A1A6]">Creative Director & Engineer</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#6B6B70] mb-2">Bio</h2>
          <p className="text-[#A1A1A6] leading-relaxed">
            Creative Director and Principal Software Engineer with a passion for crafting
            digital experiences that blur the line between technology and art.
          </p>
          <p className="text-[#A1A1A6] leading-relaxed mt-3">
            Specializing in high-end web experiences, 3D interfaces, and luxury e-commerce
            platforms. Every project is an opportunity to push boundaries.
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wider text-[#6B6B70] mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Frontend', items: ['React', 'Next.js', 'Three.js'] },
              { label: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL'] },
              { label: 'Design', items: ['Figma', 'Motion', '3D'] },
              { label: 'Tools', items: ['Git', 'Docker', 'AWS'] },
            ].map((category) => (
              <div key={category.label}>
                <h3 className="text-xs text-white mb-2">{category.label}</h3>
                <div className="flex flex-wrap gap-1">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded text-[10px] bg-[#2a2a2d] text-[#6B6B70]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0f0f12] border border-[rgba(255,255,255,0.05)]">
          <p className="text-sm text-[#A1A1A6] italic">
            "Every pixel is intentional. Every interaction is considered."
          </p>
        </div>
      </div>
    </div>
  )
}
