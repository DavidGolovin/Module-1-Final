"use client"

import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  shape: "circle" | "square" | "triangle"
}

interface ConfettiCelebrationProps {
  isVisible: boolean
  onComplete?: () => void
  duration?: number
  intensity?: "low" | "medium" | "high"
  colors?: string[]
}

export function ConfettiCelebration({
  isVisible,
  onComplete,
  duration = 3000,
  intensity = "high",
  colors = ["#CDFF64", "#AA7CFB", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899", "#10B981"],
}: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitializedRef = useRef(false)

  // Check for reduced motion preference (only once)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Generate confetti count based on intensity (memoized)
  const confettiCount = useMemo(() => {
    switch (intensity) {
      case "low":
        return 30
      case "medium":
        return 60
      case "high":
        return 100
      default:
        return 60
    }
  }, [intensity])

  // Stable colors array (memoized)
  const stableColors = useMemo(() => colors, [colors.join(",")])

  // Create initial confetti pieces (memoized)
  const createConfettiPieces = useCallback(() => {
    if (typeof window === "undefined") return []

    const pieces: ConfettiPiece[] = []
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    for (let i = 0; i < confettiCount; i++) {
      pieces.push({
        id: i,
        x: Math.random() * windowWidth,
        y: -20 - Math.random() * 100,
        color: stableColors[Math.floor(Math.random() * stableColors.length)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
      })
    }

    return pieces
  }, [confettiCount, stableColors])

  // Handle confetti animation
  useEffect(() => {
    // Clear any existing timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!isVisible || prefersReducedMotion) {
      setConfetti([])
      isInitializedRef.current = false
      return
    }

    // Only initialize once per visibility change
    if (!isInitializedRef.current) {
      const initialPieces = createConfettiPieces()
      setConfetti(initialPieces)
      isInitializedRef.current = true

      // Animate confetti
      intervalRef.current = setInterval(() => {
        setConfetti((prev) => {
          if (typeof window === "undefined") return prev

          return prev
            .map((piece) => ({
              ...piece,
              x: piece.x + piece.speedX,
              y: piece.y + piece.speedY,
              rotation: piece.rotation + piece.rotationSpeed,
              speedY: piece.speedY + 0.1, // Add gravity
            }))
            .filter((piece) => piece.y < window.innerHeight + 50)
        })
      }, 16) // ~60fps

      // Clean up after duration
      timeoutRef.current = setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setConfetti([])
        isInitializedRef.current = false
        onComplete?.()
      }, duration)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isVisible, prefersReducedMotion, duration]) // Removed createConfettiPieces and onComplete from deps

  // Handle completion callback separately to avoid re-renders
  const handleComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  // Render confetti piece based on shape
  const renderConfettiPiece = useCallback((piece: ConfettiPiece) => {
    const baseStyle = {
      position: "absolute" as const,
      left: piece.x,
      top: piece.y,
      width: piece.size,
      height: piece.size,
      backgroundColor: piece.color,
      transform: `rotate(${piece.rotation}deg)`,
      pointerEvents: "none" as const,
    }

    switch (piece.shape) {
      case "circle":
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              borderRadius: "50%",
            }}
          />
        )
      case "square":
        return <div key={piece.id} style={baseStyle} />
      case "triangle":
        return (
          <div
            key={piece.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
          />
        )
      default:
        return null
    }
  }, [])

  if (!isVisible) return null

  // Show static celebration for reduced motion
  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        onAnimationComplete={handleComplete}
      >
        <div className="text-8xl animate-bounce">🎉</div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20 animate-pulse" />
      </motion.div>
    )
  }

  // Full confetti animation
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Confetti pieces */}
        {confetti.map(renderConfettiPiece)}

        {/* Optional background flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-pink-400/10 to-blue-400/10"
        />

        {/* Central celebration text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-2xl font-bold text-white bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm"
            >
              Congratulations!
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
