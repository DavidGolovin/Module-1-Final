"use client"

import { memo, useState, useCallback, useMemo } from "react"
import { PageContainer } from "./page-container"
import { EnhancedCard } from "./enhanced-card"
import { EnhancedButton } from "./enhanced-button"
import { InfoModal } from "./info-modal"
import { CelebrationTrigger } from "./celebration-trigger"
import { SuccessBurst } from "./success-burst"
import { FloatingElements } from "./floating-elements"
import { BookOpen, Target, Users, Award, Play, CheckCircle } from "lucide-react"

interface Page1_IntroductionProps {
  onNextPage?: () => void
}

export const Page1_Introduction = memo<Page1_IntroductionProps>(({ onNextPage }) => {
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())

  const courseFeatures = useMemo(
    () => [
      {
        id: "interactive",
        icon: <Play className="w-6 h-6 text-roots-icon-color" />,
        title: "Interactive Learning",
        description: "Hands-on exercises and real-world projects to reinforce your learning",
      },
      {
        id: "community",
        icon: <Users className="w-6 h-6 text-roots-icon-color" />,
        title: "Community Support",
        description: "Join thousands of learners and get help from our active community",
      },
      {
        id: "certificate",
        icon: <Award className="w-6 h-6 text-roots-icon-color" />,
        title: "Certificate of Completion",
        description: "Earn a verified certificate to showcase your new skills",
      },
    ],
    [],
  )

  const learningObjectives = useMemo(
    () => [
      "Master HTML5 semantic elements and structure",
      "Create responsive layouts with modern CSS",
      "Build interactive web applications with JavaScript",
      "Understand web development best practices",
      "Deploy your projects to the web",
    ],
    [],
  )

  const handleOpenModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleCelebration = useCallback(() => {
    setShowSuccess(true)
  }, [])

  const handleSectionComplete = useCallback((sectionId: string) => {
    setCompletedSections((prev) => new Set([...prev, sectionId]))
    setShowSuccess(true)
  }, [])

  const isCompleted = useCallback(
    (sectionId: string) => {
      return completedSections.has(sectionId)
    },
    [completedSections],
  )

  return (
    <PageContainer
      title="Welcome to Web Development Fundamentals"
      subtitle="Your journey to becoming a skilled web developer starts here"
    >
      <FloatingElements />

      <div className="space-y-8">
        {/* Course Overview */}
        <EnhancedCard className="animate-fade-in-up">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-roots-primary-accent rounded-xl">
              <BookOpen className="w-8 h-8 text-roots-text" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-roots-text mb-3 font-inter">Course Overview</h2>
              <p className="text-roots-dark-gray mb-4 font-inter leading-relaxed">
                This comprehensive course will take you from complete beginner to confident web developer. You'll learn
                the three core technologies of web development: HTML, CSS, and JavaScript, through practical projects
                and interactive exercises.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-roots-primary-accent text-roots-text rounded-full text-sm font-medium font-inter">
                  Beginner Friendly
                </span>
                <span className="px-3 py-1 bg-roots-icon-color text-white rounded-full text-sm font-medium font-inter">
                  15 Lessons
                </span>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium font-inter">
                  Certificate Included
                </span>
              </div>
            </div>
          </div>
        </EnhancedCard>

        {/* Learning Objectives */}
        <EnhancedCard className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-roots-icon-color" />
            <h3 className="text-xl font-bold text-roots-text font-inter">What You'll Learn</h3>
          </div>
          <div className="grid gap-3">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-roots-primary-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-roots-text font-inter">{objective}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <EnhancedButton
              onClick={() => handleSectionComplete("objectives")}
              variant={isCompleted("objectives") ? "success" : "primary"}
              className="w-full sm:w-auto"
            >
              {isCompleted("objectives") ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Objectives Reviewed
                </>
              ) : (
                "Mark as Reviewed"
              )}
            </EnhancedButton>
          </div>
        </EnhancedCard>

        {/* Course Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseFeatures.map((feature, index) => (
            <EnhancedCard
              key={feature.id}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="p-4 bg-roots-light-gray rounded-xl inline-block mb-4">{feature.icon}</div>
              <h4 className="text-lg font-bold text-roots-text mb-2 font-inter">{feature.title}</h4>
              <p className="text-roots-dark-gray font-inter text-sm leading-relaxed">{feature.description}</p>
              <div className="mt-4">
                <EnhancedButton
                  size="sm"
                  onClick={() => handleSectionComplete(feature.id)}
                  variant={isCompleted(feature.id) ? "success" : "secondary"}
                >
                  {isCompleted(feature.id) ? "✓ Understood" : "Got It!"}
                </EnhancedButton>
              </div>
            </EnhancedCard>
          ))}
        </div>

        {/* Prerequisites */}
        <EnhancedCard className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-xl font-bold text-roots-text mb-4 font-inter">Prerequisites</h3>
          <div className="card-container p-4">
            <p className="text-roots-text font-inter mb-3">
              <strong>Good news!</strong> This course is designed for complete beginners. You only need:
            </p>
            <ul className="space-y-2 text-roots-dark-gray font-inter">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-roots-text flex-shrink-0" />A computer with internet access
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-roots-text flex-shrink-0" />
                Enthusiasm to learn and practice
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-roots-text flex-shrink-0" />
                About 2-3 hours per week for study
              </li>
            </ul>
          </div>
        </EnhancedCard>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <EnhancedButton size="lg" onClick={handleOpenModal}>
            View Course Syllabus
          </EnhancedButton>
          <CelebrationTrigger onTrigger={handleCelebration}>I'm Ready to Start!</CelebrationTrigger>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-roots-border-line">
          <div className="flex justify-end">
            <EnhancedButton onClick={onNextPage} size="lg">
              Next: Introduction →
            </EnhancedButton>
          </div>
        </div>
      </div>

      {/* Course Syllabus Modal */}
      <InfoModal isOpen={showModal} onClose={handleCloseModal} title="Complete Course Syllabus">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-roots-text mb-3 font-inter">Module 1: HTML Fundamentals (Lessons 1-5)</h4>
            <ul className="space-y-1 text-roots-dark-gray font-inter text-sm">
              <li>• Introduction to HTML and Web Structure</li>
              <li>• HTML Elements and Semantic Markup</li>
              <li>• Forms and Input Elements</li>
              <li>• Tables and Lists</li>
              <li>• HTML5 Features and Best Practices</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-roots-text mb-3 font-inter">Module 2: CSS Styling (Lessons 6-10)</h4>
            <ul className="space-y-1 text-roots-dark-gray font-inter text-sm">
              <li>• CSS Basics and Selectors</li>
              <li>• Layout with Flexbox and Grid</li>
              <li>• Responsive Design Principles</li>
              <li>• Animations and Transitions</li>
              <li>• CSS Frameworks and Preprocessors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-roots-text mb-3 font-inter">
              Module 3: JavaScript Programming (Lessons 11-15)
            </h4>
            <ul className="space-y-1 text-roots-dark-gray font-inter text-sm">
              <li>• JavaScript Fundamentals</li>
              <li>• DOM Manipulation</li>
              <li>• Event Handling and User Interaction</li>
              <li>• Asynchronous JavaScript and APIs</li>
              <li>• Final Project: Complete Web Application</li>
            </ul>
          </div>
        </div>
      </InfoModal>

      <SuccessBurst
        show={showSuccess}
        message="Great! You're ready to begin your journey!"
        onComplete={() => setShowSuccess(false)}
      />
    </PageContainer>
  )
})

Page1_Introduction.displayName = "Page1_Introduction"
