'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Experience } from './Experience'
import { LoadingScreen } from '../ui/LoadingScreen'

export function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [0, 0, 8],
        }}
        style={{ background: '#0A0A0B' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  )
}
