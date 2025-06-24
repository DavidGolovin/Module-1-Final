"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface TimeTrackingData {
  currentPageTime: number
  totalTime: number
  pageStartTime: number
  isActive: boolean
}

export function useTimeTracking(currentPage: number) {
  const [timeData, setTimeData] = useState<TimeTrackingData>({
    currentPageTime: 0,
    totalTime: 0,
    pageStartTime: Date.now(),
    isActive: true,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const pageStartTimeRef = useRef<number>(Date.now())
  const totalTimeRef = useRef<number>(0)

  // Handle page visibility changes
  const handleVisibilityChange = useCallback(() => {
    const isVisible = !document.hidden
    setTimeData((prev) => ({ ...prev, isActive: isVisible }))
  }, [])

  // Reset timer when page changes
  useEffect(() => {
    pageStartTimeRef.current = Date.now()
    setTimeData((prev) => ({
      ...prev,
      currentPageTime: 0,
      pageStartTime: Date.now(),
    }))
  }, [currentPage])

  // Set up visibility change listener
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [handleVisibilityChange])

  // Main timer effect
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setTimeData((prev) => {
        if (!prev.isActive) return prev

        const now = Date.now()
        const currentPageTime = Math.floor((now - pageStartTimeRef.current) / 1000)
        const totalTime = totalTimeRef.current + currentPageTime

        return {
          ...prev,
          currentPageTime,
          totalTime,
        }
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timeData.isActive])

  // Update total time when page changes
  useEffect(() => {
    return () => {
      // When component unmounts or page changes, add current page time to total
      const currentPageTime = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
      totalTimeRef.current += currentPageTime
    }
  }, [currentPage])

  return {
    currentPageTime: timeData.currentPageTime,
    totalTime: timeData.totalTime,
    isActive: timeData.isActive,
  }
}
