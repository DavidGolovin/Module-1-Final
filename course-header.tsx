"use client"

import { memo } from "react"

interface CourseHeaderProps {
  title: string
  subtitle: string
}

export const CourseHeader = memo<CourseHeaderProps>(({ title, subtitle }) => {
  return (
    <header className="bg-white border-b border-[#e5e7eb]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#303030] font-inter">Course Platform</h1>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#303030] font-inter">{title}</h2>
          <p className="text-xl text-[#303030] opacity-80 font-inter max-w-3xl mx-auto">{subtitle}</p>
        </div>
      </div>
    </header>
  )
})

CourseHeader.displayName = "CourseHeader"
