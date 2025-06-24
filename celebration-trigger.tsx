"use client"

import type React from "react"

import { memo, useCallback } from "react"
import { Sparkles } from "lucide-react"

interface CelebrationTriggerProps {
  onTrigger?: () => void
  children?: React.ReactNode
  className?: string
}

export const CelebrationTrigger = memo<CelebrationTriggerProps>(({ onTrigger, children, className = "" }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onTrigger?.()
    },
    [onTrigger],
  )

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-[#CDFF64] text-[#303030] font-medium font-inter transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Sparkles className="w-4 h-4" />
      {children || "Celebrate!"}
    </button>
  )
})

CelebrationTrigger.displayName = "CelebrationTrigger"
