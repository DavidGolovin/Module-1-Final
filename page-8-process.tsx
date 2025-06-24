"use client"

import { memo, useState, useCallback, useMemo } from "react"
import { PageContainer } from "./page-container"
import { InfoModal } from "./info-modal"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowDown } from "lucide-react"

interface Page8_ProcessProps {
  completedProcessSteps: Set<string>
  onProcessStepCompleted: (step: string) => void
}

interface ProcessStep {
  id: string
  title: string
  shortDescription: string
  detailedExplanation: string
  keyPoints: string[]
  tips: string[]
  timeframe: string
}

export const Page8_Process = memo<Page8_ProcessProps>(({ completedProcessSteps, onProcessStepCompleted }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null)
  const [clickedSteps, setClickedSteps] = useState<Set<string>>(new Set())

  // Process steps data
  const processSteps = useMemo(
    (): ProcessStep[] => [
      {
        id: "identify",
        title: "Identify Assumable Properties",
        shortDescription: "Find properties with assumable loans (FHA, VA, USDA)",
        detailedExplanation:
          "The first step is identifying properties that have assumable mortgages. This requires research and specialized knowledge to find the right opportunities in your market.",
        keyPoints: [
          "Focus on FHA, VA, and USDA loans from 2019-2021",
          "Use MLS systems that flag government-backed loans",
          "Check public records for loan origination dates",
          "Network with agents who specialize in assumable properties",
        ],
        tips: [
          "Look for properties purchased when rates were 2-4% lower than today",
          "Contact listing agents directly to verify assumption eligibility",
          "Use online databases and property search tools",
        ],
        timeframe: "Ongoing research activity",
      },
      {
        id: "verify",
        title: "Verify Loan Assumability",
        shortDescription: "Confirm with lender that the loan can be assumed",
        detailedExplanation:
          "Not all government-backed loans are automatically assumable. You must verify with the current lender that assumption is permitted and understand the specific requirements.",
        keyPoints: [
          "Contact the current mortgage servicer directly",
          "Request assumption guidelines and requirements",
          "Verify current loan balance and terms",
          "Understand any fees or restrictions",
        ],
        tips: [
          "Get verification in writing from the lender",
          "Ask about processing times and requirements",
          "Confirm the exact interest rate and remaining term",
        ],
        timeframe: "1-2 weeks",
      },
      {
        id: "qualify",
        title: "Qualify with Lender",
        shortDescription: "Meet lender requirements for income, credit, and debt-to-income",
        detailedExplanation:
          "Even with an assumable loan, you must qualify with the lender just as you would for a new mortgage. This includes credit checks, income verification, and meeting debt-to-income requirements.",
        keyPoints: [
          "Submit loan assumption application",
          "Provide income and employment documentation",
          "Meet minimum credit score requirements",
          "Satisfy debt-to-income ratio limits",
        ],
        tips: [
          "Prepare all financial documents in advance",
          "Consider getting pre-qualified before making offers",
          "Work with a loan officer experienced in assumptions",
        ],
        timeframe: "2-4 weeks",
      },
      {
        id: "negotiate",
        title: "Negotiate Purchase Terms",
        shortDescription: "Agree on sale price and assumption terms with seller",
        detailedExplanation:
          "Negotiate the purchase price and terms with the seller. The down payment will be the difference between the sale price and the remaining loan balance.",
        keyPoints: [
          "Determine fair market value of the property",
          "Calculate required down payment (sale price - loan balance)",
          "Negotiate any seller concessions or credits",
          "Include assumption contingencies in the contract",
        ],
        tips: [
          "Factor in the value of the low interest rate when negotiating",
          "Consider offering a premium for the assumable loan benefit",
          "Include assumption approval as a contract contingency",
        ],
        timeframe: "1-2 weeks",
      },
      {
        id: "process",
        title: "Process Assumption Application",
        shortDescription: "Complete lender paperwork and await approval",
        detailedExplanation:
          "Work with the lender to complete all assumption paperwork. This process is similar to a mortgage application but typically faster since the loan already exists.",
        keyPoints: [
          "Complete assumption application with lender",
          "Provide all required financial documentation",
          "Pay assumption processing fees",
          "Coordinate with title company and real estate agents",
        ],
        tips: [
          "Stay in regular contact with your loan processor",
          "Respond quickly to any document requests",
          "Keep all parties informed of progress",
        ],
        timeframe: "3-6 weeks",
      },
      {
        id: "close",
        title: "Close on the Property",
        shortDescription: "Finalize the transaction and assume the mortgage",
        detailedExplanation:
          "Complete the closing process, sign all documents, and officially assume the mortgage. The seller may or may not be released from liability depending on lender approval.",
        keyPoints: [
          "Attend closing with all required documents",
          "Sign assumption agreement and closing documents",
          "Transfer property title and mortgage responsibility",
          "Confirm liability release status for seller",
        ],
        tips: [
          "Review all documents carefully before signing",
          "Confirm the exact loan terms and payment details",
          "Set up automatic payments with the new servicer",
        ],
        timeframe: "1 day (closing)",
      },
    ],
    [],
  )

  // Handle step click
  const handleStepClick = useCallback(
    (step: ProcessStep) => {
      // Add click animation
      setClickedSteps((prev) => new Set([...prev, step.id]))
      setTimeout(() => {
        setClickedSteps((prev) => {
          const newSet = new Set(prev)
          newSet.delete(step.id)
          return newSet
        })
      }, 150)

      // Mark as completed and show modal
      onProcessStepCompleted(step.id)
      setSelectedStep(step)
      setShowModal(true)
    },
    [onProcessStepCompleted],
  )

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedStep(null)
  }, [])

  // Check if all steps are completed
  const allStepsCompleted = useMemo(() => {
    return processSteps.every((step) => completedProcessSteps.has(step.id))
  }, [processSteps, completedProcessSteps])

  // Get step styling based on completion status
  const getStepStyling = useCallback(
    (stepId: string) => {
      const isCompleted = completedProcessSteps.has(stepId)
      const isClicked = clickedSteps.has(stepId)

      let baseClasses = "card-enhanced cursor-pointer transition-all duration-300 "

      if (isCompleted) {
        baseClasses += "bg-roots-primary-accent border-roots-primary-accent shadow-lg animate-pulse-green "
      } else {
        baseClasses += "bg-roots-container-bg border-roots-border-line hover:bg-roots-light-gray "
      }

      if (isClicked) {
        baseClasses += "scale-95 "
      }

      return baseClasses
    },
    [completedProcessSteps, clickedSteps],
  )

  return (
    <PageContainer
      title="The Assumable Mortgage Process"
      subtitle="A step-by-step guide to successfully assuming a mortgage"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Introduction */}
        <div className="text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl text-roots-icon-color">🗺️</span>
            <h2 className="text-2xl font-bold text-roots-text font-inter">Your Roadmap to Success</h2>
          </div>
          <p className="text-lg text-roots-dark-gray font-inter max-w-3xl mx-auto">
            Follow these essential steps to navigate the assumable mortgage process. Click on each step to learn more
            about what's involved and get helpful tips for success.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <div key={step.id} className="space-y-4">
              {/* Step Card */}
              <Card
                className={`${getStepStyling(step.id)} animate-fade-in-up p-6`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleStepClick(step)}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number/Checkmark */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg font-inter ${
                      completedProcessSteps.has(step.id)
                        ? "bg-roots-text text-roots-primary-accent"
                        : "bg-roots-primary-accent text-roots-text"
                    }`}
                  >
                    {completedProcessSteps.has(step.id) ? (
                      <span className="text-roots-text">✓</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold font-inter mb-2 ${
                        completedProcessSteps.has(step.id) ? "text-roots-text" : "text-roots-text"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`font-inter ${
                        completedProcessSteps.has(step.id) ? "text-roots-text" : "text-roots-dark-gray"
                      }`}
                    >
                      {step.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-medium text-roots-dark-gray font-inter">
                        Timeframe: {step.timeframe}
                      </span>
                      {completedProcessSteps.has(step.id) && <CheckCircle className="w-4 h-4 text-roots-text" />}
                    </div>
                  </div>

                  {/* Click Indicator */}
                  <div className="text-roots-dark-gray">
                    <span className="text-sm font-inter">Click to learn more</span>
                  </div>
                </div>
              </Card>

              {/* Arrow Between Steps */}
              {index < processSteps.length - 1 && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 text-roots-icon-color animate-pulse">
                    <span className="text-2xl">➡️</span>
                    <ArrowDown className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Completion Indicator */}
        {allStepsCompleted && (
          <div className="text-center animate-fade-in-up bg-roots-primary-accent bg-opacity-20 border border-roots-primary-accent rounded-xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl text-roots-primary-accent">✅</span>
              <h3 className="text-2xl font-bold text-roots-text font-inter">Process Complete!</h3>
              <span className="text-4xl text-roots-primary-accent">✅</span>
            </div>
            <p className="text-lg text-roots-text font-inter">
              Congratulations! You've learned about all the key steps in the assumable mortgage process. You're now
              ready to identify and pursue assumable loan opportunities with confidence.
            </p>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-roots-container-bg border border-roots-border-line rounded-full px-6 py-3">
            <span className="text-sm text-roots-dark-gray font-inter">
              Progress: {completedProcessSteps.size}/{processSteps.length} steps completed
            </span>
            <div className="w-24 h-2 bg-roots-light-gray rounded-full overflow-hidden">
              <div
                className="h-full bg-roots-primary-accent transition-all duration-500"
                style={{
                  width: `${(completedProcessSteps.size / processSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step Detail Modal */}
      <InfoModal isOpen={showModal} onClose={handleCloseModal} title={selectedStep?.title || "Process Step Details"}>
        {selectedStep && (
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Overview</h4>
              <p className="text-roots-dark-gray font-inter">{selectedStep.detailedExplanation}</p>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Key Points</h4>
              <ul className="space-y-2">
                {selectedStep.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-roots-dark-gray font-inter">
                    <CheckCircle className="w-4 h-4 text-roots-primary-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Pro Tips</h4>
              <ul className="space-y-2">
                {selectedStep.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-roots-dark-gray font-inter">
                    <span className="text-roots-icon-color">💡</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeframe */}
            <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-4">
              <h4 className="font-bold text-roots-text mb-2 font-inter">Expected Timeframe</h4>
              <p className="text-roots-dark-gray font-inter text-sm">{selectedStep.timeframe}</p>
            </div>
          </div>
        )}
      </InfoModal>
    </PageContainer>
  )
})

Page8_Process.displayName = "Page8_Process"
