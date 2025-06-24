"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Check, X, Info, RotateCcw, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  shortDefinition: string
}

interface Match {
  termId: string
  definitionId: string
}

interface GlossaryMatchingGameProps {
  onComplete?: (score: number, totalQuestions: number) => void
  className?: string
  customTerms?: GlossaryTerm[]
  gameTitle?: string
  gameDescription?: string
}

const htmlTerms: GlossaryTerm[] = [
  {
    id: "html",
    term: "HTML",
    definition: "HyperText Markup Language - the standard markup language for creating web pages and web applications.",
    shortDefinition: "Standard markup language for web pages",
  },
  {
    id: "element",
    term: "HTML Element",
    definition: "A component of an HTML document that tells the browser how to structure and display content.",
    shortDefinition: "Component that structures and displays content",
  },
  {
    id: "tag",
    term: "HTML Tag",
    definition: "Keywords enclosed in angle brackets that define HTML elements, like <p> for paragraphs.",
    shortDefinition: "Keywords in angle brackets that define elements",
  },
  {
    id: "attribute",
    term: "HTML Attribute",
    definition: "Additional information provided to HTML elements, like 'src' in an img tag.",
    shortDefinition: "Additional information for HTML elements",
  },
  {
    id: "semantic",
    term: "Semantic HTML",
    definition: "HTML that uses meaningful tags to describe content structure and purpose.",
    shortDefinition: "HTML using meaningful tags for content structure",
  },
  {
    id: "form",
    term: "HTML Form",
    definition: "An element that collects user input and sends it to a server for processing.",
    shortDefinition: "Element for collecting and submitting user input",
  },
]

export function GlossaryMatchingGame({
  onComplete,
  className = "",
  customTerms,
  gameTitle = "🎯 HTML Terms Matching Game",
  gameDescription = "Drag definitions from the right column to match with terms on the left",
}: GlossaryMatchingGameProps) {
  // Use custom terms if provided, otherwise fall back to HTML terms
  const gameTerms = customTerms || htmlTerms
  const [matches, setMatches] = useState<Match[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Shuffle definitions for the game
  const shuffledDefinitions = useMemo(() => {
    const definitions = [...gameTerms]
    for (let i = definitions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[definitions[i], definitions[j]] = [definitions[j], definitions[i]]
    }
    return definitions
  }, [gameTerms])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Get match for a term
  const getMatchForTerm = useCallback(
    (termId: string) => {
      return matches.find((match) => match.termId === termId)
    },
    [matches],
  )

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, definitionId: string) => {
    setDraggedItem(definitionId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", definitionId)
  }, [])

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, termId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverTarget(termId)
  }, [])

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverTarget(null)
  }, [])

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent, termId: string) => {
    e.preventDefault()
    const definitionId = e.dataTransfer.getData("text/plain")

    if (definitionId) {
      setMatches((prev) => {
        // Remove any existing match for this term
        const filtered = prev.filter((match) => match.termId !== termId)
        // Add new match
        return [...filtered, { termId, definitionId }]
      })
    }

    setDraggedItem(null)
    setDragOverTarget(null)
  }, [])

  // Handle dropdown selection (mobile)
  const handleDropdownSelect = useCallback((termId: string, definitionId: string) => {
    setMatches((prev) => {
      // Remove any existing match for this term
      const filtered = prev.filter((match) => match.termId !== termId)
      // Add new match
      return [...filtered, { termId, definitionId }]
    })
  }, [])

  // Check answers
  const handleCheckAnswers = useCallback(() => {
    setIsChecked(true)
    setShowResults(true)

    // Calculate score
    const correctMatches = matches.filter((match) => match.termId === match.definitionId).length
    const totalQuestions = gameTerms.length

    if (onComplete) {
      onComplete(correctMatches, totalQuestions)
    }
  }, [matches, onComplete, gameTerms.length])

  // Reset game
  const handleReset = useCallback(() => {
    setMatches([])
    setIsChecked(false)
    setShowResults(false)
    setDraggedItem(null)
    setDragOverTarget(null)
  }, [])

  // Check if answer is correct
  const isCorrectMatch = useCallback((termId: string, definitionId: string) => {
    return termId === definitionId
  }, [])

  // Get completion status
  const completionStatus = useMemo(() => {
    const totalMatches = gameTerms.length
    const currentMatches = matches.length
    const correctMatches = isChecked
      ? matches.filter((match) => isCorrectMatch(match.termId, match.definitionId)).length
      : 0

    return {
      total: totalMatches,
      current: currentMatches,
      correct: correctMatches,
      percentage: totalMatches > 0 ? Math.round((currentMatches / totalMatches) * 100) : 0,
      score: totalMatches > 0 ? Math.round((correctMatches / totalMatches) * 100) : 0,
    }
  }, [matches, isChecked, isCorrectMatch, gameTerms.length])

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h3
          className="text-2xl font-bold text-primary mb-4 font-inter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {gameTitle}
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-6 font-inter"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isMobile ? "Select the correct definition for each term from the dropdown" : gameDescription}
        </motion.p>

        {/* Progress */}
        <motion.div
          className="flex items-center justify-center gap-4 text-sm text-gray-500 font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>
            Progress: {completionStatus.current}/{completionStatus.total} matched
          </span>
          {isChecked && (
            <span className="text-primary font-medium">
              Score: {completionStatus.correct}/{completionStatus.total} ({completionStatus.score}%)
            </span>
          )}
        </motion.div>
      </div>

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Terms Column */}
          <div>
            <h4 className="text-xl font-semibold text-primary mb-4 text-center font-inter">📚 Terms</h4>
            <div className="space-y-3">
              {gameTerms.map((term, index) => {
                const match = getMatchForTerm(term.id)
                const isMatched = !!match
                const isDragOver = dragOverTarget === term.id
                const isCorrect = isChecked && match ? isCorrectMatch(term.id, match.definitionId) : false
                const isIncorrect = isChecked && match ? !isCorrectMatch(term.id, match.definitionId) : false

                return (
                  <motion.div
                    key={term.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`
                        global-container p-4 transition-all duration-300 cursor-pointer min-h-[80px] flex items-center
                        ${isDragOver ? "border-primary bg-gray-50 scale-105" : ""}
                        ${isMatched && !isChecked ? "border-primary bg-gray-50" : ""}
                        ${isCorrect ? "border-primary bg-green-50" : ""}
                        ${isIncorrect ? "border-red-500 bg-red-50" : ""}
                        hover:shadow-md
                      `}
                      onDragOver={(e) => handleDragOver(e, term.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, term.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Term: ${term.term}. ${isMatched ? "Matched" : "Not matched"}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-primary font-inter">{term.term}</span>
                          <button
                            className="text-primary hover:text-gray-700 transition-colors"
                            aria-label={`View definition for ${term.term}`}
                            title={term.definition}
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </div>

                        {isChecked && (
                          <div className="flex items-center">
                            {isCorrect ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : isIncorrect ? (
                              <X className="w-5 h-5 text-red-600" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Definitions Column */}
          <div>
            <h4 className="text-xl font-semibold text-primary mb-4 text-center font-inter">📝 Definitions</h4>
            <div className="space-y-3">
              {shuffledDefinitions.map((term, index) => {
                const isUsed = matches.some((match) => match.definitionId === term.id)
                const isDragging = draggedItem === term.id

                return (
                  <motion.div
                    key={term.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`
                        global-container p-4 transition-all duration-300 min-h-[80px] flex items-center
                        ${isUsed ? "opacity-50 cursor-not-allowed bg-gray-100" : "cursor-grab hover:shadow-md"}
                        ${isDragging ? "opacity-70 scale-105 rotate-2" : ""}
                      `}
                      draggable={!isUsed}
                      onDragStart={(e) => !isUsed && handleDragStart(e, term.id)}
                      role="button"
                      tabIndex={isUsed ? -1 : 0}
                      aria-label={`Definition: ${term.shortDefinition}. ${isUsed ? "Already used" : "Available for matching"}`}
                    >
                      <p className="text-gray-700 leading-relaxed font-inter">{term.shortDefinition}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="space-y-4 mb-8">
          {gameTerms.map((term, index) => {
            const match = getMatchForTerm(term.id)
            const isCorrect = isChecked && match ? isCorrectMatch(term.id, match.definitionId) : false
            const isIncorrect = isChecked && match ? !isCorrectMatch(term.id, match.definitionId) : false

            return (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`
                  global-container p-4 transition-all duration-300
                  ${isCorrect ? "border-primary bg-green-50" : ""}
                  ${isIncorrect ? "border-red-500 bg-red-50" : ""}
                `}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary font-inter">{term.term}</span>
                        <button
                          className="text-primary hover:text-gray-700 transition-colors"
                          aria-label={`View definition for ${term.term}`}
                          title={term.definition}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>

                      {isChecked && (
                        <div>
                          {isCorrect ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : isIncorrect ? (
                            <X className="w-5 h-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>

                    <select
                      value={match?.definitionId || ""}
                      onChange={(e) => handleDropdownSelect(term.id, e.target.value)}
                      disabled={isChecked}
                      className="w-full p-3 border border-gray-300 bg-white text-primary font-inter focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select matching definition...</option>
                      {shuffledDefinitions.map((def) => (
                        <option key={def.id} value={def.id}>
                          {def.shortDefinition}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {!isChecked ? (
          <button
            onClick={handleCheckAnswers}
            disabled={matches.length !== gameTerms.length}
            className="bg-[#303030] text-[#CDFF64] px-8 py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#404040] font-inter"
          >
            Check Answers ({matches.length}/{gameTerms.length})
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button onClick={handleReset} className="btn-secondary px-6 py-3 font-medium transition-colors">
              <RotateCcw className="w-4 h-4 mr-2 inline" />
              Try Again
            </button>

            {completionStatus.score === 100 && (
              <motion.div
                className="flex items-center gap-2 text-primary font-medium font-inter"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <Trophy className="w-5 h-5" />
                Perfect Score!
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Results Summary */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="mt-8 global-container p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-primary mb-4 text-center font-inter">Results Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="global-container p-4">
                <div className="text-2xl font-bold text-primary font-inter">{completionStatus.current}</div>
                <div className="text-sm text-gray-600 font-inter">Total Matched</div>
              </div>
              <div className="global-container p-4">
                <div className="text-2xl font-bold text-primary font-inter">{completionStatus.correct}</div>
                <div className="text-sm text-gray-600 font-inter">Correct Answers</div>
              </div>
              <div className="global-container p-4">
                <div className="text-2xl font-bold text-primary font-inter">{completionStatus.score}%</div>
                <div className="text-sm text-gray-600 font-inter">Final Score</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
