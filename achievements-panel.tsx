"use client"

import { memo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Achievement } from "@/hooks/use-achievements"

interface AchievementsPanelProps {
  isOpen: boolean
  onClose: () => void
  achievements: Achievement[]
  unlockedAchievements: Achievement[]
  completedLessons: Set<number>
}

export const AchievementsPanel = memo<AchievementsPanelProps>(
  ({ isOpen, onClose, achievements = [], unlockedAchievements = [] }) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onClose()
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "unset"
      return () => {
        document.body.style.overflow = "unset"
      }
    }, [isOpen])

    const progressPercentage =
      achievements.length > 0 ? Math.round((unlockedAchievements.length / achievements.length) * 100) : 0

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={onClose}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#303030] font-inter">Achievements</h2>
                  <button
                    onClick={onClose}
                    className="text-[#303030] hover:text-gray-700 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
                    aria-label="Close achievements panel"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#303030] font-inter">Progress</span>
                    <span className="text-sm font-medium text-[#303030] font-inter">
                      {unlockedAchievements.length}/{achievements.length}
                    </span>
                  </div>
                  <div className="w-full bg-[#EFEFEF] h-2">
                    <motion.div
                      className="bg-[#CDFF64] h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 font-inter">{progressPercentage}% Complete</p>
                </div>

                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white p-4 border border-gray-200 shadow-sm ${!achievement.unlocked ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 flex items-center justify-center text-lg ${
                            achievement.unlocked ? "bg-[#CDFF64] text-[#303030]" : "bg-gray-300 text-gray-500"
                          }`}
                        >
                          {achievement.icon}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-[#303030] font-inter mb-1">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 font-inter mb-2">{achievement.description}</p>
                          {achievement.unlocked && achievement.unlockedAt && (
                            <p className="text-xs text-gray-500 font-inter">
                              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        {achievement.unlocked && (
                          <div className="text-green-600 text-lg" role="img" aria-label="Unlocked">
                            ✓
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600 font-inter">
                    Keep learning to unlock more achievements!
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  },
)

AchievementsPanel.displayName = "AchievementsPanel"
