"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { EnhancedCard } from "./enhanced-card"
import { CelebrationTrigger } from "./celebration-trigger"
import { SuccessBurst } from "./success-burst"
import { BackgroundPattern } from "./background-pattern"
import { Check, Clipboard } from "lucide-react"

interface GlossaryItem {
  id: string
  term: string
  definition: string
}

interface Page14GlossaryGameProps {
  onAllGlossaryMatched: () => void
}

const glossaryItems: GlossaryItem[] = [
  {
    id: "assumable-mortgage",
    term: "Assumable Mortgage",
    definition:
      "A mortgage loan that can be transferred from the seller to the buyer, allowing the buyer to take over the existing loan terms and interest rate.",
  },
  {
    id: "due-on-sale",
    term: "Due-on-Sale Clause",
    definition:
      "A provision in most conventional mortgages that requires the full loan balance to be paid when the property is sold, preventing loan assumption.",
  },
  {
    id: "va-loan",
    term: "VA Loan",
    definition:
      "A mortgage loan guaranteed by the Department of Veterans Affairs, available to eligible veterans and service members, and typically assumable.",
  },
  {
    id: "fha-loan",
    term: "FHA Loan",
    definition:
      "A mortgage loan insured by the Federal Housing Administration, designed to help lower-income and first-time homebuyers, and generally assumable.",
  },
  {
    id: "usda-loan",
    term: "USDA Loan",
    definition:
      "A mortgage loan guaranteed by the U.S. Department of Agriculture for rural and suburban homebuyers, offering 100% financing and assumable terms.",
  },
  {
    id: "assumption-fee",
    term: "Assumption Fee",
    definition:
      "A one-time fee charged by the lender when a buyer assumes an existing mortgage, typically ranging from $500 to $1,000.",
  },
  {
    id: "qualifying-assumption",
    term: "Qualifying Assumption",
    definition:
      "A loan assumption where the buyer must meet the lender's credit and income requirements to take over the existing mortgage.",
  },
  {
    id: "simple-assumption",
    term: "Simple Assumption",
    definition:
      "A loan assumption where the buyer can take over the mortgage without qualifying through the lender's underwriting process.",
  },
  {
    id: "wraparound-mortgage",
    term: "Wraparound Mortgage",
    definition:
      "A creative financing technique where the seller provides a second mortgage that 'wraps around' the existing assumable loan to cover the equity gap.",
  },
  {
    id: "release-of-liability",
    term: "Release of Liability",
    definition:
      "A legal document that removes the original borrower's responsibility for the mortgage debt when the loan is properly assumed by a new buyer.",
  },
]

export function Page14_GlossaryGame({ onAllGlossaryMatched }: Page14GlossaryGameProps) {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showSuccessBurst, setShowSuccessBurst] = useState(false)

  // Shuffle definitions for the game
  const shuffledDefinitions = useMemo(() => {
    const definitions = [...glossaryItems]
    for (let i = definitions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[definitions[i], definitions[j]] = [definitions[j], definitions[i]]
    }
    return definitions
  }, [])

  const isAllMatched = useMemo(() => {
    return Object.keys(matches).length === glossaryItems.length
  }, [matches])

  const handleDragStart = useCallback((e: React.DragEvent, definitionId: string) => {
    setDraggedItem(definitionId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", definitionId)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, termId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverTarget(termId)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverTarget(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, termId: string) => {
    e.preventDefault()
    const definitionId = e.dataTransfer.getData("text/plain")

    if (definitionId === termId) {
      setMatches((prev) => ({ ...prev, [termId]: definitionId }))
      setShowSuccessBurst(true)
    }

    setDraggedItem(null)
    setDragOverTarget(null)
  }, [])

  const handleCelebrationTrigger = useCallback(() => {
    setShowCelebration(true)
  }, [])

  const handleSuccessBurstComplete = useCallback(() => {
    setShowSuccessBurst(false)
  }, [])

  useEffect(() => {
    if (isAllMatched) {
      const timer = setTimeout(() => {
        onAllGlossaryMatched()
        setShowCelebration(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isAllMatched, onAllGlossaryMatched])

  return (
    <div className="relative">
      <BackgroundPattern pattern="grid" />
      <section className="min-h-screen bg-gradient-to-br from-roots-page-bg to-roots-container-bg p-6 font-inter text-roots-text relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-roots-text mb-4">
              <span className="text-roots-icon-color">🧩</span> Glossary Matching Game
            </h1>
            <p className="text-xl text-roots-dark-gray max-w-3xl mx-auto">
              Test your knowledge by matching mortgage terms with their definitions. Drag the definitions to their
              corresponding terms!
            </p>
            <div className="mt-6 text-lg text-roots-dark-gray">
              <span className="font-semibold text-roots-text">Progress:</span> {Object.keys(matches).length} /{" "}
              {glossaryItems.length} matched
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Terms Column */}
            <div>
              <h2 className="text-2xl font-bold text-roots-text mb-6 text-center">📚 Terms</h2>
              <div className="space-y-4">
                {glossaryItems.map((item, index) => {
                  const isMatched = matches[item.id]
                  const isDragOver = dragOverTarget === item.id

                  return (
                    <Card
                      key={item.id}
                      className={`
                        card-enhanced p-6 transition-all duration-300 cursor-pointer
                        ${
                          isMatched
                            ? "border-roots-primary-accent bg-roots-primary-accent bg-opacity-10"
                            : isDragOver
                              ? "border-roots-icon-color bg-roots-icon-color bg-opacity-10 scale-105 animate-pulse"
                              : "border-roots-border-line bg-roots-container-bg hover:border-roots-primary-accent hover:shadow-md hover:scale-[1.01]"
                        }
                        animate-fade-in-up
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onDragOver={(e) => !isMatched && handleDragOver(e, item.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => !isMatched && handleDrop(e, item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-roots-text">{item.term}</h3>
                        {isMatched && (
                          <div className="flex items-center justify-center w-8 h-8 bg-roots-primary-accent text-roots-text rounded-full">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Definitions Column */}
            <div>
              <h2 className="text-2xl font-bold text-roots-text mb-6 text-center">📋 Definitions</h2>
              <div className="space-y-4">
                {shuffledDefinitions.map((item, index) => {
                  const isMatched = Object.values(matches).includes(item.id)
                  const isDragging = draggedItem === item.id

                  return (
                    <Card
                      key={item.id}
                      className={`
                        card-enhanced p-6 transition-all duration-300 relative
                        ${
                          isMatched
                            ? "opacity-30 cursor-not-allowed border-roots-medium-gray bg-roots-light-gray scale-95"
                            : isDragging
                              ? "opacity-70 scale-110 rotate-3 border-roots-icon-color bg-roots-container-bg"
                              : "border-roots-border-line bg-roots-page-bg cursor-grab hover:shadow-lg hover:scale-[1.01] hover:bg-roots-light-gray"
                        }
                        animate-fade-in-up
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                      draggable={!isMatched}
                      onDragStart={(e) => !isMatched && handleDragStart(e, item.id)}
                    >
                      {isDragging && (
                        <div className="absolute inset-0 bg-roots-icon-color bg-opacity-10 rounded-lg pointer-events-none" />
                      )}
                      <div className="flex items-start gap-3">
                        <Clipboard className="w-5 h-5 text-roots-medium-gray mt-1 flex-shrink-0" />
                        <p className="text-roots-dark-gray leading-relaxed">{item.definition}</p>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Completion Message */}
          {isAllMatched && (
            <div className="text-center animate-fade-in-up">
              <EnhancedCard className="card-enhanced glowing border-roots-primary-accent max-w-2xl mx-auto p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    <span className="text-roots-primary-accent">🎉</span>
                  </div>
                  <h2 className="text-3xl font-bold text-roots-text mb-4">Congratulations!</h2>
                  <p className="text-xl text-roots-text mb-6">
                    You've successfully matched all {glossaryItems.length} terms with their definitions! You now have a
                    solid understanding of key assumable mortgage terminology.
                  </p>
                  <div className="space-y-4">
                    <p className="text-roots-dark-gray">
                      These terms will be essential as you work with assumable mortgages in your real estate practice.
                    </p>
                    <CelebrationTrigger onTrigger={handleCelebrationTrigger} className="mx-auto">
                      Celebrate Your Success! 🎊
                    </CelebrationTrigger>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          )}
        </div>

        <SuccessBurst show={showSuccessBurst} message="Perfect Match!" onComplete={handleSuccessBurstComplete} />
      </section>
    </div>
  )
}
