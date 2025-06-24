"use client"

import { useState, useEffect, useCallback } from "react"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

const ACHIEVEMENTS_STORAGE_KEY = "course-achievements"

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    unlocked: false,
  },
  {
    id: "halfway-there",
    title: "Halfway There",
    description: "Complete 4 out of 8 lessons",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "course-complete",
    title: "Course Master",
    description: "Complete all 8 lessons",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: "quiz-passed",
    title: "Quiz Warrior",
    description: "Pass the quiz with 60% or higher",
    icon: "✅",
    unlocked: false,
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Get a perfect score (100%) on the quiz",
    icon: "🌟",
    unlocked: false,
  },
]

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS)
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([])
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Update unlocked achievements whenever achievements change
  useEffect(() => {
    setUnlockedAchievements(achievements.filter((a) => a.unlocked))
  }, [achievements])

  // Load achievements from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY)
      if (saved) {
        const parsedAchievements = JSON.parse(saved)
        if (Array.isArray(parsedAchievements)) {
          setAchievements(parsedAchievements)
        }
      }
    } catch (error) {
      console.warn("Failed to load achievements:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save achievements to localStorage
  const saveAchievements = useCallback((updatedAchievements: Achievement[]) => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(updatedAchievements))
    } catch (error) {
      console.warn("Failed to save achievements:", error)
    }
  }, [])

  // Unlock an achievement
  const unlockAchievement = useCallback(
    (achievementId: string) => {
      setAchievements((prev) => {
        const updated = prev.map((achievement) => {
          if (achievement.id === achievementId && !achievement.unlocked) {
            const unlockedAchievement = {
              ...achievement,
              unlocked: true,
              unlockedAt: new Date().toISOString(),
            }

            // Show celebration toast
            setNewAchievement(unlockedAchievement)

            return unlockedAchievement
          }
          return achievement
        })

        saveAchievements(updated)
        return updated
      })
    },
    [saveAchievements],
  )

  // Check and unlock achievements based on progress
  const checkAchievements = useCallback(
    (
      completedLessons: Set<number>,
      quizResults?: Array<{ passed: boolean; score: number; totalQuestions: number }>,
    ) => {
      if (!completedLessons) return

      const completedCount = completedLessons.size

      // First Lesson Unlocked
      if (completedCount >= 1) {
        unlockAchievement("first-lesson")
      }

      // Halfway There (4 of 8 lessons)
      if (completedCount >= 4) {
        unlockAchievement("halfway-there")
      }

      // Course Complete (all 8 lessons)
      if (completedCount >= 8) {
        unlockAchievement("course-complete")
      }

      // Quiz achievements
      if (quizResults && Array.isArray(quizResults)) {
        quizResults.forEach((result) => {
          // Award "Quiz Warrior" for any passing score
          if (result.passed) {
            unlockAchievement("quiz-passed")
          }
          // Award "Quiz Master" ONLY for perfect score (100%)
          if (result.score === result.totalQuestions && result.totalQuestions > 0) {
            unlockAchievement("quiz-master")
          }
        })
      }
    },
    [unlockAchievement],
  )

  // Clear new achievement notification
  const clearNewAchievement = useCallback(() => {
    setNewAchievement(null)
  }, [])

  // Reset all achievements (for testing)
  const resetAchievements = useCallback(() => {
    const resetAchievements = DEFAULT_ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
      unlocked: false,
      unlockedAt: undefined,
    }))
    setAchievements(resetAchievements)
    saveAchievements(resetAchievements)
  }, [saveAchievements])

  return {
    achievements,
    unlockedAchievements,
    newAchievement,
    isLoaded,
    unlockAchievement,
    checkAchievements,
    clearNewAchievement,
    resetAchievements,
  }
}
