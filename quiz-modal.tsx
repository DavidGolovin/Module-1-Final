"use client"

import { useState, useCallback, memo } from "react"
import { X, CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizModalProps {
  lessonId: string
  onComplete: (lessonId: string, passed: boolean) => void
  onClose: () => void
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    id: "2",
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<header>", "<heading>"],
    correctAnswer: 1,
  },
  {
    id: "3",
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<br>", "<lb>", "<newline>"],
    correctAnswer: 1,
  },
]

export const QuizModal = memo<QuizModalProps>(({ lessonId, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = useCallback(
    (answerIndex: number) => {
      const newAnswers = [...selectedAnswers]
      newAnswers[currentQuestion] = answerIndex
      setSelectedAnswers(newAnswers)
    },
    [currentQuestion, selectedAnswers],
  )

  const handleNext = useCallback(() => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Calculate score
      const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === sampleQuestions[index].correctAnswer ? 1 : 0)
      }, 0)

      setScore(correctAnswers)
      setShowResults(true)
    }
  }, [currentQuestion, selectedAnswers])

  const handleFinish = useCallback(() => {
    const passed = score >= Math.ceil(sampleQuestions.length * 0.7) // 70% to pass
    onComplete(lessonId, passed)
  }, [score, lessonId, onComplete])

  const currentQ = sampleQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  if (showResults) {
    const passed = score >= Math.ceil(sampleQuestions.length * 0.7)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-roots-page-bg rounded-xl max-w-md w-full p-8 animate-scale-up">
          <div className="text-center">
            {passed ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-celebration" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}

            <h2 className="text-2xl font-bold text-roots-text mb-2">{passed ? "Congratulations!" : "Try Again"}</h2>

            <p className="text-roots-dark-gray mb-6">
              You scored {score} out of {sampleQuestions.length} questions
              {passed ? " and passed the quiz!" : ". You need 70% to pass."}
            </p>

            <div className="flex gap-3">
              {!passed && (
                <button
                  onClick={() => {
                    setCurrentQuestion(0)
                    setSelectedAnswers([])
                    setShowResults(false)
                    setScore(0)
                  }}
                  className="flex-1 px-4 py-2 border border-roots-border-line rounded-lg hover:bg-roots-container-bg transition-colors"
                >
                  Retry Quiz
                </button>
              )}
              <button onClick={handleFinish} className="flex-1 btn-primary-enhanced px-4 py-2 rounded-lg">
                {passed ? "Continue" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-roots-page-bg rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-roots-border-line">
          <div>
            <h2 className="text-xl font-bold text-roots-text">HTML Basics Quiz</h2>
            <p className="text-sm text-roots-dark-gray">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-roots-container-bg rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="progress-enhanced">
            <div className="progress-fill transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-roots-text mb-6">{currentQ.question}</h3>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-roots-primary-accent bg-roots-primary-accent bg-opacity-20"
                    : "border-roots-border-line hover:border-roots-medium-gray"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-roots-primary-accent bg-roots-primary-accent"
                        : "border-roots-medium-gray"
                    }`}
                  />
                  <span className="text-roots-text">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-roots-border-line rounded-lg hover:bg-roots-container-bg transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="btn-primary-enhanced px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

QuizModal.displayName = "QuizModal"
