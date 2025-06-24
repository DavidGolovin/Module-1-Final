"use client"

import { memo } from "react"

interface BackgroundPatternProps {
  className?: string
}

export const BackgroundPattern = memo<BackgroundPatternProps>(({ className = "" }) => {
  return <div className={`fixed inset-0 pointer-events-none z-0 ${className}`} aria-hidden="true" />
})

BackgroundPattern.displayName = "BackgroundPattern"
