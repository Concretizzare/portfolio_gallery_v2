'use client'

import { useRef, useEffect, memo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useNavigationStore } from '@/store/navigation'
import { useUIStore } from '@/store/ui'
import { easeOutExpo, lerpVector3, lerp } from '@/lib/utils'
import { OpticalInstrument } from './OpticalInstrument'
import { AmbientParticles } from './AmbientParticles'

const TRANSITION_DURATION = 0.5

export const Experience = memo(function Experience() {
  const { camera } = useThree()
  const transitionStartTime = useRef<number | null>(null)
  const startPosition = useRef<[number, number, number]>([0, 0, 8])
  const startFov = useRef(45)

  const {
    isTransitioning,
    targetCameraState,
    setTransitioning,
    setTransitionProgress,
  } = useNavigationStore()

  const { setLoading, setLoadingProgress } = useUIStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setLoadingProgress(100)
    }, 1200)
    return () => clearTimeout(timer)
  }, [setLoading, setLoadingProgress])

  useEffect(() => {
    if (isTransitioning) {
      transitionStartTime.current = null
      startPosition.current = [camera.position.x, camera.position.y, camera.position.z]
      startFov.current = (camera as THREE.PerspectiveCamera).fov
    }
  }, [isTransitioning, camera])

  useFrame((state) => {
    if (!isTransitioning) return

    if (transitionStartTime.current === null) {
      transitionStartTime.current = state.clock.elapsedTime
    }

    const elapsed = state.clock.elapsedTime - transitionStartTime.current
    const rawProgress = Math.min(elapsed / TRANSITION_DURATION, 1)
    const easedProgress = easeOutExpo(rawProgress)

    setTransitionProgress(rawProgress * 100)

    const newPosition = lerpVector3(
      startPosition.current,
      targetCameraState.position,
      easedProgress
    )

    const newFov = lerp(startFov.current, targetCameraState.fov, easedProgress)

    camera.position.set(...newPosition)
    ;(camera as THREE.PerspectiveCamera).fov = newFov
    camera.lookAt(0, 0, 0)
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()

    if (rawProgress >= 1) {
      setTransitioning(false)
      transitionStartTime.current = null
    }
  })

  return (
    <>
      <color attach="background" args={['#0A0A0B']} />
      <fog attach="fog" args={['#0A0A0B', 12, 22]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[0, 0, 4]} intensity={0.35} color="#E8E4DF" distance={10} />

      <OpticalInstrument />
      <AmbientParticles count={40} />
    </>
  )
})
