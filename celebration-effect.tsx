"use client"

import { memo, useEffect, useState } from "react"

interface Confetti {
  id: number
  x: number
  y: number
  color: string
  size: number
  speedX: number
  speedY: number
  rotation: number
}

export const CelebrationEffect = memo(() => {
  const [confetti, setConfetti] = useState<Confetti[]>([])

  useEffect(() => {
    const colors = ["#CDFF64", "#AA7CFB", "#28a745", "#fd7e14", "#dc3545"]
    const newConfetti: Confetti[] = []

    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
      })
    }

    setConfetti(newConfetti)

    const interval = setInterval(() => {
      setConfetti((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.speedX,
            y: piece.y + piece.speedY,
            rotation: piece.rotation + 5,
          }))
          .filter((piece) => piece.y < window.innerHeight + 10),
      )
    }, 16)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setConfetti([])
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
})

CelebrationEffect.displayName = "CelebrationEffect"
