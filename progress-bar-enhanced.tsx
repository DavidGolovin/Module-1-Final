// components/progress-bar-enhanced.tsx
"use client"

import { memo, useEffect, useState } from "react"

interface ProgressBarEnhancedProps {
  currentProgress: number
  previousProgress?: number
  animated?: boolean
  showPercentage?: boolean
  className?: string
}

export const ProgressBarEnhanced = memo<ProgressBarEnhancedProps>(
  ({ currentProgress, previousProgress = 0, animated = true, showPercentage = true, className = "" }) => {
    const [displayProgress, setDisplayProgress] = useState(previousProgress)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
      if (animated && currentProgress !== displayProgress) {
        setIsAnimating(true)
        const start = displayProgress
        const end = currentProgress
        const duration = 800
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const ratio = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - ratio, 3)
          const value = start + (end - start) * eased
          setDisplayProgress(Math.round(value))
          if (ratio < 1) requestAnimationFrame(animate)
          else {
            setDisplayProgress(end)
            setIsAnimating(false)
          }
        }

        requestAnimationFrame(animate)
      } else {
        setDisplayProgress(currentProgress)
      }
    }, [currentProgress, displayProgress, animated])

    return (
      <div className={`w-full ${className}`}>
        {/* Progress bar container */}
        <div className="relative w-full h-3 bg-[#EFEFEF] border border-gray-300 shadow-sm overflow-hidden">
          {/* Progress fill */}
          <div
            className={`h-full bg-[#CDFF64] transition-all duration-300 ${isAnimating ? "ease-out" : ""}`}
            style={{
              width: `${displayProgress}%`,
              transition: animated ? "width 0.8s ease-out" : "none",
            }}
          >
            {/* Shine effect during animation */}
            {isAnimating && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            )}
          </div>

          {/* Progress percentage overlay */}
          {showPercentage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-xs font-medium font-inter ${
                  displayProgress > 50 ? "text-[#CDFF64]" : "text-[#303030]"
                }`}
              >
                {displayProgress}%
              </span>
            </div>
          )}
        </div>

        {/* Progress text below bar */}
        {showPercentage && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-[#303030] font-inter">Progress</span>
            <span className="text-xs text-[#303030] font-inter font-medium">{displayProgress}% Complete</span>
          </div>
        )}
      </div>
    )
  },
)

ProgressBarEnhanced.displayName = "ProgressBarEnhanced"
