"use client"

import { memo, useEffect, type ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
  currentLesson?: number
  onLessonChange?: (lesson: number) => void
}

export const PageContainer = memo<PageContainerProps>(
  ({ children, title, subtitle, className = "", currentLesson, onLessonChange }) => {
    // Save current lesson to localStorage when it changes
    useEffect(() => {
      if (currentLesson && onLessonChange) {
        // Save to localStorage
        try {
          localStorage.setItem("current_lesson", currentLesson.toString())
          localStorage.setItem("last_accessed_lesson", currentLesson.toString())
          localStorage.setItem("last_access_timestamp", Date.now().toString())

          console.log(`Saved current lesson: ${currentLesson}`)
        } catch (error) {
          console.warn("Failed to save current lesson:", error)
        }
      }
    }, [currentLesson, onLessonChange])

    return (
      <div className={`min-h-screen bg-roots-page-bg font-inter ${className}`}>
        {(title || subtitle) && (
          <header className="bg-gradient-to-r from-roots-container-bg to-roots-light-gray border-b border-roots-border-line">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
              {title && (
                <h1 className="text-3xl md:text-4xl font-bold text-roots-text mb-2 animate-fade-in-up">{title}</h1>
              )}
              {subtitle && (
                <p className="text-lg text-roots-dark-gray animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  {subtitle}
                </p>
              )}
            </div>
          </header>
        )}
        <main className="container mx-auto px-4 py-8 max-w-6xl">{children}</main>
      </div>
    )
  },
)

PageContainer.displayName = "PageContainer"
