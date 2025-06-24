"use client"

import { memo } from "react"

interface AchievementsButtonProps {
  unlockedCount: number
  onClick: () => void
}

export const AchievementsButton = memo<AchievementsButtonProps>(({ unlockedCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
      aria-label={`Achievements: ${unlockedCount} unlocked`}
    >
      <span className="text-xl" role="img" aria-label="Achievements">
        🏆
      </span>
      <span className="hidden sm:inline text-sm font-medium text-[#303030]">Achievements</span>
      {unlockedCount > 0 && (
        <span className="bg-[#303030] text-[#CDFF64] text-xs font-bold px-2 py-1 min-w-[20px] text-center">
          {unlockedCount}
        </span>
      )}
    </button>
  )
})

AchievementsButton.displayName = "AchievementsButton"
