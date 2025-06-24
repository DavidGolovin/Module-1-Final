"use client"

import { memo } from "react"

interface LessonGridProps {
  currentLesson: number
  completedLessons: Set<number>
  onLessonSelect: (lessonNumber: number) => void
}

const lessons = [
  { id: 1, title: "Welcome", description: "Course introduction and overview" },
  { id: 2, title: "Introduction", description: "Understanding the fundamentals" },
  { id: 3, title: "Market Trends", description: "Current market analysis" },
  { id: 4, title: "Calculator", description: "Interactive calculation tools" },
  { id: 5, title: "Win-Win Scenarios", description: "Beneficial outcomes for all parties" },
  { id: 6, title: "Eligible Loans", description: "Loan qualification criteria" },
  { id: 7, title: "Quiz", description: "Test your knowledge" },
  { id: 8, title: "Final Project", description: "Apply everything you've learned" },
]

export const LessonGrid = memo<LessonGridProps>(({ currentLesson, completedLessons, onLessonSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {lessons.map((lesson) => {
        const isActive = lesson.id === currentLesson
        const isCompleted = completedLessons.has(lesson.id)
        const isAccessible = lesson.id === 1 || completedLessons.has(lesson.id - 1) || lesson.id <= currentLesson

        return (
          <button
            key={lesson.id}
            onClick={() => isAccessible && onLessonSelect(lesson.id)}
            disabled={!isAccessible}
            className={`
              lesson-card text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${!isAccessible ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}
            `}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={!isAccessible}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium font-inter ${isActive ? "text-blue-600" : "text-gray-500"}`}>
                  {lesson.id.toString().padStart(2, "0")}
                </span>
                {isCompleted && (
                  <div className="w-5 h-5 bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </div>
              {isActive && <div className="w-2 h-2 bg-blue-600 animate-pulse" />}
            </div>

            <h3
              className={`text-lg font-semibold mb-2 font-inter ${isActive ? "text-blue-600 font-bold" : "text-gray-900"}`}
            >
              {lesson.title}
            </h3>
            <p className={`text-sm font-inter ${isActive ? "text-blue-500" : "text-gray-600"}`}>{lesson.description}</p>

            {!isAccessible && lesson.id > 1 && (
              <div className="mt-2 text-xs text-gray-400 font-inter">Complete previous lesson to unlock</div>
            )}
          </button>
        )
      })}
    </div>
  )
})

LessonGrid.displayName = "LessonGrid"
