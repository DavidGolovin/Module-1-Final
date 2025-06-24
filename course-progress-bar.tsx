"use client"

import { memo } from "react"
import { ChevronLeft, ChevronRight, Clock, CheckCircle, Lock, Play } from "lucide-react"

interface CourseProgressBarProps {
  currentLesson: number
  totalLessons: number
  onPreviousLesson?: () => void
  onNextLesson?: () => void
  onNavigateToLesson?: (lessonNumber: number) => void
  canGoBack?: boolean
  canGoForward?: boolean
  completedLessons?: Set<number>
  lessonTimeSpent?: Record<number, number>
  lessonStartTimes?: Record<number, number>
}

const lessonTitles: Record<number, string> = {
  1: "Welcome",
  2: "Introduction",
  3: "Market Trends",
  4: "Calculator",
  5: "Win-Win Scenarios",
  6: "Eligible Loans",
  7: "Quiz",
  8: "Final Project",
}

const lessonEstimatedTimes: Record<number, number> = {
  1: 120,
  2: 180,
  3: 300,
  4: 240,
  5: 150,
  6: 180,
  7: 300,
  8: 120,
}

const lessonDescriptions: Record<number, string> = {
  1: "Get started with course registration",
  2: "Learn the fundamentals of assumable mortgages",
  3: "Explore current market trends and data",
  4: "Practice with the mortgage calculator",
  5: "Understand win-win scenarios for all parties",
  6: "Discover which loans are eligible for assumption",
  7: "Test your knowledge with interactive quiz",
  8: "Complete your final project and celebrate",
}

export const CourseProgressBar = memo<CourseProgressBarProps>(
  ({
    currentLesson,
    totalLessons,
    onPreviousLesson,
    onNextLesson,
    onNavigateToLesson,
    canGoBack = true,
    canGoForward = true,
    completedLessons = new Set(),
    lessonTimeSpent = {},
    lessonStartTimes = {},
  }) => {
    const currentLessonTitle = lessonTitles[currentLesson] || `Lesson ${currentLesson}`
    const isCurrentLessonCompleted = completedLessons.has(currentLesson)

    const formatTime = (seconds: number): string => {
      if (seconds < 60) return `${seconds}s`
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
    }

    const getCompletionPercentage = (lessonNumber: number): number => {
      const timeSpent = lessonTimeSpent[lessonNumber] || 0
      const estimatedTime = lessonEstimatedTimes[lessonNumber] || 180
      return Math.min(Math.round((timeSpent / estimatedTime) * 100), 100)
    }

    const getLessonStatus = (lessonNumber: number) => {
      if (completedLessons.has(lessonNumber)) {
        return {
          status: "completed" as const,
          icon: <CheckCircle className="w-3 h-3" />,
          color: "#CDFF64",
        }
      }
      if (lessonNumber === currentLesson) {
        return {
          status: "current" as const,
          icon: <Play className="w-3 h-3" />,
          color: "#303030",
        }
      }
      if (lessonTimeSpent[lessonNumber] && lessonTimeSpent[lessonNumber] > 0) {
        return {
          status: "in-progress" as const,
          icon: <Clock className="w-3 h-3" />,
          color: "#FFA500",
        }
      }
      if (lessonNumber === 1 || completedLessons.has(lessonNumber - 1)) {
        return {
          status: "available" as const,
          icon: <Clock className="w-3 h-3" />,
          color: "#EFEFEF",
        }
      }
      return {
        status: "locked" as const,
        icon: <Lock className="w-3 h-3" />,
        color: "#CCCCCC",
      }
    }

    const generateTooltipContent = (lessonNumber: number): string => {
      const title = lessonTitles[lessonNumber] || `Lesson ${lessonNumber}`
      const description = lessonDescriptions[lessonNumber] || "Course content"
      const estimatedTime = lessonEstimatedTimes[lessonNumber] || 180
      const timeSpent = lessonTimeSpent[lessonNumber] || 0
      const { status } = getLessonStatus(lessonNumber)
      const completionPercentage = getCompletionPercentage(lessonNumber)

      let statusText = ""
      let timeInfo = ""
      let actionHint = ""

      switch (status) {
        case "completed":
          statusText = "✅ COMPLETED"
          timeInfo = `Time spent: ${formatTime(timeSpent)} / ${formatTime(estimatedTime)}`
          actionHint = "Click to revisit this lesson"
          break
        case "current":
          statusText = "▶️ CURRENT LESSON"
          timeInfo =
            timeSpent > 0
              ? `Progress: ${completionPercentage}% (${formatTime(timeSpent)} / ${formatTime(estimatedTime)})`
              : `Estimated time: ${formatTime(estimatedTime)}`
          actionHint = "Continue with this lesson"
          break
        case "in-progress":
          statusText = "⏳ IN PROGRESS"
          timeInfo = `Progress: ${completionPercentage}% (${formatTime(timeSpent)} / ${formatTime(estimatedTime)})`
          actionHint = "Click to continue this lesson"
          break
        case "available":
          statusText = "🔓 AVAILABLE"
          timeInfo = `Estimated time: ${formatTime(estimatedTime)}`
          actionHint = "Click to start this lesson"
          break
        case "locked":
          statusText = "🔒 LOCKED"
          timeInfo = `Estimated time: ${formatTime(estimatedTime)}`
          actionHint = "Complete previous lessons to unlock"
          break
      }

      return `${title}\n${description}\n\n${statusText}\n${timeInfo}\n\n${actionHint}`
    }

    return (
      <div className="global-container sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          {/* Navigation and Title */}
          <div className="flex items-center justify-between mb-4">
            {/* Previous Button */}
            <button
              onClick={onPreviousLesson}
              disabled={!canGoBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#303030] bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#303030]"
              aria-label="Go to previous lesson"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Current Lesson Info */}
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <h2 className="text-lg font-bold text-[#303030] font-inter">{currentLessonTitle}</h2>
                {isCurrentLessonCompleted && (
                  <div className="w-5 h-5 bg-[#303030] text-[#CDFF64] flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </div>
              <p className="text-sm text-[#303030] font-inter">
                Lesson {currentLesson} of {totalLessons}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1 text-xs text-[#666]">
                <Clock className="w-3 h-3" />
                <span>
                  {lessonTimeSpent[currentLesson] > 0
                    ? `${formatTime(lessonTimeSpent[currentLesson])} / ${formatTime(lessonEstimatedTimes[currentLesson] || 180)}`
                    : `Est. ${formatTime(lessonEstimatedTimes[currentLesson] || 180)}`}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={onNextLesson}
              disabled={!canGoForward}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#303030] ${
                canGoForward
                  ? "bg-[#303030] text-[#CDFF64] hover:bg-[#404040]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              aria-label="Go to next lesson"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="flex gap-1 justify-center mb-3">
              {Array.from({ length: totalLessons }, (_, index) => {
                const lessonNumber = index + 1
                const isCompleted = completedLessons.has(lessonNumber)
                const isActive = lessonNumber === currentLesson
                const { status, icon, color } = getLessonStatus(lessonNumber)
                const canNavigate =
                  isCompleted || isActive || lessonNumber === 1 || completedLessons.has(lessonNumber - 1)
                const completionPercentage = getCompletionPercentage(lessonNumber)

                return (
                  <div key={lessonNumber} className="relative group">
                    <button
                      onClick={() => {
                        if (canNavigate) {
                          onNavigateToLesson?.(lessonNumber)
                        }
                      }}
                      className={`h-4 flex-1 max-w-[60px] transition-all duration-300 ease-in-out relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#303030] focus:ring-offset-1 ${
                        canNavigate
                          ? "cursor-pointer hover:opacity-80 hover:scale-105"
                          : "cursor-not-allowed opacity-60"
                      }`}
                      style={{ backgroundColor: color }}
                      disabled={!canNavigate}
                      aria-label={`Navigate to ${lessonTitles[lessonNumber]} - ${status}`}
                    >
                      {status === "in-progress" && completionPercentage > 0 && (
                        <div
                          className="absolute left-0 top-0 h-full bg-[#CDFF64] transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      )}
                      {isActive && <div className="absolute inset-0 ring-2 ring-[#303030] animate-pulse" />}
                    </button>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="bg-[#303030] text-white text-xs rounded-lg p-3 shadow-lg min-w-[200px] max-w-[280px]">
                        <div className="whitespace-pre-line text-left">{generateTooltipContent(lessonNumber)}</div>

                        {(status === "in-progress" || status === "current") && lessonTimeSpent[lessonNumber] > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-600">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-1.5">
                              <div
                                className="bg-[#CDFF64] h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${completionPercentage}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-center mt-2 pt-2 border-t border-gray-600">
                          <div className="flex items-center gap-1" style={{ color }}>
                            {icon}
                            <span className="text-xs font-medium">
                              {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#303030]" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-[#303030] font-inter">Course Progress</span>
            </div>

            {/* Lesson Indicators */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalLessons }, (_, index) => {
                const lessonNumber = index + 1
                const isActive = lessonNumber === currentLesson
                const isCompleted = completedLessons.has(lessonNumber)
                const { status, color } = getLessonStatus(lessonNumber)
                const canNavigate =
                  isCompleted || isActive || lessonNumber === 1 || completedLessons.has(lessonNumber - 1)

                return (
                  <div key={lessonNumber} className="relative group">
                    <button
                      onClick={() => {
                        if (canNavigate) {
                          onNavigateToLesson?.(lessonNumber)
                        }
                      }}
                      className={`w-2 h-2 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#303030] focus:ring-offset-1 ${
                        canNavigate ? "cursor-pointer hover:scale-150" : "cursor-not-allowed opacity-60"
                      }`}
                      style={{ backgroundColor: color }}
                      disabled={!canNavigate}
                      aria-label={`Navigate to ${lessonTitles[lessonNumber]}`}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40">
                      <div className="bg-[#303030] text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {lessonTitles[lessonNumber]} ({status})
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-[#303030]" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Course Summary */}
            <div className="mt-4 text-center">
              <div className="flex justify-center items-center gap-4 text-xs text-[#666]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Total: {formatTime(Object.values(lessonEstimatedTimes).reduce((a, b) => a + b, 0))}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>
                    Completed:{" "}
                    {formatTime(
                      Array.from(completedLessons)
                        .map((lesson) => lessonTimeSpent[lesson] || lessonEstimatedTimes[lesson] || 0)
                        .reduce((a, b) => a + b, 0),
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

CourseProgressBar.displayName = "CourseProgressBar"
