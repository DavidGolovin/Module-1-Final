"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { BookOpen, CheckCircle, Trophy } from "lucide-react"
import { PageContainer } from "./page-container"

interface Page15ConclusionProps {
  onPrevPage?: () => void
}

export function Page15_Conclusion({ onPrevPage }: Page15ConclusionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const achievements = [
    {
      icon: BookOpen,
      title: "8 Lessons Completed",
      subtitle: "Interactive modules mastered",
      delay: 0.2,
    },
    {
      icon: CheckCircle,
      title: "50+ Concepts Learned",
      subtitle: "Core mortgage principles",
      delay: 0.4,
    },
    {
      icon: Trophy,
      title: "Quiz Champion",
      subtitle: "Perfect score achieved",
      delay: 0.6,
    },
  ]

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header & Overview */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-bold text-[#303030] font-inter"
          >
            Congratulations! <span className="text-[#CDFF64]">🎉</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-[#303030] font-inter max-w-2xl mx-auto"
          >
            You've completed the assumable mortgages course—here's a snapshot of your success.
          </motion.p>
        </div>

        {/* Achievement Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 30,
                }}
                transition={{
                  duration: 0.6,
                  delay: achievement.delay,
                  ease: "easeOut",
                }}
                className="card-container p-8 text-center focus:outline-none focus:ring-2 focus:ring-[#CDFF64] focus:ring-offset-2"
                role="region"
                aria-label={achievement.title}
                tabIndex={0}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isVisible ? 1 : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: achievement.delay + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mb-6"
                >
                  <Icon className="w-16 h-16 text-[#303030] mx-auto" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    delay: achievement.delay + 0.3,
                  }}
                  className="text-xl font-bold text-[#CDFF64] font-inter mb-2"
                >
                  {achievement.title}
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    delay: achievement.delay + 0.4,
                  }}
                  className="text-[#303030] font-inter"
                >
                  {achievement.subtitle}
                </motion.p>
              </motion.div>
            )
          })}
        </div>
        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-start">
            <button
              onClick={onPrevPage}
              className="btn-secondary px-6 py-3 font-inter"
              aria-label="Go to previous lesson"
            >
              ← Previous: Final Project
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Page15_Conclusion
