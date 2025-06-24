"use client"

import { useState, useEffect, useCallback } from "react"
import { useLocalStorage } from "usehooks-ts"
import { useAchievements } from "./use-achievements"

type Progress = {
  currentLesson: number
  completedLessons: Set<number>
}

const useEnhancedProgressTracking = (courseId: string) => {
  const [currentLesson, setCurrentLesson] = useState(1)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [progress, setProgress] = useLocalStorage<Progress>(`progress-${courseId}`, {
    currentLesson: 1,
    completedLessons: new Set(),
  })

  useEffect(() => {
    if (progress) {
      setCurrentLesson(progress.currentLesson)
      setCompletedLessons(new Set(progress.completedLessons))
    }
  }, [progress])

  const saveProgress = useCallback(
    (lessonNumber: number, completed: Set<number>) => {
      setProgress({ currentLesson: lessonNumber, completedLessons: completed })
    },
    [setProgress],
  )

  const markLessonComplete = useCallback(
    (lessonNumber: number) => {
      setCompletedLessons((prev) => {
        const newCompleted = new Set(prev)
        newCompleted.add(lessonNumber)
        saveProgress(currentLesson, newCompleted)
        return newCompleted
      })
    },
    [currentLesson, saveProgress],
  )

  const goToNextLesson = useCallback(() => {
    setCurrentLesson((prev) => prev + 1)
    saveProgress(currentLesson + 1, completedLessons)
  }, [completedLessons, currentLesson, saveProgress])

  const goToLesson = useCallback(
    (lessonNumber: number) => {
      setCurrentLesson(lessonNumber)
      saveProgress(lessonNumber, completedLessons)
    },
    [completedLessons, saveProgress],
  )

  const { checkAchievements } = useAchievements()

  const markLessonCompleted = useCallback(
    (lessonNumber: number) => {
      setCompletedLessons((prev) => {
        const newCompleted = new Set(prev)
        newCompleted.add(lessonNumber)
        saveProgress(currentLesson, newCompleted)

        // Check for achievements
        checkAchievements(newCompleted)

        return newCompleted
      })
    },
    [currentLesson, saveProgress, checkAchievements],
  )

  const handleQuizResult = useCallback(
    (passed: boolean, score: number) => {
      checkAchievements(completedLessons, { passed, score })
    },
    [checkAchievements, completedLessons],
  )

  return {
    currentLesson,
    completedLessons,
    markLessonComplete,
    goToNextLesson,
    goToLesson,
    markLessonCompleted,
    handleQuizResult,
  }
}

export { useEnhancedProgressTracking }
