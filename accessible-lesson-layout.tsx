"use client"

import type React from "react"

interface AccessibleLessonLayoutProps {
  children: React.ReactNode
  lessonNumber: number
  lessonTitle: string
  className?: string
}

export function AccessibleLessonLayout({
  children,
  lessonNumber,
  lessonTitle,
  className = "",
}: AccessibleLessonLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 z-50"
      >
        Skip to main content
      </a>

      <main id="main-content" className="flex-1 p-6" role="main">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-[#303030] font-inter">
              Lesson {lessonNumber}: {lessonTitle}
            </h1>
          </header>
          <div className="bg-white p-6 border border-gray-200 shadow-sm">{children}</div>
        </div>
      </main>
    </div>
  )
}
