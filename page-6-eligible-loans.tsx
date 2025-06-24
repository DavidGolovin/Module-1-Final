"use client"

import { memo, useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, X, AlertTriangle, TrendingUp, Search, FileText } from "lucide-react"

interface Page6Props {
  onNextPage: () => void
  onPrevPage: () => void
  onPageCompletion: (completed: boolean) => void
  isCompleted: boolean
}

export const Page6_EligibleLoans = memo(({ onNextPage, onPrevPage, onPageCompletion, isCompleted }: Page6Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [hasInteracted, setHasInteracted] = useState(false)

  // Trigger section animations on mount
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "assumable"])), 200),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "not-assumable"])), 400),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "market-share"])), 600),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "tips"])), 800),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "misconceptions"])), 1000),
    ]

    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Trigger element animations after sections are visible
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedElements(new Set(["checkmarks", "circles", "stats"]))
    }, 1200)

    return () => clearTimeout(timeout)
  }, [])

  // Mark lesson as completed when user interacts
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      onPageCompletion(true)
    }
  }

  // Assumable loan types data
  const assumableLoans = useMemo(
    () => [
      {
        type: "FHA Loans",
        description: "Federal Housing Administration loans - most common assumable type",
        details: "Typically require 3.5% down payment, available to most borrowers",
        letter: "F",
      },
      {
        type: "VA Loans",
        description: "Veterans Affairs loans - excellent assumption opportunities",
        details: "Available to qualified veterans, often with no down payment",
        letter: "V",
      },
      {
        type: "USDA Loans",
        description: "Rural development loans - assumable in eligible areas",
        details: "For rural and suburban areas, income restrictions may apply",
        letter: "U",
      },
      {
        type: "Some Portfolio Loans",
        description: "Bank-held loans that may allow assumption",
        details: "Varies by lender policy, requires direct inquiry",
        letter: "P",
      },
    ],
    [],
  )

  const nonAssumableLoans = useMemo(
    () => [
      {
        type: "Conventional Loans",
        description: "Most common loan type - typically not assumable",
        details: "Fannie Mae and Freddie Mac loans usually have due-on-sale clauses",
      },
      {
        type: "Jumbo Loans",
        description: "High-balance loans above conforming limits",
        details: "Almost always include due-on-sale clauses preventing assumption",
      },
      {
        type: "Private Money Loans",
        description: "Hard money and private lender loans",
        details: "Terms vary, but assumption is rarely permitted",
      },
      {
        type: "Most Commercial Loans",
        description: "Business and investment property loans",
        details: "Typically structured to prevent assumption without approval",
      },
    ],
    [],
  )

  // Market share statistics
  const marketShareStats = useMemo(
    () => [
      {
        loanType: "Conventional",
        percentage: "65%",
        status: "Not Assumable",
        borderColor: "border-primary",
        statusColor: "text-red-500",
        description: "Majority of home loans",
      },
      {
        loanType: "FHA",
        percentage: "22%",
        status: "Assumable",
        borderColor: "border-accent",
        statusColor: "text-accent",
        description: "Largest assumable segment",
      },
      {
        loanType: "VA",
        percentage: "8%",
        status: "Assumable",
        borderColor: "border-primary",
        statusColor: "text-primary",
        description: "Veterans' loans",
      },
      {
        loanType: "USDA/Other",
        percentage: "5%",
        status: "Varies",
        borderColor: "border-gray-300",
        statusColor: "text-primary",
        description: "Rural & specialty loans",
      },
    ],
    [],
  )

  // Identification tips
  const identificationTips = useMemo(
    () => [
      {
        tip: "Check the original loan documents for loan type designation",
        icon: <FileText className="w-5 h-5 text-primary" />,
      },
      {
        tip: "Look for FHA case numbers or VA loan numbers in public records",
        icon: <Search className="w-5 h-5 text-primary" />,
      },
      {
        tip: "Contact the current lender directly to verify assumption eligibility",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
      {
        tip: "Review the original purchase date - loans from 2019-2021 are prime candidates",
        icon: <TrendingUp className="w-5 h-5 text-primary" />,
      },
      {
        tip: "Use MLS systems that flag government-backed loans",
        icon: <Search className="w-5 h-5 text-primary" />,
      },
      {
        tip: "Network with agents who specialize in assumable properties",
        icon: <CheckCircle className="w-5 h-5 text-primary" />,
      },
    ],
    [],
  )

  // Common misconceptions
  const commonMisconceptions = useMemo(
    () => [
      {
        myth: "All government loans are automatically assumable",
        reality:
          "While FHA, VA, and USDA loans are generally assumable, the buyer must still qualify and get lender approval",
      },
      {
        myth: "Conventional loans can never be assumed",
        reality:
          "While rare, some portfolio lenders may allow assumption of conventional loans on a case-by-case basis",
      },
      {
        myth: "You can assume any loan if you can afford the payments",
        reality:
          "Lenders require full qualification including credit score, income verification, and debt-to-income ratios",
      },
      {
        myth: "Assumable loans are easy to find and identify",
        reality: "It requires specialized knowledge and research to identify assumable opportunities in the market",
      },
    ],
    [],
  )

  return (
    <div className="global-container">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Page Header */}
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary font-inter mb-4">Which Loans Are Assumable?</h1>
            <p className="text-lg text-gray-600 font-inter max-w-3xl mx-auto">
              Understanding loan types, market share, and identification strategies
            </p>
          </header>

          {/* Introduction */}
          <section className="text-center animate-fade-in-up" onClick={handleInteraction}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl" role="img" aria-label="Document">
                📜
              </span>
              <h2 className="text-2xl font-bold text-primary font-inter">Loan Type Eligibility</h2>
            </div>
            <p className="text-lg text-gray-600 font-inter max-w-3xl mx-auto">
              Not all mortgages are created equal when it comes to assumption. Understanding which loan types allow
              assumption is crucial for identifying opportunities in the market.
            </p>
          </section>

          {/* Assumable vs Non-Assumable Side by Side */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generally Assumable */}
            <Card
              className={`global-container border-2 border-accent p-8 ${
                visibleSections.has("assumable") ? "animate-slide-in-left" : "opacity-0"
              }`}
              onClick={handleInteraction}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl text-accent" role="img" aria-label="Check mark">
                  ✅
                </span>
                <h3 className="text-xl font-bold text-primary font-inter">Generally Assumable</h3>
              </div>

              <div className="space-y-4">
                {assumableLoans.map((loan, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 bg-gray-50 ${
                      visibleSections.has("assumable") ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`w-10 h-10 bg-accent text-primary font-bold font-inter flex items-center justify-center ${
                        animatedElements.has("circles") ? "animate-pulse" : ""
                      }`}
                    >
                      {loan.letter}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary font-inter mb-1">{loan.type}</h4>
                      <p className="text-sm text-gray-600 font-inter mb-1">{loan.description}</p>
                      <p className="text-xs text-gray-500 font-inter italic">{loan.details}</p>
                    </div>
                    {animatedElements.has("checkmarks") && (
                      <CheckCircle className="w-6 h-6 text-accent animate-bounce" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Generally NOT Assumable */}
            <Card
              className={`global-container border-2 border-primary p-8 ${
                visibleSections.has("not-assumable") ? "animate-slide-in-right" : "opacity-0"
              }`}
              onClick={handleInteraction}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl text-red-500" role="img" aria-label="X mark">
                  ❌
                </span>
                <h3 className="text-xl font-bold text-primary font-inter">Generally NOT Assumable</h3>
              </div>

              <div className="space-y-4">
                {nonAssumableLoans.map((loan, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 bg-gray-50 ${
                      visibleSections.has("not-assumable") ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-primary font-inter mb-1">{loan.type}</h4>
                      <p className="text-sm text-gray-600 font-inter mb-1">{loan.description}</p>
                      <p className="text-xs text-gray-500 font-inter italic">{loan.details}</p>
                    </div>
                    {animatedElements.has("checkmarks") && <X className="w-6 h-6 text-red-500 animate-bounce" />}
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Market Share by Loan Type */}
          <section className={`${visibleSections.has("market-share") ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl" role="img" aria-label="Chart">
                📊
              </span>
              <h3 className="text-xl font-bold text-primary font-inter">Market Share by Loan Type</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketShareStats.map((stat, index) => (
                <Card
                  key={index}
                  className={`global-container border-2 ${stat.borderColor} p-6 text-center ${
                    animatedElements.has("stats") ? "animate-bounce-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={handleInteraction}
                >
                  <div className="text-4xl font-bold text-primary font-inter mb-2">{stat.percentage}</div>
                  <div className="text-lg font-bold text-primary font-inter mb-2">{stat.loanType}</div>
                  <div className={`text-sm font-medium ${stat.statusColor} font-inter mb-2`}>{stat.status}</div>
                  <div className="text-xs text-gray-600 font-inter">{stat.description}</div>
                </Card>
              ))}
            </div>

            <div className="mt-6 bg-gray-50 border border-gray-200 p-4">
              <p className="text-sm text-gray-600 font-inter text-center">
                <strong>Key Insight:</strong> Approximately 30% of the mortgage market consists of potentially assumable
                loans (FHA, VA, USDA), representing significant opportunity for buyers and sellers.
              </p>
            </div>
          </section>

          {/* Quick Identification Tips */}
          <Card
            className={`global-container border border-gray-200 p-8 ${
              visibleSections.has("tips") ? "animate-fade-in-up" : "opacity-0"
            }`}
            onClick={handleInteraction}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl" role="img" aria-label="Magnifying glass">
                🔍
              </span>
              <h3 className="text-xl font-bold text-primary font-inter">Quick Identification Tips</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {identificationTips.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${visibleSections.has("tips") ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-2 bg-gray-50">{item.icon}</div>
                  <p className="text-sm text-gray-600 font-inter">{item.tip}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Common Misconceptions */}
          <Card
            className={`global-container border border-red-500 p-8 ${
              visibleSections.has("misconceptions") ? "animate-fade-in-up" : "opacity-0"
            }`}
            onClick={handleInteraction}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-red-500" role="img" aria-label="Warning">
                ⚠️
              </span>
              <h3 className="text-xl font-bold text-primary font-inter">Common Misconceptions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonMisconceptions.map((item, index) => (
                <div
                  key={index}
                  className={`space-y-3 p-4 bg-red-50 border border-red-200 ${
                    visibleSections.has("misconceptions") ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <h5 className="font-bold text-red-700 font-inter text-sm">Myth:</h5>
                    </div>
                    <p className="text-sm text-red-600 font-inter ml-6">{item.myth}</p>
                  </div>
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <h5 className="font-bold text-green-700 font-inter text-sm">Reality:</h5>
                    </div>
                    <p className="text-sm text-green-600 font-inter ml-6">{item.reality}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Key Takeaway */}
          <section
            className={`text-center ${visibleSections.has("misconceptions") ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <Card className="global-container p-8">
              <h4 className="text-lg font-bold text-primary font-inter mb-4">Remember</h4>
              <p className="text-gray-600 font-inter max-w-3xl mx-auto">
                Focus your search on FHA, VA, and USDA loans from 2019-2021 when rates were at historic lows. These
                represent the highest-value assumable opportunities in today's market. Always verify assumption
                eligibility directly with the lender before proceeding.
              </p>
            </Card>
          </section>

          {/* Navigation */}
          {(hasInteracted || isCompleted) && (
            <nav className="flex justify-between items-center pt-8" aria-label="Lesson navigation">
              <Button
                onClick={onPrevPage}
                variant="outline"
                className="flex items-center gap-2"
                aria-label="Go to previous lesson"
              >
                ← Previous
              </Button>
              <Button onClick={onNextPage} className="flex items-center gap-2" aria-label="Go to next lesson">
                Next →
              </Button>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
})

Page6_EligibleLoans.displayName = "Page6_EligibleLoans"
