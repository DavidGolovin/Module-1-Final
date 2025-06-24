"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "course-progress"
const CURRENT_LESSON_KEY = "current-lesson"

interface CourseProgress {
  currentLesson: number
  completedLessons: Set<number>
  lastAccessed: string
}

export function useCourseProgress(totalLessons = 8) {
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Fixed progress calculation: Lesson 1 = 1%, remaining 99% across 7 lessons
  const calculateProgress = useCallback((lesson: number) => {
    if (lesson === 1) return 1

    // Distribute 99% across lessons 2-8 (7 lessons total)
    // 99 ÷ 7 = 14.14... → Use 14% base + 1% extra for lesson 2
    // Result: L1=1%, L2=15%, L3-L8=14% each = 100% total
    let progress = 1 // Lesson 1 = 1%

    for (let i = 2; i <= lesson; i++) {
      // Lesson 2 gets 15%, lessons 3-8 get 14% each
      progress += i === 2 ? 15 : 14
    }

    return Math.min(progress, 100)
  }, [])

  const progressPercentage = calculateProgress(currentLesson)

  // Save progress to localStorage
  const saveProgress = useCallback((lesson: number, completed: Set<number>) => {
    try {
      const progress: CourseProgress = {
        currentLesson: lesson,
        completedLessons: Array.from(completed),
        lastAccessed: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
      localStorage.setItem(CURRENT_LESSON_KEY, lesson.toString())
    } catch (error) {
      console.warn("Failed to save course progress:", error)
    }
  }, [])

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY)
      const savedCurrentLesson = localStorage.getItem(CURRENT_LESSON_KEY)

      if (savedProgress) {
        const parsed: CourseProgress = JSON.parse(savedProgress)
        setCompletedLessons(new Set(parsed.completedLessons || []))
      }

      if (savedCurrentLesson) {
        const lessonNum = Number.parseInt(savedCurrentLesson, 10)
        if (lessonNum >= 1 && lessonNum <= totalLessons) {
          setCurrentLesson(lessonNum)
        }
      }
    } catch (error) {
      console.warn("Failed to load course progress:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [totalLessons])

  // Add URL hash navigation support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const lessonMatch = hash.match(/#lesson-(\d+)/)
      if (lessonMatch) {
        const lessonNum = Number.parseInt(lessonMatch[1], 10)
        if (lessonNum >= 1 && lessonNum <= totalLessons) {
          console.log(`Navigating to lesson ${lessonNum} via URL hash`)
          setCurrentLesson(lessonNum)
          saveProgress(lessonNum, completedLessons)
        }
      }
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [totalLessons, completedLessons])

  // Navigate to specific lesson
  const navigateToLesson = useCallback(
    (lessonNumber: number) => {
      if (lessonNumber >= 1 && lessonNumber <= totalLessons) {
        console.log(`Navigating to lesson ${lessonNumber}`)
        console.log(`Current completed lessons:`, Array.from(completedLessons))
        setCurrentLesson(lessonNumber)
        saveProgress(lessonNumber, completedLessons)
        // Update URL hash
        window.history.replaceState(null, "", `#lesson-${lessonNumber}`)
      }
    },
    [totalLessons, completedLessons],
  )

  // Mark lesson as completed
  const markLessonCompleted = useCallback(
    (lessonNumber: number) => {
      console.log(`Marking lesson ${lessonNumber} as completed`)
      setCompletedLessons((prev) => {
        const newCompleted = new Set(prev)
        const wasAlreadyCompleted = newCompleted.has(lessonNumber)
        newCompleted.add(lessonNumber)

        console.log(`Completed lessons updated:`, Array.from(newCompleted))
        console.log(`Lesson ${lessonNumber} was ${wasAlreadyCompleted ? "already" : "newly"} completed`)

        saveProgress(currentLesson, newCompleted)
        return newCompleted
      })
    },
    [currentLesson],
  )

  // Navigation helpers
  const nextLesson = useCallback(() => {
    if (currentLesson < totalLessons) {
      const nextLessonNum = currentLesson + 1
      setCurrentLesson(nextLessonNum)
      saveProgress(nextLessonNum, completedLessons)
    }
  }, [currentLesson, totalLessons, completedLessons])

  const previousLesson = useCallback(() => {
    if (currentLesson > 1) {
      const prevLessonNum = currentLesson - 1
      setCurrentLesson(prevLessonNum)
      saveProgress(prevLessonNum, completedLessons)
    }
  }, [currentLesson, completedLessons])

  // Check if can navigate
  const canGoNext = currentLesson < totalLessons
  const canGoPrevious = currentLesson > 1

  // Check if lesson is completed
  const isLessonCompleted = useCallback(
    (lessonNumber: number) => {
      return completedLessons.has(lessonNumber)
    },
    [completedLessons],
  )

  // Handle initial hash on load
  useEffect(() => {
    const hash = window.location.hash
    const lessonMatch = hash.match(/#lesson-(\d+)/)
    if (lessonMatch) {
      const lessonNum = Number.parseInt(lessonMatch[1], 10)
      if (lessonNum >= 1 && lessonNum <= totalLessons) {
        console.log(`Navigating to lesson ${lessonNum} via URL hash`)
        setCurrentLesson(lessonNum)
        saveProgress(lessonNum, completedLessons)
      }
    }
  }, [totalLessons, completedLessons])

  return {
    currentLesson,
    completedLessons,
    progressPercentage,
    isLoaded,
    navigateToLesson,
    markLessonCompleted,
    nextLesson,
    previousLesson,
    canGoNext,
    canGoPrevious,
    isLessonCompleted,
  }
}
