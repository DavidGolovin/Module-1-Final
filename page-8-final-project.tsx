"use client"

import React from "react"
import { useState } from "react"

interface AchievementCardProps {
  icon: string
  description: string
  buttonColor: string
  buttonText: string
  onDismiss: () => void
  isDismissed: boolean
  animationDelay: number
  achievementName: string
}

interface Page8Props {
  onPrevPage: () => void
  onPageCompletion: (completed: boolean) => void
  isCompleted: boolean
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  icon,
  description,
  buttonColor,
  buttonText,
  onDismiss,
  isDismissed,
  animationDelay,
  achievementName,
}) => {
  if (isDismissed) {
    return null
  }

  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-white animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{achievementName}</h3>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <button
        className={`px-4 py-2 rounded-full ${buttonColor} ${buttonText} font-bold hover:opacity-80 transition-opacity`}
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  )
}

const Page8FinalProject: React.FC<Page8Props> = ({ onPrevPage, onPageCompletion, isCompleted }) => {
  const [dismissedCards, setDismissedCards] = useState({
    lessons: false,
    quiz: false,
    achievements: false,
  })

  // Mark as completed when component mounts
  React.useEffect(() => {
    if (!isCompleted) {
      onPageCompletion(true)
    }
  }, [isCompleted, onPageCompletion])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-8 text-center">🎉 Congratulations! 🎉</h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
            You've successfully completed the Assumable Mortgage Course! Here's what you've accomplished:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <AchievementCard
              icon="🏆"
              description="You completed all 8 lessons and mastered assumable mortgages!"
              buttonColor="bg-[#CDFF64]"
              buttonText="text-black"
              onDismiss={() => setDismissedCards((prev) => ({ ...prev, lessons: true }))}
              isDismissed={dismissedCards.lessons}
              animationDelay={0}
              achievementName="Course Champion"
            />

            <AchievementCard
              icon="🎯"
              description="You completed the quiz and demonstrated your knowledge!"
              buttonColor="bg-[#AA7CFB]"
              buttonText="text-white"
              onDismiss={() => setDismissedCards((prev) => ({ ...prev, quiz: true }))}
              isDismissed={dismissedCards.quiz}
              animationDelay={0.2}
              achievementName="Quiz Master"
            />

            <AchievementCard
              icon="⭐"
              description="You're now equipped with valuable real estate knowledge!"
              buttonColor="bg-[#FF6B6B]"
              buttonText="text-white"
              onDismiss={() => setDismissedCards((prev) => ({ ...prev, achievements: true }))}
              isDismissed={dismissedCards.achievements}
              animationDelay={0.4}
              achievementName="Knowledge Expert"
            />
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-300 w-full max-w-4xl">
            <div className="flex justify-start">
              <button
                onClick={onPrevPage}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-inter transition-colors duration-200"
                aria-label="Go to previous lesson"
              >
                ← Previous: Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page8FinalProject
