"use client"

import type React from "react"

import { memo, useEffect, useRef } from "react"
import Link from "next/link"
import { X, BookOpen, Clock, CheckCircle } from "lucide-react"

interface CourseSidebarProps {
  currentPage: number
  isOpen: boolean
  onClose: () => void
  pageCompletions?: Record<number, boolean>
  onPageSelect?: (page: number) => void
}

interface LessonData {
  id: number
  title: string
  estimatedTime: number
  description: string
}

const lessons: LessonData[] = [
  { id: 1, title: "Welcome", estimatedTime: 3, description: "Course introduction and overview" },
  { id: 2, title: "Introduction", estimatedTime: 8, description: "Understanding the fundamentals" },
  { id: 3, title: "Market Trends", estimatedTime: 12, description: "Current market analysis" },
  { id: 4, title: "Calculator", estimatedTime: 15, description: "Interactive calculation tools" },
  { id: 5, title: "Win-Win Scenarios", estimatedTime: 6, description: "Beneficial outcomes for all parties" },
  { id: 6, title: "Eligible Loans", estimatedTime: 10, description: "Loan qualification criteria" },
  { id: 7, title: "Quiz", estimatedTime: 8, description: "Test your knowledge" },
  { id: 8, title: "Final Project", estimatedTime: 15, description: "Apply everything you've learned" },
]

export const CourseSidebar = memo<CourseSidebarProps>(
  ({ currentPage, isOpen, onClose, pageCompletions, onPageSelect }) => {
    const sidebarRef = useRef<HTMLElement>(null)
    const firstLinkRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) onClose()
      }
      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown)
        setTimeout(() => firstLinkRef.current?.focus(), 100)
      }
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "unset"
      return () => {
        document.body.style.overflow = "unset"
      }
    }, [isOpen])

    const handleLessonClick = (lessonId: number) => {
      onPageSelect?.(lessonId)
      if (window.innerWidth < 1024) onClose()
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    }

    const completedLessons = pageCompletions ? Object.values(pageCompletions).filter(Boolean).length : 0
    const totalTime = lessons.reduce((sum, l) => sum + l.estimatedTime, 0)

    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={handleBackdropClick} aria-hidden="true" />
        )}
        <nav
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          aria-label="Course navigation"
          role="navigation"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#303030]" />
              <h2 className="font-semibold text-[#303030]">Course Lessons</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#303030]"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5 text-[#303030]" />
            </button>
          </div>

          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="text-sm text-[#303030] mb-2">
              Progress: {completedLessons} / {lessons.length}
            </div>
            <div className="w-full bg-[#EFEFEF] h-2">
              <div
                className="bg-[#CDFF64] h-2 transition-all duration-300"
                style={{ width: `${(completedLessons / lessons.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-[#303030]">
              <Clock className="w-3 h-3 text-[#303030]" />
              <span>~{totalTime} min total</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            <ul className="py-2" role="list">
              {lessons.map((lesson, idx) => {
                const isActive = lesson.id === currentPage
                const isCompleted = pageCompletions?.[lesson.id] || false
                const isAccessible = lesson.id === 1 || pageCompletions?.[lesson.id - 1] || lesson.id <= currentPage

                return (
                  <li key={lesson.id} role="listitem">
                    <Link
                      ref={idx === 0 ? firstLinkRef : undefined}
                      href={`#lesson-${lesson.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        if (isAccessible) handleLessonClick(lesson.id)
                      }}
                      className={
                        `block px-4 py-3 border-l-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#303030] focus:ring-inset ` +
                        (isActive
                          ? "border-blue-600 bg-[#EFEFEF] text-[#303030] font-bold"
                          : isCompleted
                            ? "border-green-400 bg-[#EFEFEF] text-[#303030]"
                            : isAccessible
                              ? "border-transparent bg-white text-[#303030] hover:bg-[#EFEFEF] hover:border-gray-300"
                              : "border-transparent bg-white text-gray-400 cursor-not-allowed")
                      }
                      aria-current={isActive ? "page" : undefined}
                      aria-disabled={!isAccessible}
                      tabIndex={isAccessible ? 0 : -1}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-[#303030]">
                              {lesson.id.toString().padStart(2, "0")}
                            </span>
                            {isCompleted && <CheckCircle className="w-4 h-4 text-[#CDFF64] flex-shrink-0" />}
                          </div>
                          <div className="font-medium truncate text-[#303030]">{lesson.title}</div>
                          <div className="text-xs mt-1 line-clamp-2 text-[#303030]">{lesson.description}</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs ml-2 text-[#303030]">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.estimatedTime}m</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="text-xs text-[#303030] text-center">Use ← → keys to navigate between lessons</div>
          </div>
        </nav>
      </>
    )
  },
)

CourseSidebar.displayName = "CourseSidebar"
