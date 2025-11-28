'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Ring, Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigationStore, SECTION_ORDER, PROJECT_SECTIONS } from '@/store/navigation'
import { PROJECTS } from '@/lib/utils'

function ApertureBlades() {
  const groupRef = useRef<THREE.Group>(null)
  const { currentSection } = useNavigationStore()

  const targetRotation = useMemo(() => {
    if (currentSection === 'landing') return 0
    if (currentSection === 'index') return 0
    const projectIndex = PROJECT_SECTIONS.indexOf(currentSection)
    if (projectIndex >= 0) {
      return (projectIndex * Math.PI * 2) / 5
    }
    return 0
  }, [currentSection])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotation,
      0.06
    )
  })

  const blades = useMemo(() => {
    return PROJECTS.map((project, i) => {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
      const radius = 2.8
      return {
        ...project,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0,
        ] as [number, number, number],
        angle,
      }
    })
  }, [])

  return (
    <group ref={groupRef}>
      {blades.map((blade, i) => (
        <ProjectBlade
          key={blade.id}
          project={blade}
          index={i}
          isActive={currentSection === blade.slug}
        />
      ))}
    </group>
  )
}

interface ProjectBladeProps {
  project: typeof PROJECTS[number] & {
    position: [number, number, number]
    angle: number
  }
  index: number
  isActive: boolean
}

function ProjectBlade({ project, index, isActive }: ProjectBladeProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const targetZ = isActive ? 0.2 : 0
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.1
    )
  })

  return (
    <group ref={groupRef} position={project.position}>
      <RoundedBox args={[0.9, 1.3, 0.05]} radius={0.05} smoothness={2}>
        <meshStandardMaterial
          color={isActive ? project.color : '#1a1a1d'}
          metalness={0.5}
          roughness={0.4}
          transparent
          opacity={isActive ? 0.9 : 0.6}
        />
      </RoundedBox>

      <Text
        position={[0, -0.9, 0.05]}
        fontSize={0.12}
        color={isActive ? '#FAFAFA' : '#6B6B70'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
      >
        {project.title.toUpperCase()}
      </Text>

      <Text
        position={[0, 0.5, 0.05]}
        fontSize={0.2}
        color={isActive ? '#FAFAFA' : '#3a3a3d'}
        anchorX="center"
        anchorY="middle"
      >
        {String(index + 1).padStart(2, '0')}
      </Text>
    </group>
  )
}

function CoreLens() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const { currentSection } = useNavigationStore()
  const isLanding = currentSection === 'landing'

  useFrame((state) => {
    if (!outerRef.current || !innerRef.current) return
    const time = state.clock.elapsedTime
    outerRef.current.rotation.z = time * 0.08
    innerRef.current.rotation.z = -time * 0.12
  })

  return (
    <group>
      <mesh ref={outerRef}>
        <torusGeometry args={[2, 0.12, 16, 48]} />
        <meshStandardMaterial
          color="#1A1A1D"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      <mesh ref={innerRef}>
        <torusGeometry args={[1.6, 0.06, 12, 48]} />
        <meshStandardMaterial
          color="#E8E4DF"
          metalness={0.85}
          roughness={0.35}
          emissive="#E8E4DF"
          emissiveIntensity={0.05}
        />
      </mesh>

      <mesh>
        <circleGeometry args={[1.4, 48]} />
        <meshStandardMaterial
          color="#0f0f10"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.3, 1.4, 48]} />
        <meshBasicMaterial
          color="#E8E4DF"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  )
}

function OuterRing() {
  const ringRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.03
  })

  const notches = useMemo(() => {
    const count = 36
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * Math.PI * 2) / count
      const radius = 4.2
      const isMain = i % 6 === 0
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0,
        ] as [number, number, number],
        rotation: angle,
        height: isMain ? 0.2 : 0.1,
        opacity: isMain ? 0.5 : 0.25,
      }
    })
  }, [])

  return (
    <group ref={ringRef}>
      <Ring args={[3.9, 4.1, 64]}>
        <meshStandardMaterial
          color="#0A0A0B"
          metalness={0.9}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </Ring>

      {notches.map((notch, i) => (
        <mesh
          key={i}
          position={notch.position}
          rotation={[0, 0, notch.rotation]}
        >
          <planeGeometry args={[0.02, notch.height]} />
          <meshBasicMaterial
            color="#E8E4DF"
            transparent
            opacity={notch.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

export function OpticalInstrument() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const mouseX = state.pointer.x * 0.02
    const mouseY = state.pointer.y * 0.02
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY,
      0.03
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX,
      0.03
    )
  })

  return (
    <group ref={groupRef}>
      <CoreLens />
      <ApertureBlades />
      <OuterRing />
    </group>
  )
}
