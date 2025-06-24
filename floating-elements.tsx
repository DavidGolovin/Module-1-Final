"use client"

import { memo, useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export const FloatingElements = memo(() => {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = []
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
        })
      }
      setElements(newElements)
    }

    createElements()
    window.addEventListener("resize", createElements)
    return () => window.removeEventListener("resize", createElements)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setElements((prev) =>
        prev.map((el) => ({
          ...el,
          y: el.y - el.speed,
          y: el.y < -el.size ? window.innerHeight + el.size : el.y - el.speed,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full bg-roots-icon-color"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            opacity: el.opacity,
          }}
        />
      ))}
    </div>
  )
})

FloatingElements.displayName = "FloatingElements"
