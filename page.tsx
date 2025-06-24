"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Page1_Welcome } from "@/components/page-1-welcome"
import { Page2_Introduction } from "@/components/page-2-introduction"
import { Page3_MarketTrends } from "@/components/page-3-market-trends"
import { Page4_Calculator } from "@/components/page-4-calculator"
import { Page5_WinWin } from "@/components/page-5-win-win"
import { Page6_EligibleLoans } from "@/components/page-6-eligible-loans"
import { Page7_Quiz } from "@/components/page-7-quiz"
import Page8FinalProject from "@/components/page-8-final-project"
import { CourseProgressBar } from "@/components/course-progress-bar"
import { AchievementsButton } from "@/components/achievements-button"
import { AchievementsPanel } from "@/components/achievements-panel"
import { AchievementToast } from "@/components/achievement-toast"
import { useCourseProgress } from "@/hooks/use-course-progress"
import { useAchievements } from "@/hooks/use-achievements"

const RESUME_STORAGE_KEY = "course_resume_lesson"
const LAST_ACCESS_KEY = "course_last_access"

export default function HTMLFundamentalsCourse() {
  const {
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
  } = useCourseProgress(8)

  const { achievements, unlockedAchievements, checkAchievements, newAchievement, clearNewAchievement } =
    useAchievements()

  const [userName, setUserName] = useState("")
  const [isUserNameConfirmed, setIsUserNameConfirmed] = useState(false)
  const [showAchievementsPanel, setShowAchievementsPanel] = useState(false)
  const [hasResumed, setHasResumed] = useState(false)

  useEffect(() => {
    if (isLoaded && currentLesson) {
      try {
        localStorage.setItem(RESUME_STORAGE_KEY, currentLesson.toString())
        localStorage.setItem(LAST_ACCESS_KEY, Date.now().toString())
      } catch (error) {
        console.warn("Failed to save current lesson:", error)
      }
    }
  }, [currentLesson, isLoaded])

  useEffect(() => {
    if (isLoaded && !hasResumed) {
      try {
        const savedLesson = localStorage.getItem(RESUME_STORAGE_KEY)
        const lastAccess = localStorage.getItem(LAST_ACCESS_KEY)

        if (savedLesson && lastAccess) {
          const lessonNumber = Number.parseInt(savedLesson, 10)
          const accessTime = Number.parseInt(lastAccess, 10)
          const hoursSinceAccess = (Date.now() - accessTime) / (1000 * 60 * 60)

          if (lessonNumber >= 2 && lessonNumber <= 8 && hoursSinceAccess < 24 * 30 && lessonNumber !== currentLesson) {
            navigateToLesson(lessonNumber)
          }
        }
      } catch (error) {
        console.warn("Failed to resume from saved lesson:", error)
      } finally {
        setHasResumed(true)
      }
    }
  }, [isLoaded, hasResumed, currentLesson, navigateToLesson])

  const handleLessonCompletion = useCallback(
    (lessonNumber: number, completed: boolean) => {
      if (completed) {
        markLessonCompleted(lessonNumber)
        setTimeout(() => {
          checkAchievements(completedLessons)
        }, 100)
      }
    },
    [markLessonCompleted, checkAchievements, completedLessons],
  )

  const handleUserNameConfirmed = useCallback(
    (confirmed: boolean, name: string) => {
      setIsUserNameConfirmed(confirmed)
      setUserName(name)
      if (confirmed) {
        handleLessonCompletion(1, true)
      }
    },
    [handleLessonCompletion],
  )

  const handleAdvanceToNextPage = useCallback(() => {
    if (canGoNext) {
      nextLesson()
    }
  }, [canGoNext, nextLesson])

  const handleGoToPreviousPage = useCallback(() => {
    if (canGoPrevious) {
      previousLesson()
    }
  }, [canGoPrevious, previousLesson])

  const handleQuizCompletion = useCallback(
    (score: number, totalQuestions: number) => {
      const quizResults = [{ score, totalQuestions, passed: score >= totalQuestions * 0.7 }]
      checkAchievements(completedLessons, quizResults)
    },
    [checkAchievements, completedLessons],
  )

  const currentPageComponent = useMemo(() => {
    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#303030] font-inter">Loading your progress...</div>
        </div>
      )
    }

    switch (currentLesson) {
      case 1:
        return (
          <Page1_Welcome
            onUserNameConfirmed={handleUserNameConfirmed}
            onAdvanceToNextPage={handleAdvanceToNextPage}
            userName={userName}
            isCompleted={isLessonCompleted(1)}
          />
        )
      case 2:
        return (
          <Page2_Introduction
            onNextPage={handleAdvanceToNextPage}
            onPrevPage={handleGoToPreviousPage}
            onPageCompletion={(completed) => handleLessonCompletion(2, completed)}
            isCompleted={isLessonCompleted(2)}
          />
        )
      case 3:
        return (
          <Page3_MarketTrends
            onNextPage={handleAdvanceToNextPage}
            onPrevPage={handleGoToPreviousPage}
            onPageCompletion={(completed) => handleLessonCompletion(3, completed)}
            isCompleted={isLessonCompleted(3)}
          />
        )
      case 4:
        return (
          <Page4_Calculator
            onNextPage={handleAdvanceToNextPage}
            onPrevPage={handleGoToPreviousPage}
            onPageCompletion={(completed) => handleLessonCompletion(4, completed)}
            isCompleted={isLessonCompleted(4)}
          />
        )
      case 5:
        return (
          <Page5_WinWin
            onNextPage={handleAdvanceToNextPage}
            onPrevPage={handleGoToPreviousPage}
            onPageCompletion={(completed) => handleLessonCompletion(5, completed)}
            isCompleted={isLessonCompleted(5)}
          />
        )
      case 6:
        return (
          <Page6_EligibleLoans
            onNextPage={handleAdvanceToNextPage}
            onPrevPage={handleGoToPreviousPage}
            onPageCompletion={(completed) => handleLessonCompletion(6, completed)}
            isCompleted={isLessonCompleted(6)}
          />
        )
      case 7:
        return (
          <Page7_Quiz
            onAllTrueFalseAnswered={(score, total) => {
              handleLessonCompletion(7, true)
              handleQuizCompletion(score, total)
            }}
            onNextPage={handleAdvanceToNextPage}
            onPrevPage={handleGoToPreviousPage}
            isCompleted={isLessonCompleted(7)}
          />
        )
      case 8:
        return (
          <Page8FinalProject
            onPrevPage={handleGoToPreviousPage}
            onPageCompletion={(completed) => handleLessonCompletion(8, completed)}
            isCompleted={isLessonCompleted(8)}
          />
        )
      default:
        return (
          <Page1_Welcome
            onUserNameConfirmed={handleUserNameConfirmed}
            onAdvanceToNextPage={handleAdvanceToNextPage}
            userName={userName}
            isCompleted={isLessonCompleted(1)}
          />
        )
    }
  }, [
    currentLesson,
    isLoaded,
    userName,
    isLessonCompleted,
    handleUserNameConfirmed,
    handleAdvanceToNextPage,
    handleGoToPreviousPage,
    handleLessonCompletion,
    handleQuizCompletion,
  ])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#303030] font-inter text-lg">Loading your course progress...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      {currentLesson > 1 && (
        <CourseProgressBar
          currentLesson={currentLesson}
          totalLessons={8}
          progressPercentage={progressPercentage}
          onPreviousLesson={handleGoToPreviousPage}
          onNextLesson={handleAdvanceToNextPage}
          onNavigateToLesson={navigateToLesson}
          canGoBack={canGoPrevious}
          canGoForward={canGoNext}
          completedLessons={completedLessons || new Set()}
        />
      )}

      <main role="main">{currentPageComponent}</main>

      {currentLesson === 1 && (
        <div className="flex justify-center py-8">
          <AchievementsButton
            unlockedCount={unlockedAchievements?.length || 0}
            onClick={() => setShowAchievementsPanel(true)}
          />
        </div>
      )}

      <AchievementsPanel
        isOpen={showAchievementsPanel}
        onClose={() => setShowAchievementsPanel(false)}
        achievements={achievements || []}
        unlockedAchievements={unlockedAchievements || []}
        completedLessons={completedLessons || new Set()}
      />

      {newAchievement && <AchievementToast achievement={newAchievement} onClose={clearNewAchievement} />}
    </div>
  )
}
