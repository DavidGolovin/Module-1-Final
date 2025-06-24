import type React from "react"

interface LessonPageLayoutProps {
  children: React.ReactNode
}

const LessonPageLayout: React.FC<LessonPageLayoutProps> = ({ children }) => {
  return <div className="container mx-auto py-8">{children}</div>
}

export default LessonPageLayout
