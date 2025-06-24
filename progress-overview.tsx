"use client"

import { memo, useEffect, useState } from "react"
import { EnhancedCard } from "./enhanced-card"
import { TrendingUp, Clock, Award } from "lucide-react"

interface ProgressOverviewProps {
  progress: number
  completed: number
  total: number
  totalDuration: number
  completedLessons?: Set<number>
}

export const ProgressOverview = memo<ProgressOverviewProps>(
  ({ progress, completed, total, totalDuration, completedLessons = new Set() }) => {
    const [displayProgress, setDisplayProgress] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const progressPercentage = Math.round((completed / total) * 100)

    useEffect(() => {
      if (progressPercentage !== displayProgress) {
        setIsAnimating(true)
        const start = displayProgress
        const end = progressPercentage
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
      }
    }, [progressPercentage, displayProgress])

    const formatDuration = (mins: number) => {
      const hrs = Math.floor(mins / 60)
      const m = mins % 60
      return `${hrs}h ${m}m`
    }

    return (
      <EnhancedCard className="global-container">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-[#303030]" />
            <h2 className="text-xl font-bold text-[#303030] font-inter">Your Learning Progress</h2>
          </div>

          {/* Segmented Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#303030] font-inter">Course Completion</span>
              <span className="text-2xl font-bold text-[#303030] font-inter">{displayProgress}%</span>
            </div>

            {/* Progress Segments */}
            <div className="flex gap-1 divide-x divide-white">
              {Array.from({ length: total }, (_, i) => {
                const num = i + 1
                const done = completedLessons.has(num)
                return (
                  <div
                    key={num}
                    className={`h-6 flex-1 transition-all duration-500 ease-in-out ${
                      done ? 'bg-[#CDFF64]' : 'bg-[#EFEFEF]'
                    } ${done && isAnimating ? 'animate-pulse' : ''}`}
                    title={`Lesson ${num} ${done ? '- Completed' : '- Not Started'}`}
                    role="progressbar"
                    aria-valuenow={done ? 100 : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Lesson ${num} ${done ? '(completed)' : '(not completed)'}`}
                  />
                )
              })}
            </div>

            <p className="text-sm text-[#303030] font-inter">
              {completed} of {total} sections completed
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 global-container bg-white">
              <Clock className="w-5 h-5 text-[#303030] mx-auto mb-2" />
              <div className="text-lg font-bold text-[#303030] font-inter">
                {formatDuration(totalDuration)}
              </div>
              <div className="text-sm text-[#303030] font-inter">Total Duration</div>
            </div>

            <div className="text-center p-4 global-container bg-white">
              <Award className="w-5 h-5 text-[#303030] mx-auto mb-2" />
              <div className="text-lg font-bold text-[#303030] font-inter">{completed}</div>
              <div className="text-sm text-[#303030] font-inter">Completed</div>
            </div>
          </div>
        </div>
      </EnhancedCard>
    )
  },
)

ProgressOverview.displayName = "ProgressOverview"
