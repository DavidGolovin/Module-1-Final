"use client"

import { useState, useCallback, useMemo } from "react"
import { useAchievements } from "../hooks/use-achievements"

interface Page7Props {
  onAllTrueFalseAnswered: () => void
  onNextPage: () => void
  onPrevPage: () => void
  isCompleted: boolean
}

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is an assumable mortgage?",
    options: [
      "A loan the buyer can transfer to themselves at the seller's rate",
      "A government-insured home loan",
      "A refinance option through the original lender",
      "A second mortgage on the property",
    ],
    correctAnswer: 0,
    explanation:
      "An assumable mortgage allows a buyer to take over the seller's existing mortgage, including the interest rate and remaining balance.",
  },
  {
    id: 2,
    question: "Which party must approve an assumption?",
    options: ["The original borrower", "The property appraiser", "The lender", "The home insurance provider"],
    correctAnswer: 2,
    explanation:
      "The lender must approve the assumption to ensure the new borrower meets their qualification requirements.",
  },
  {
    id: 3,
    question: "What is one key benefit of assuming a mortgage?",
    options: ["Lower closing costs", "Keeping a low interest rate", "Avoiding title insurance", "Shorter loan term"],
    correctAnswer: 1,
    explanation:
      "The primary benefit is keeping the seller's existing low interest rate, which can save thousands in monthly payments.",
  },
  {
    id: 4,
    question: "Which types of loans are typically assumable?",
    options: ["Conventional loans only", "FHA, VA, and USDA loans", "Jumbo loans only", "Private money loans"],
    correctAnswer: 1,
    explanation:
      "Government-backed loans (FHA, VA, USDA) are generally assumable, while most conventional loans are not.",
  },
  {
    id: 5,
    question: "What happens to the original borrower after a successful assumption?",
    options: [
      "They remain liable for the debt",
      "They are released from all liability",
      "They become a co-borrower",
      "They must pay a penalty fee",
    ],
    correctAnswer: 1,
    explanation:
      "Once the lender approves the assumption, the original borrower is typically released from liability for the mortgage debt.",
  },
  {
    id: 6,
    question: "What is a common challenge with assumable mortgages?",
    options: [
      "Higher interest rates",
      "Longer approval process",
      "Large down payment gap to cover equity",
      "No tax benefits",
    ],
    correctAnswer: 2,
    explanation:
      "Buyers often need significant cash to cover the difference between the loan balance and the home's current value.",
  },
]

export const Page7_Quiz = ({ onAllTrueFalseAnswered, onNextPage, onPrevPage, isCompleted }: Page7Props) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const { checkAchievements } = useAchievements()

  const handleAnswerChange = useCallback((questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }, [])

  const allQuestionsAnswered = useMemo(() => {
    return Object.keys(selectedAnswers).length === quizQuestions.length
  }, [selectedAnswers])

  const handleSubmit = useCallback(() => {
    let correctCount = 0
    quizQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
    onAllTrueFalseAnswered()

    // Pass quiz results to achievement system
    const quizResult = {
      passed: correctCount >= Math.ceil(quizQuestions.length * 0.6), // 60% to pass
      score: correctCount,
      totalQuestions: quizQuestions.length,
    }

    // Check achievements with quiz results
    checkAchievements(new Set(), [quizResult])
  }, [selectedAnswers, onAllTrueFalseAnswered, checkAchievements])

  const resetQuiz = useCallback(() => {
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }, [])

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary font-inter mb-4">Assumable Mortgage Quiz</h1>
          <p className="text-lg text-primary font-inter">
            Test your knowledge of assumable mortgages and mortgage assumption process.
          </p>
        </header>

        <main>
          <div className="card-container p-6">
            {!showResults ? (
              <>
                {/* Quiz Questions */}
                <div className="space-y-8">
                  {quizQuestions.map((question) => (
                    <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h3 className="text-lg font-bold text-primary font-inter mb-4">
                        {question.id}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, index) => (
                          <label
                            key={index}
                            className="flex items-start space-x-3 cursor-pointer p-3 hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={index}
                              checked={selectedAnswers[question.id] === index}
                              onChange={() => handleAnswerChange(question.id, index)}
                              className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 mt-1 flex-shrink-0"
                              aria-describedby={`question-${question.id}-option-${index}`}
                            />
                            <span
                              id={`question-${question.id}-option-${index}`}
                              className="text-primary font-inter leading-relaxed"
                            >
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered}
                    className={`px-8 py-3 font-inter font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded ${
                      allQuestionsAnswered
                        ? "bg-primary text-accent hover:bg-gray-800 focus:ring-primary cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-label={allQuestionsAnswered ? "Submit quiz answers" : "Answer all questions to submit"}
                  >
                    Submit Quiz
                  </button>
                  <p className="text-sm text-primary font-inter mt-2">
                    {Object.keys(selectedAnswers).length}/{quizQuestions.length} questions answered
                  </p>
                </div>
              </>
            ) : (
              /* Results */
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary font-inter mb-4">Quiz Results</h2>
                <div className="text-4xl font-bold text-primary font-inter mb-4">
                  {score}/{quizQuestions.length}
                </div>
                <p className="text-lg text-primary font-inter mb-8">
                  You scored {Math.round((score / quizQuestions.length) * 100)}%
                </p>

                {/* Detailed Results */}
                <div className="space-y-6 mb-8 text-left" aria-live="polite">
                  {quizQuestions.map((question) => {
                    const userAnswer = selectedAnswers[question.id]
                    const isCorrect = userAnswer === question.correctAnswer

                    return (
                      <div key={question.id} className="border border-gray-200 p-4 bg-white rounded">
                        <h4 className="font-bold text-primary font-inter mb-3">
                          {question.id}. {question.question}
                        </h4>
                        <div className="space-y-2">
                          <p className={`font-inter font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                            Your answer: {question.options[userAnswer]} {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-600 font-inter font-semibold">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-gray-600 font-inter text-sm mt-2 italic">{question.explanation}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <button
                  onClick={resetQuiz}
                  className="bg-primary text-accent px-6 py-2 font-inter font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded mr-4"
                  aria-label="Retake the quiz"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Navigation */}
        {(showResults || isCompleted) && (
          <nav
            className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200"
            role="navigation"
            aria-label="Lesson navigation"
          >
            <button
              onClick={onPrevPage}
              className="bg-primary text-accent px-6 py-2 font-inter font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Go to previous lesson"
            >
              ← Previous Lesson
            </button>
            <button
              onClick={onNextPage}
              className="bg-primary text-accent px-6 py-2 font-inter font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Go to next lesson"
            >
              Next Lesson →
            </button>
          </nav>
        )}
      </div>
    </div>
  )
}
