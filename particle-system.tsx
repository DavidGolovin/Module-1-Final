"use client"

import { memo, useEffect, useState, useCallback } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

interface ParticleSystemProps {
  active: boolean
  count?: number
  colors?: string[]
}

export const ParticleSystem = memo<ParticleSystemProps>(
  ({ active, count = 30, colors = ["#CDFF64", "#AA7CFB", "#28a745"] }) => {
    const [particles, setParticles] = useState<Particle[]>([])

    const createParticle = useCallback(
      (id: number): Particle => ({
        id,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 10,
        vx: (Math.random() - 0.5) * 4,
        vy: -(Math.random() * 3 + 2),
        life: 0,
        maxLife: Math.random() * 60 + 60,
        color: colors[Math.floor(Math.random() * colors.length)],
      }),
      [colors],
    )

    useEffect(() => {
      if (!active) {
        setParticles([])
        return
      }

      const initialParticles = Array.from({ length: count }, (_, i) => createParticle(i))
      setParticles(initialParticles)

      const interval = setInterval(() => {
        setParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              life: p.life + 1,
            }))
            .filter((p) => p.life < p.maxLife && p.y > -10),
        )
      }, 16)

      return () => clearInterval(interval)
    }, [active, count, createParticle])

    if (!active) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-40">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity: 1 - particle.life / particle.maxLife,
            }}
          />
        ))}
      </div>
    )
  },
)

ParticleSystem.displayName = "ParticleSystem"
