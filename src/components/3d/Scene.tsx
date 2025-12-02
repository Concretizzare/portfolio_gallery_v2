'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, memo } from 'react'
import { Experience } from './Experience'
import { LoadingScreen } from '../ui/LoadingScreen'

export const Scene = memo(function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: true,
        }}
        dpr={[1, 1.2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 30,
          position: [0, 0, 8],
        }}
        style={{ background: '#0A0A0B' }}
        frameloop="always"
        performance={{ min: 0.5 }}
        flat
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  )
})
