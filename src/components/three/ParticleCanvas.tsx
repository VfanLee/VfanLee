'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeStore } from '@/store/useThemeStore'

// Pre-generate stable random data outside the component
const COUNT = 1800
const POSITIONS = new Float32Array(COUNT * 3)
const VELOCITIES = new Float32Array(COUNT * 3)
for (let i = 0; i < COUNT; i++) {
  POSITIONS[i * 3] = (Math.random() - 0.5) * 18
  POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 12
  POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 8
  VELOCITIES[i * 3] = (Math.random() - 0.5) * 0.002
  VELOCITIES[i * 3 + 1] = (Math.random() - 0.5) * 0.001
  VELOCITIES[i * 3 + 2] = 0
}

function ParticleField() {
  const mesh = useRef<THREE.Points>(null!)
  const theme = useThemeStore((s) => s.theme)

  // Clone mutable positions per instance
  const positions = useMemo(() => new Float32Array(POSITIONS), [])
  const velocities = useMemo(() => new Float32Array(VELOCITIES), [])

  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return
    const t = clock.elapsedTime
    mesh.current.rotation.y = t * 0.03
    mesh.current.rotation.x = t * 0.015

    // Subtle mouse parallax
    mesh.current.position.x = mouse.x * 0.4
    mesh.current.position.y = mouse.y * 0.2

    // Drift particles
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      // Wrap around
      if (pos[i * 3] > 9) pos[i * 3] = -9
      if (pos[i * 3] < -9) pos[i * 3] = 9
      if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -6
      if (pos[i * 3 + 1] < -6) pos[i * 3 + 1] = 6
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  const particleColor = theme === 'dark' ? '#6366f1' : '#818cf8'
  const opacity = theme === 'dark' ? 0.65 : 0.45

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={particleColor} transparent opacity={opacity} sizeAttenuation />
    </points>
  )
}

export function ParticleCanvas() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
    </Canvas>
  )
}
