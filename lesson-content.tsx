"use client"

import { memo, type ReactNode } from "react"
import Image from "next/image"

interface LessonContentProps {
  children?: ReactNode
}

interface LessonSectionProps {
  title?: string
  children: ReactNode
  className?: string
}

interface LessonImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface LessonListProps {
  items: string[]
  ordered?: boolean
  className?: string
}

export const LessonContent = memo<LessonContentProps>(({ children }) => {
  return <div className="space-y-8">{children}</div>
})

export const LessonSection = memo<LessonSectionProps>(({ title, children, className = "" }) => {
  return (
    <section className={`space-y-4 ${className}`}>
      {title && <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">{title}</h2>}
      <div className="space-y-4">{children}</div>
    </section>
  )
})

export const LessonParagraph = memo<{ children: ReactNode; className?: string }>(({ children, className = "" }) => {
  return <p className={`text-lg leading-relaxed text-gray-700 ${className}`}>{children}</p>
})

export const LessonImage = memo<LessonImageProps>(({ src, alt, caption, width = 800, height = 400 }) => {
  return (
    <figure className="my-8">
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-gray-600 text-center italic">{caption}</figcaption>}
    </figure>
  )
})

export const LessonList = memo<LessonListProps>(({ items, ordered = false, className = "" }) => {
  const ListComponent = ordered ? "ol" : "ul"
  const listClass = ordered ? "list-decimal list-inside space-y-2" : "list-disc list-inside space-y-2"

  return (
    <ListComponent className={`${listClass} text-lg text-gray-700 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ListComponent>
  )
})

export const LessonHighlight = memo<{ children: ReactNode; variant?: "info" | "warning" | "success" }>(
  ({ children, variant = "info" }) => {
    return (
      <div className="global-container p-6 my-6" role="note" aria-label={`${variant} callout`}>
        <div className="text-lg leading-relaxed" style={{ color: "#303030" }}>
          {children}
        </div>
      </div>
    )
  },
)

export const LessonQuote = memo<{ children: ReactNode; author?: string }>(({ children, author }) => {
  return (
    <blockquote className="global-container p-6 my-6" role="blockquote">
      <div className="text-xl italic leading-relaxed" style={{ color: "#303030" }}>
        "{children}"
      </div>
      {author && (
        <cite className="block mt-3 text-sm font-medium" style={{ color: "#303030" }}>
          — {author}
        </cite>
      )}
    </blockquote>
  )
})

// Key Takeaway Component
export const KeyTakeaway = memo<{ children: ReactNode; title?: string }>(({ children, title = "Key Takeaway" }) => {
  return (
    <div className="global-container p-6 my-8" role="complementary" aria-labelledby="key-takeaway-title">
      <h3 id="key-takeaway-title" className="text-xl font-bold mb-4" style={{ color: "#303030" }}>
        💡 {title}
      </h3>
      <div className="text-lg leading-relaxed" style={{ color: "#303030" }}>
        {children}
      </div>
    </div>
  )
})

// Callout Component
export const Callout = memo<{ children: ReactNode; type?: "info" | "warning" | "success" | "tip" }>(
  ({ children, type = "info" }) => {
    const icons = {
      info: "ℹ️",
      warning: "⚠️",
      success: "✅",
      tip: "💡",
    }

    return (
      <div className="global-container p-6 my-6" role="note" aria-label={`${type} callout`}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-1">{icons[type]}</span>
          <div className="text-lg leading-relaxed flex-1" style={{ color: "#303030" }}>
            {children}
          </div>
        </div>
      </div>
    )
  },
)

LessonContent.displayName = "LessonContent"
LessonSection.displayName = "LessonSection"
LessonParagraph.displayName = "LessonParagraph"
LessonImage.displayName = "LessonImage"
LessonList.displayName = "LessonList"
LessonHighlight.displayName = "LessonHighlight"
LessonQuote.displayName = "LessonQuote"
KeyTakeaway.displayName = "KeyTakeaway"
Callout.displayName = "Callout"
