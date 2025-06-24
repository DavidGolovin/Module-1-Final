"use client"

import { memo } from "react"
import { EnhancedCard } from "./enhanced-card"
import { EnhancedButton } from "./enhanced-button"
import { CheckCircle, Lock, Play, FileText, Trophy } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  locked: boolean
  type: "lesson" | "quiz" | "project"
}

interface LessonCardProps {
  lesson: Lesson
  index: number
  onComplete: (lessonId: string) => void
  onQuizStart: (lessonId: string) => void
}

export const LessonCard = memo<LessonCardProps>(({ lesson, index, onComplete, onQuizStart }) => {
  const getIcon = () => {
    if (lesson.completed) return <CheckCircle className="w-5 h-5 text-roots-primary-accent" />
    if (lesson.locked) return <Lock className="w-5 h-5 text-roots-medium-gray" />

    switch (lesson.type) {
      case "quiz":
        return <Trophy className="w-5 h-5 text-roots-icon-color" />
      case "project":
        return <FileText className="w-5 h-5 text-roots-icon-color" />
      default:
        return <Play className="w-5 h-5 text-roots-icon-color" />
    }
  }

  const getTypeColor = () => {
    switch (lesson.type) {
      case "quiz":
        return "text-orange-600"
      case "project":
        return "text-purple-600"
      default:
        return "text-roots-icon-color"
    }
  }

  const handleAction = () => {
    if (lesson.locked) return

    if (lesson.type === "quiz") {
      onQuizStart(lesson.id)
    } else {
      onComplete(lesson.id)
    }
  }

  return (
    <EnhancedCard
      className={`transition-all duration-300 animate-fade-in-up ${
        lesson.completed
          ? "border-roots-primary-accent bg-roots-primary-accent bg-opacity-10"
          : lesson.locked
            ? "border-roots-medium-gray opacity-60"
            : "border-roots-border-line hover:border-roots-icon-color hover:shadow-lg"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-shrink-0">{getIcon()}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-semibold font-inter ${lesson.locked ? "text-roots-medium-gray" : "text-roots-text"}`}
              >
                {lesson.title}
              </h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor()} bg-opacity-10`}>
                {lesson.type.toUpperCase()}
              </span>
            </div>

            <p className={`text-sm font-inter ${lesson.locked ? "text-roots-medium-gray" : "text-roots-dark-gray"}`}>
              {lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <span
                className={`text-xs font-inter ${lesson.locked ? "text-roots-medium-gray" : "text-roots-dark-gray"}`}
              >
                {lesson.duration}
              </span>

              {lesson.completed && (
                <span className="text-xs font-medium text-roots-primary-accent font-inter">Completed</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 ml-4">
          <EnhancedButton
            onClick={handleAction}
            disabled={lesson.locked}
            size="sm"
            variant={lesson.completed ? "secondary" : "primary"}
          >
            {lesson.completed ? "Review" : lesson.type === "quiz" ? "Start Quiz" : "Start"}
          </EnhancedButton>
        </div>
      </div>
    </EnhancedCard>
  )
})

LessonCard.displayName = "LessonCard"
