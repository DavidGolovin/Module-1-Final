"use client"

import { useState, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { EnhancedButton } from "./enhanced-button"
import { ChevronLeft, ChevronRight, Home, Calculator, FileText, DollarSign, CheckCircle, Award } from "lucide-react"

interface CaseStep {
  id: number
  title: string
  icon: string
  content: string
  keyPoints: string[]
  calculation?: {
    title: string
    items: { label: string; value: number | string }[]
    total?: { label: string; value: number | string }
  }
}

const caseSteps: CaseStep[] = [
  {
    id: 1,
    title: "Initial Client Meeting",
    icon: "🤝",
    content:
      "Meet the Johnsons, a young couple looking to purchase their first home. They have good credit but limited savings for a large down payment. You discover a property with an assumable VA loan at 3.5% interest rate.",
    keyPoints: [
      "Clients have excellent credit scores (750+)",
      "Limited down payment funds ($15,000 available)",
      "Current market rates at 7.2%",
      "Found property with assumable VA loan at 3.5%",
      "Seller motivated to close quickly",
    ],
  },
  {
    id: 2,
    title: "Property & Loan Analysis",
    icon: "🏠",
    content:
      "The property is listed at $425,000 with an existing VA loan balance of $320,000. The original loan was obtained 3 years ago at 3.5% interest rate with 27 years remaining.",
    keyPoints: [
      "Property value: $425,000",
      "Existing loan balance: $320,000",
      "Interest rate: 3.5% (fixed)",
      "Remaining term: 27 years",
      "Monthly P&I payment: $1,580",
    ],
    calculation: {
      title: "Loan Assumption Analysis",
      items: [
        { label: "Property Price", value: "$425,000" },
        { label: "Existing Loan Balance", value: "$320,000" },
        { label: "Down Payment Required", value: "$105,000" },
        { label: "Interest Rate", value: "3.5%" },
        { label: "Monthly Payment (P&I)", value: "$1,580" },
      ],
    },
  },
  {
    id: 3,
    title: "Financial Comparison",
    icon: "📊",
    content:
      "Compare the assumable loan option with a conventional loan at current market rates. The savings are substantial over the life of the loan.",
    keyPoints: [
      "Conventional loan rate: 7.2%",
      "Assumable loan rate: 3.5%",
      "Monthly payment difference: $1,055",
      "Total interest savings: $284,850",
      "Break-even point: 18 months",
    ],
    calculation: {
      title: "Payment Comparison (27 years)",
      items: [
        { label: "Assumable Loan Payment", value: "$1,580" },
        { label: "New Conventional Loan", value: "$2,635" },
        { label: "Monthly Savings", value: "$1,055" },
        { label: "Annual Savings", value: "$12,660" },
        { label: "Total Interest Savings", value: "$284,850" },
      ],
    },
  },
  {
    id: 4,
    title: "Down Payment Solution",
    icon: "💰",
    content:
      "The clients need $105,000 but only have $15,000. You help them explore creative financing options including seller financing for the gap.",
    keyPoints: [
      "Total down payment needed: $105,000",
      "Client funds available: $15,000",
      "Financing gap: $90,000",
      "Seller agrees to carry $90,000 at 6%",
      "Second mortgage term: 10 years",
    ],
    calculation: {
      title: "Creative Financing Structure",
      items: [
        { label: "Client Cash Down", value: "$15,000" },
        { label: "Seller Financing", value: "$90,000" },
        { label: "Seller Note Rate", value: "6.0%" },
        { label: "Seller Note Payment", value: "$999" },
        { label: "Total Monthly Payment", value: "$2,579" },
      ],
    },
  },
  {
    id: 5,
    title: "Due Diligence Process",
    icon: "🔍",
    content:
      "Conduct thorough due diligence on the assumable loan, including verification with the lender, review of loan documents, and confirmation of assumption eligibility.",
    keyPoints: [
      "Verified loan assumption eligibility",
      "Confirmed no prepayment penalties",
      "Reviewed original loan documents",
      "Obtained lender approval for assumption",
      "Completed credit qualification process",
    ],
  },
  {
    id: 6,
    title: "Closing Preparation",
    icon: "📋",
    content:
      "Coordinate with all parties for a smooth closing. Ensure all assumption paperwork is complete and funds are properly allocated.",
    keyPoints: [
      "Assumption fee: $500 to lender",
      "Title work completed",
      "All parties signed assumption agreement",
      "Funds verified and ready for closing",
      "Closing scheduled within 30 days",
    ],
    calculation: {
      title: "Closing Costs Breakdown",
      items: [
        { label: "Loan Assumption Fee", value: "$500" },
        { label: "Title Insurance", value: "$1,275" },
        { label: "Attorney Fees", value: "$800" },
        { label: "Recording Fees", value: "$150" },
        { label: "Inspection", value: "$400" },
      ],
      total: { label: "Total Closing Costs", value: "$3,125" },
    },
  },
  {
    id: 7,
    title: "Successful Closing",
    icon: "🎉",
    content:
      "The transaction closed successfully! The Johnsons now own their first home with a below-market interest rate and manageable payments, saving them hundreds of thousands over the loan term.",
    keyPoints: [
      "Closed on time and under budget",
      "Clients secured 3.5% rate vs 7.2% market",
      "Monthly savings of $1,055 vs conventional loan",
      "Total lifetime savings: $284,850",
      "Clients can afford the home they wanted",
    ],
  },
]

export function Page13_CaseStudy() {
  const [currentStep, setCurrentStep] = useState(1)
  const [visitedSteps, setVisitedSteps] = useState(new Set([1]))

  const formatCurrency = useCallback((amount: number | string): string => {
    if (typeof amount === "string") return amount
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < caseSteps.length) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      setVisitedSteps((prev) => new Set([...prev, newStep]))
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
    setVisitedSteps((prev) => new Set([...prev, step]))
  }, [])

  const progressPercentage = useMemo(() => {
    return (currentStep / caseSteps.length) * 100
  }, [currentStep])

  const currentStepData = useMemo(() => {
    return caseSteps.find((step) => step.id === currentStep)
  }, [currentStep])

  const isCompleted = useMemo(() => {
    return currentStep === caseSteps.length
  }, [currentStep])

  const getStepIcon = (stepId: number) => {
    const icons = [Home, Calculator, FileText, DollarSign, CheckCircle, Award, CheckCircle]
    const IconComponent = icons[stepId - 1] || Home
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <section className="font-inter text-roots-text space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-roots-text flex items-center justify-center gap-3">
          <span className="text-roots-icon-color text-4xl">🤝</span>
          Interactive Case Study
        </h2>
        <p className="text-lg text-roots-dark-gray max-w-3xl mx-auto">
          Follow along with a real-world assumable mortgage transaction from initial client meeting to successful
          closing.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-roots-text">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="progress-enhanced">
          <div
            className="progress-fill transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex flex-wrap justify-center gap-2">
        {caseSteps.map((step) => {
          const isCurrent = step.id === currentStep
          const isCompleted = visitedSteps.has(step.id) && step.id < currentStep
          const isUnvisited = !visitedSteps.has(step.id)

          return (
            <button
              key={step.id}
              onClick={() => goToStep(step.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${
                  isCurrent
                    ? "bg-roots-primary-accent text-roots-text scale-110 shadow-lg"
                    : isCompleted
                      ? "bg-roots-light-gray text-roots-dark-gray border border-roots-medium-gray"
                      : "bg-roots-container-bg text-roots-dark-gray border border-roots-border-line hover:bg-roots-light-gray"
                }
              `}
            >
              {getStepIcon(step.id)}
              <span className="hidden sm:inline">Step {step.id}</span>
              <span className="sm:hidden">{step.id}</span>
            </button>
          )
        })}
      </div>

      {/* Current Step Content */}
      {currentStepData && (
        <Card className="card-enhanced border-roots-primary-accent">
          <div className="p-8 space-y-6">
            {/* Step Header */}
            <div className="text-center space-y-4">
              <div className="text-6xl">{currentStepData.icon}</div>
              <h3 className="text-2xl font-bold text-roots-text">{currentStepData.title}</h3>
              <p className="text-lg text-roots-dark-gray leading-relaxed">{currentStepData.content}</p>
            </div>

            {/* Key Points */}
            <div className="bg-roots-container-bg border border-roots-border-line rounded-lg p-6">
              <h4 className="text-lg font-semibold text-roots-text mb-4">Key Points</h4>
              <ul className="space-y-2">
                {currentStepData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-roots-dark-gray">
                    <span className="text-roots-icon-color mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculation Box */}
            {currentStepData.calculation && (
              <div className="bg-roots-container-bg border border-roots-icon-color rounded-lg p-6">
                <h4 className="text-lg font-semibold text-roots-text mb-4">{currentStepData.calculation.title}</h4>
                <div className="space-y-3">
                  {currentStepData.calculation.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-roots-page-bg rounded p-3">
                      <span className="text-roots-dark-gray">{item.label}</span>
                      <span className="font-semibold text-roots-text">
                        {typeof item.value === "number" ? formatCurrency(item.value) : item.value}
                      </span>
                    </div>
                  ))}
                  {currentStepData.calculation.total && (
                    <div className="border-t border-roots-border-line pt-3">
                      <div className="flex justify-between items-center bg-roots-primary-accent bg-opacity-10 rounded p-3 font-semibold">
                        <span className="text-roots-text">{currentStepData.calculation.total.label}</span>
                        <span className="text-roots-text">
                          {typeof currentStepData.calculation.total.value === "number"
                            ? formatCurrency(currentStepData.calculation.total.value)
                            : currentStepData.calculation.total.value}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Final Summary Box */}
            {isCompleted && (
              <Card className="card-enhanced border-roots-primary-accent bg-gradient-to-br from-roots-primary-accent/5 to-roots-primary-accent/10">
                <div className="p-6 space-y-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h4 className="text-xl font-bold text-roots-text mb-2">Case Study Complete!</h4>
                    <p className="text-roots-dark-gray">
                      You've successfully walked through a complete assumable mortgage transaction.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-roots-page-bg rounded-lg p-4 space-y-2">
                      <h5 className="font-semibold text-roots-primary-accent">Financial Impact</h5>
                      <div className="text-sm text-roots-dark-gray space-y-1">
                        <div>
                          Monthly Savings: <span className="font-semibold">$1,055</span>
                        </div>
                        <div>
                          Lifetime Savings: <span className="font-semibold">$284,850</span>
                        </div>
                        <div>
                          Interest Rate: <span className="font-semibold">3.5% vs 7.2%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-roots-page-bg rounded-lg p-4 space-y-2">
                      <h5 className="font-semibold text-roots-primary-accent">Transaction Success</h5>
                      <div className="text-sm text-roots-dark-gray space-y-1">
                        <div>
                          Closing Time: <span className="font-semibold">30 days</span>
                        </div>
                        <div>
                          Creative Financing: <span className="font-semibold">90% seller carry</span>
                        </div>
                        <div>
                          Client Satisfaction: <span className="font-semibold">Excellent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <EnhancedButton
          onClick={prevStep}
          variant="secondary"
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Step
        </EnhancedButton>

        <EnhancedButton
          onClick={nextStep}
          variant="primary"
          disabled={currentStep === caseSteps.length}
          className="flex items-center gap-2"
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </EnhancedButton>
      </div>
    </section>
  )
}
