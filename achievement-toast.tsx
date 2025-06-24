"use client"

import { memo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Achievement } from "@/hooks/use-achievements"

interface AchievementToastProps {
  achievement: Achievement | null
  onClose: () => void
}

export const AchievementToast = memo<AchievementToastProps>(({ achievement, onClose }) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-4 right-4 z-50 bg-white p-4 max-w-sm border border-gray-200 shadow-lg"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#CDFF64] text-[#303030] flex items-center justify-center text-lg flex-shrink-0">
              {achievement.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#303030] font-inter text-sm">Achievement Unlocked!</h3>
                  <p className="font-bold text-[#303030] font-inter">{achievement.title}</p>
                  <p className="text-sm text-gray-600 font-inter">{achievement.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close notification"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

AchievementToast.displayName = "AchievementToast"
