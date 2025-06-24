"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "course_progress"
const CURRENT_LESSON_KEY = "current_lesson"
const LAST_ACCESSED_KEY = "last_accessed_lesson"

interface ProgressData {
  currentLesson: number
  completedLessons: Set<number>
  lastAccessed: number
  lastAccessedLesson: number
}

export function useProgressTracking(totalLessons = 8) {
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldAutoNavigate, setShouldAutoNavigate] = useState(false)

  // Calculate progress percentage with new logic
  const calculateProgress = useCallback(
    (lesson: number, completed: Set<number>): number => {
      if (lesson === 1) return 1 // First lesson is 1%

      // Remaining 99% distributed across lessons 2-8 (7 lessons)
      const remainingLessons = totalLessons - 1
      const progressPerLesson = 99 / remainingLessons

      // Count completed lessons beyond the first
      const completedBeyondFirst = Array.from(completed).filter((l) => l > 1).length
      const currentBeyondFirst = lesson > 1 ? lesson - 1 : 0

      // Calculate total progress
      let baseProgress = 0
      if (lesson > 1) {
        baseProgress = 1
      }

      const additionalProgress = Math.max(completedBeyondFirst, currentBeyondFirst) * progressPerLesson

      return Math.min(100, Math.round(baseProgress + additionalProgress))
    },
    [totalLessons],
  )

  // Save current lesson to localStorage whenever it changes
  const saveCurrentLesson = useCallback((lesson: number) => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(CURRENT_LESSON_KEY, lesson.toString())
      localStorage.setItem(LAST_ACCESSED_KEY, lesson.toString())
      localStorage.setItem("last_access_timestamp", Date.now().toString())

      // Also update the main progress data
      const existingProgress = localStorage.getItem(STORAGE_KEY)
      if (existingProgress) {
        const data = JSON.parse(existingProgress)
        data.currentLesson = lesson
        data.lastAccessedLesson = lesson
        data.lastAccessed = Date.now()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      }
    } catch (error) {
      console.warn("Failed to save current lesson to localStorage:", error)
    }
  }, [])

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY)
      const savedLesson = localStorage.getItem(CURRENT_LESSON_KEY)
      const lastAccessedLesson = localStorage.getItem(LAST_ACCESSED_KEY)

      let lessonToLoad = 1
      let completedSet = new Set<number>()

      // Load completed lessons
      if (savedProgress) {
        const data: ProgressData = JSON.parse(savedProgress)
        completedSet = new Set(data.completedLessons || [])
        setCompletedLessons(completedSet)
      }

      // Determine which lesson to load (prioritize last accessed)
      if (lastAccessedLesson) {
        const lastLesson = Number.parseInt(lastAccessedLesson, 10)
        if (lastLesson >= 1 && lastLesson <= totalLessons) {
          lessonToLoad = lastLesson
        }
      } else if (savedLesson) {
        const lessonNum = Number.parseInt(savedLesson, 10)
        if (lessonNum >= 1 && lessonNum <= totalLessons) {
          lessonToLoad = lessonNum
        }
      }

      // Set the lesson and mark for auto-navigation if not lesson 1
      setCurrentLesson(lessonToLoad)
      if (lessonToLoad > 1) {
        setShouldAutoNavigate(true)
      }

      console.log(`Resuming at lesson ${lessonToLoad}`)
    } catch (error) {
      console.warn("Failed to load progress from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [totalLessons])

  // Save progress to localStorage
  const saveProgress = useCallback((lesson: number, completed: Set<number>) => {
    if (typeof window === "undefined") return

    try {
      const progressData: ProgressData = {
        currentLesson: lesson,
        completedLessons: completed,
        lastAccessed: Date.now(),
        lastAccessedLesson: lesson,
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...progressData,
          completedLessons: Array.from(completed),
        }),
      )
      localStorage.setItem(CURRENT_LESSON_KEY, lesson.toString())
      localStorage.setItem(LAST_ACCESSED_KEY, lesson.toString())
    } catch (error) {
      console.warn("Failed to save progress to localStorage:", error)
    }
  }, [])

  // Navigate to lesson
  const navigateToLesson = useCallback(
    (lesson: number) => {
      if (lesson >= 1 && lesson <= totalLessons) {
        setCurrentLesson(lesson)
        saveCurrentLesson(lesson)
        saveProgress(lesson, completedLessons)
        setShouldAutoNavigate(false) // Reset auto-navigate flag
      }
    },
    [completedLessons, saveProgress, totalLessons, saveCurrentLesson],
  )

  // Mark lesson as completed
  const markLessonCompleted = useCallback(
    (lesson: number) => {
      const newCompleted = new Set(completedLessons)
      newCompleted.add(lesson)
      setCompletedLessons(newCompleted)
      saveProgress(currentLesson, newCompleted)
    },
    [completedLessons, currentLesson, saveProgress],
  )

  // Go to next lesson
  const nextLesson = useCallback(() => {
    if (currentLesson < totalLessons) {
      const nextLessonNum = currentLesson + 1
      navigateToLesson(nextLessonNum)
    }
  }, [currentLesson, totalLessons, navigateToLesson])

  // Go to previous lesson
  const previousLesson = useCallback(() => {
    if (currentLesson > 1) {
      const prevLessonNum = currentLesson - 1
      navigateToLesson(prevLessonNum)
    }
  }, [currentLesson, navigateToLesson])

  // Reset progress
  const resetProgress = useCallback(() => {
    setCurrentLesson(1)
    setCompletedLessons(new Set())
    setShouldAutoNavigate(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(CURRENT_LESSON_KEY)
      localStorage.removeItem(LAST_ACCESSED_KEY)
      localStorage.removeItem("last_access_timestamp")
    }
  }, [])

  // Calculate current progress percentage
  const progressPercentage = calculateProgress(currentLesson, completedLessons)

  return {
    currentLesson,
    completedLessons,
    progressPercentage,
    isLoaded,
    shouldAutoNavigate,
    navigateToLesson,
    markLessonCompleted,
    nextLesson,
    previousLesson,
    resetProgress,
    canGoNext: currentLesson < totalLessons,
    canGoPrevious: currentLesson > 1,
    isLessonCompleted: (lesson: number) => completedLessons.has(lesson),
    saveCurrentLesson,
  }
}
