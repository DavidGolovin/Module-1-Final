// components/universal-progress-bar.tsx
"use client"

interface UniversalProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
  animated?: boolean
}

export function UniversalProgressBar({
  progress,
  className = "",
  showPercentage = true,
  animated = true,
}: UniversalProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Percentage Label */}
      {showPercentage && (
        <div className="flex justify-between items-center mb-2 text-sm font-inter text-[#303030]">
          <span>Course Progress</span>
          <span className="font-bold">{clampedProgress}%</span>
        </div>
      )}

      {/* Bar Container */}
      <div className="relative w-full h-3 bg-[#EFEFEF] border border-gray-300 shadow-sm overflow-hidden">
        {/* Fill */}
        <div
          className={`h-full bg-[#CDFF64] transition-all duration-500 ${animated ? "ease-out" : ""}`}
          style={{
            width: `${clampedProgress}%`,
            transition: animated ? "width 0.5s ease-out" : "none",
          }}
        />
      </div>

      {/* Footer Text */}
      {showPercentage && (
        <div className="flex justify-between items-center mt-2 text-xs font-inter text-[#303030]">
          <span>Progress</span>
          <span className="font-medium">{clampedProgress}% Complete</span>
        </div>
      )}
    </div>
  )
}
