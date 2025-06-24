"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AchievementCardProps {
  icon: string
  description: string
  buttonColor: string
  buttonText: string
  onDismiss: () => void
  isDismissed: boolean
  animationDelay?: number
  achievementName: string
}

export function AchievementCard({
  icon,
  description,
  buttonColor,
  buttonText,
  onDismiss,
  isDismissed,
  animationDelay = 0,
  achievementName,
}: AchievementCardProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss()
    }, 300)
  }

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.5,
        delay: animationDelay,
        type: "spring",
        stiffness: 100,
      }}
      className="bg-white p-6 text-center relative overflow-hidden border border-gray-200 shadow-sm"
    >
      {/* Animated Star Particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: "50%",
              y: "50%",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: `${50 + (Math.random() - 0.5) * 200}%`,
              y: `${50 + (Math.random() - 0.5) * 200}%`,
            }}
            transition={{
              duration: 2,
              delay: animationDelay + i * 0.1,
              ease: "easeOut",
            }}
            className="absolute text-yellow-400 text-sm"
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: animationDelay + 0.2 }}
        className="text-lg font-bold text-[#303030] mb-4 font-inter"
      >
        🎉 CONGRATS!
      </motion.h3>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: animationDelay + 0.3,
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
        className="text-6xl mb-4 relative z-10"
      >
        {icon}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.4 }}
        className="text-gray-600 mb-6 font-inter leading-relaxed"
      >
        {description}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay + 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDismiss}
        className={`w-full py-3 px-4 font-semibold font-inter transition-all duration-200 ${buttonColor} ${buttonText} hover:shadow-lg`}
        aria-label={`Dismiss achievement: ${achievementName}`}
      >
        Got It
      </motion.button>
    </motion.div>
  )
}
