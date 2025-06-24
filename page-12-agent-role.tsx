"use client"

import { memo, useState, useCallback, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { EnhancedButton } from "@/components/enhanced-button"

interface RoleScenario {
  id: string
  situation: string
  question: string
  responses: {
    id: string
    text: string
    isCorrect: boolean
    explanation: string
  }[]
}

interface ScenarioResponse {
  scenarioId: string
  selectedResponseId: string
  isCorrect: boolean
}

interface Page12_AgentRoleProps {
  onNextPage?: () => void
  onPrevPage?: () => void
  onPageCompletion?: (completed: boolean) => void
  isCompleted?: boolean
}

export const Page12_AgentRole = memo<Page12_AgentRoleProps>(
  ({ onNextPage, onPrevPage, onPageCompletion, isCompleted = false }) => {
    const [responses, setResponses] = useState<Record<string, ScenarioResponse>>({})
    const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({})

    // Key responsibilities data
    const keyResponsibilities = useMemo(
      () => [
        "Identify properties with assumable loans in MLS and market research",
        "Verify loan assumability with lenders and mortgage servicers",
        "Guide buyers through the assumption qualification process",
        "Negotiate purchase terms that account for assumable loan benefits",
        "Coordinate with lenders, title companies, and all transaction parties",
        "Educate clients on assumption process, timelines, and requirements",
        "Structure contracts with appropriate assumption contingencies",
        "Market assumable properties effectively to attract qualified buyers",
        "Calculate and explain down payment gap scenarios to clients",
        "Ensure proper documentation and compliance throughout the process",
      ],
      [],
    )

    // Role-playing scenarios data
    const roleScenarios = useMemo(
      (): RoleScenario[] => [
        {
          id: "scenario1",
          situation:
            "A buyer client asks you: 'I found a house I love, but the seller says it has an assumable loan at 3.2%. How do I know if this is legitimate and worth pursuing?'",
          question: "What's your best response as their agent?",
          responses: [
            {
              id: "r1a",
              text: "That sounds great! Let's make an offer right away since assumable loans are always beneficial.",
              isCorrect: false,
              explanation:
                "This response is too hasty. You need to verify the loan's assumability and help the client understand all implications before proceeding.",
            },
            {
              id: "r1b",
              text: "Let me verify this with the lender first, then we'll analyze if the rate savings justify the required down payment and qualification process.",
              isCorrect: true,
              explanation:
                "Correct! Always verify assumability with the lender and help clients make informed decisions based on their specific financial situation.",
            },
            {
              id: "r1c",
              text: "Assumable loans are too complicated. Let's look for other properties with conventional financing instead.",
              isCorrect: false,
              explanation:
                "This dismisses a potentially valuable opportunity. Agents should be knowledgeable about assumable loans to serve clients better.",
            },
          ],
        },
        {
          id: "scenario2",
          situation:
            "A seller client has an FHA loan at 2.8% and wants to know: 'Should I market this as assumable? Will it help me get a better price?'",
          question: "How do you advise your seller client?",
          responses: [
            {
              id: "r2a",
              text: "Yes, definitely market it as assumable! You can probably get $20,000 more than market value.",
              isCorrect: false,
              explanation:
                "While assumable loans can command premiums, you shouldn't make specific price promises without market analysis and verification.",
            },
            {
              id: "r2b",
              text: "Let me verify the loan's assumability first, then we'll analyze comparable sales and determine the right pricing strategy to attract qualified buyers.",
              isCorrect: true,
              explanation:
                "Perfect approach! Verify assumability, research the market, and develop a strategic pricing approach based on data.",
            },
            {
              id: "r2c",
              text: "FHA loans aren't really assumable anymore, so let's just market it normally.",
              isCorrect: false,
              explanation:
                "This is incorrect information. FHA loans are generally assumable, and this represents a missed opportunity for the seller.",
            },
          ],
        },
        {
          id: "scenario3",
          situation:
            "During a transaction, the lender says the assumption will take 6-8 weeks to process, but your buyer needs to close in 30 days for their lease expiration.",
          question: "What's your best course of action?",
          responses: [
            {
              id: "r3a",
              text: "Tell the buyer they'll have to find temporary housing since assumptions always take longer than regular loans.",
              isCorrect: false,
              explanation:
                "This doesn't explore all options. A good agent should work to find solutions that meet the client's needs.",
            },
            {
              id: "r3b",
              text: "Negotiate a rent-back agreement with the seller or explore bridge financing options while working with the lender to expedite the process.",
              isCorrect: true,
              explanation:
                "Excellent problem-solving! This explores creative solutions while working within the assumption timeline constraints.",
            },
            {
              id: "r3c",
              text: "Switch to conventional financing to meet the deadline since speed is more important than the rate.",
              isCorrect: false,
              explanation:
                "This abandons the assumption benefit without exploring alternatives. The rate savings might justify finding creative timing solutions.",
            },
          ],
        },
        {
          id: "scenario4",
          situation:
            "A buyer asks: 'The down payment gap is $150,000. That's a lot more cash than I planned. Should I still pursue this assumable loan?'",
          question: "How do you guide your buyer client?",
          responses: [
            {
              id: "r4a",
              text: "That's too much cash. Let's find a property where you can put down less money.",
              isCorrect: false,
              explanation:
                "This doesn't help the client analyze the full financial picture. The total cost of ownership might still be favorable.",
            },
            {
              id: "r4b",
              text: "Let's calculate the total monthly savings and long-term benefits to see if the higher down payment makes financial sense for your situation.",
              isCorrect: true,
              explanation:
                "Perfect! Help clients make informed decisions by analyzing the complete financial picture, not just the down payment amount.",
            },
            {
              id: "r4c",
              text: "You should definitely do it because assumable loans are always worth it, regardless of the down payment.",
              isCorrect: false,
              explanation:
                "This is poor advice. Every situation is different, and clients need personalized analysis based on their financial circumstances.",
            },
          ],
        },
      ],
      [],
    )

    // Handle response selection
    const handleResponseSelect = useCallback(
      (scenarioId: string, responseId: string) => {
        const scenario = roleScenarios.find((s) => s.id === scenarioId)
        const response = scenario?.responses.find((r) => r.id === responseId)

        if (scenario && response) {
          setResponses((prev) => ({
            ...prev,
            [scenarioId]: {
              scenarioId,
              selectedResponseId: responseId,
              isCorrect: response.isCorrect,
            },
          }))

          setShowFeedback((prev) => ({
            ...prev,
            [scenarioId]: true,
          }))
        }
      },
      [roleScenarios],
    )

    // Calculate score percentage
    const getScorePercentage = useCallback((): number => {
      const completedScenarios = Object.values(responses)
      if (completedScenarios.length === 0) return 0

      const correctResponses = completedScenarios.filter((r) => r.isCorrect).length
      return Math.round((correctResponses / completedScenarios.length) * 100)
    }, [responses])

    // Check if all scenarios are completed
    const allScenariosCompleted = useMemo(() => {
      return roleScenarios.every((scenario) => responses[scenario.id])
    }, [roleScenarios, responses])

    // Check if any scenarios have been started
    const scenariosStarted = useMemo(() => {
      return Object.keys(responses).length > 0
    }, [responses])

    // Check completion when all scenarios are answered
    useEffect(() => {
      if (allScenariosCompleted && onPageCompletion) {
        onPageCompletion(true)
      }
    }, [allScenariosCompleted, onPageCompletion])

    const handleNextPage = () => {
      if (isCompleted && onNextPage) {
        onNextPage()
      }
    }

    return (
      <section className="min-h-screen bg-roots-page-bg font-inter text-roots-text">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-roots-text font-inter mb-4">
              The Real Estate Agent's Role <span className="text-roots-icon-color">👩‍💼👨‍💼</span>
            </h1>
            <p className="text-lg text-roots-dark-gray font-inter">
              Understanding your critical role in successful assumable mortgage transactions
            </p>
          </div>

          {/* Introduction */}
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl text-roots-primary-accent">🔑</span>
              <h2 className="text-2xl font-bold text-roots-text font-inter">Why Your Expertise Matters</h2>
            </div>

            <div className="space-y-4 text-roots-dark-gray font-inter leading-relaxed">
              <p className="text-lg">
                As a real estate agent, you play a <strong className="text-roots-text">pivotal role</strong> in
                assumable mortgage transactions. Your expertise can mean the difference between a successful assumption
                and a missed opportunity for your clients.
              </p>

              <p>
                Unlike traditional transactions, assumable mortgages require specialized knowledge of loan types,
                qualification processes, and unique timing considerations. Your guidance helps clients navigate these
                complexities while maximizing their financial benefits.
              </p>
            </div>
          </div>

          {/* Key Responsibilities */}
          <div
            className="bg-roots-container-bg border border-roots-border-line rounded-xl p-8 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-xl font-bold text-roots-text font-inter mb-6">Key Responsibilities</h3>

            <ul className="space-y-3 text-roots-dark-gray font-inter">
              {keyResponsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-roots-primary-accent mt-1 flex-shrink-0">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Role-Playing Scenarios */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-roots-icon-color">🎭</span>
              <h3 className="text-2xl font-bold text-roots-text font-inter">Interactive Role-Playing Scenarios</h3>
            </div>

            <p className="text-roots-dark-gray font-inter mb-6">
              Test your knowledge with these realistic client scenarios. Choose the best response for each situation:
            </p>

            {/* Score Display */}
            {scenariosStarted && (
              <div className="bg-roots-page-bg border border-roots-border-line rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-roots-dark-gray font-inter">
                    Progress: {Object.keys(responses).length} of {roleScenarios.length} scenarios completed
                  </span>
                  {Object.keys(responses).length > 0 && (
                    <span className="text-xl font-bold text-roots-text font-inter">
                      {getScorePercentage()}% Correct
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Scenarios */}
            <div className="space-y-8">
              {roleScenarios.map((scenario, index) => {
                const userResponse = responses[scenario.id]
                const selectedResponse = scenario.responses.find((r) => r.id === userResponse?.selectedResponseId)
                const showScenarioFeedback = showFeedback[scenario.id]

                return (
                  <Card
                    key={scenario.id}
                    className="card-enhanced border-roots-border-line p-6 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Scenario Header */}
                    <div className="flex items-start gap-3 mb-6">
                      <MessageCircle className="w-6 h-6 text-roots-icon-color flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-roots-text font-inter mb-3">
                          Scenario {index + 1} <span className="text-roots-icon-color">🤔</span>
                        </h4>

                        {/* Situation Box */}
                        <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-4 mb-4">
                          <p className="text-roots-text font-inter italic">"{scenario.situation}"</p>
                        </div>

                        <p className="text-roots-text font-inter font-medium mb-4">{scenario.question}</p>
                      </div>
                    </div>

                    {/* Response Options */}
                    <div className="space-y-3 mb-4">
                      {scenario.responses.map((response) => {
                        const isSelected = userResponse?.selectedResponseId === response.id
                        const isCorrect = response.isCorrect
                        const isAnswered = !!userResponse

                        let buttonStyling = ""
                        let iconElement = null

                        if (isSelected && isAnswered) {
                          if (isCorrect) {
                            buttonStyling = "border-roots-primary-accent bg-roots-primary-accent bg-opacity-10"
                            iconElement = (
                              <div className="w-6 h-6 bg-roots-primary-accent text-roots-text rounded-full flex items-center justify-center text-sm font-bold">
                                ✓
                              </div>
                            )
                          } else {
                            buttonStyling = "border-red-500 bg-red-50"
                            iconElement = (
                              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                ✗
                              </div>
                            )
                          }
                        } else {
                          buttonStyling = isAnswered
                            ? "border-roots-medium-gray opacity-50"
                            : "border-roots-medium-gray hover:border-roots-dark-gray hover:bg-roots-light-gray"
                          iconElement = <div className="w-6 h-6 border-2 border-roots-medium-gray rounded-full"></div>
                        }

                        return (
                          <button
                            key={response.id}
                            onClick={() => !isAnswered && handleResponseSelect(scenario.id, response.id)}
                            disabled={isAnswered}
                            className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-300 ${buttonStyling} ${
                              !isAnswered ? "cursor-pointer" : "cursor-default"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {iconElement}
                              <span className="text-roots-text font-inter">{response.text}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Feedback */}
                    {showScenarioFeedback && selectedResponse && (
                      <div
                        className={`p-4 rounded-lg border animate-fade-in-up ${
                          selectedResponse.isCorrect
                            ? "bg-roots-primary-accent bg-opacity-20 border-roots-primary-accent text-roots-text"
                            : "bg-red-100 border-red-300 text-red-800"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg flex-shrink-0 mt-0.5">
                            {selectedResponse.isCorrect ? "✅" : "❌"}
                          </span>
                          <div>
                            <h5 className="font-bold font-inter mb-1">
                              {selectedResponse.isCorrect ? "Correct!" : "Not quite right"}
                            </h5>
                            <p className="text-sm font-inter">{selectedResponse.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timer Icon for Urgency */}
                    {scenario.id === "scenario3" && (
                      <div className="flex items-center gap-2 mt-4 text-roots-icon-color">
                        <span className="text-lg">⏰</span>
                        <span className="text-sm font-inter">Time-sensitive scenario</span>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Completion Message */}
          {allScenariosCompleted && (
            <Card className="card-enhanced p-8 text-center mt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">🎉</span>
                  <h3 className="text-2xl font-bold text-roots-text font-inter">Scenarios Complete!</h3>
                  <span className="text-4xl">🎉</span>
                </div>

                <p className="text-lg text-roots-text font-inter">
                  You've completed all role-playing scenarios! Your final score: {getScorePercentage()}%
                </p>

                <div className="card-container p-4">
                  <p className="text-roots-text font-inter">
                    <strong>Great work!</strong> You're developing the expertise needed to guide clients through
                    assumable mortgage transactions successfully. Remember, every situation is unique and requires
                    careful analysis and professional judgment.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Professional Development Tips */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <h3 className="text-xl font-bold text-roots-text font-inter mb-6">Building Your Expertise</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-enhanced p-6">
                <h4 className="font-bold text-roots-text font-inter mb-3">Continuous Learning</h4>
                <ul className="space-y-2 text-sm text-roots-dark-gray font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Stay updated on changing loan assumption policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Build relationships with assumption-experienced lenders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Practice calculating assumption scenarios regularly</span>
                  </li>
                </ul>
              </Card>

              <Card className="card-enhanced p-6">
                <h4 className="font-bold text-roots-text font-inter mb-3">Client Communication</h4>
                <ul className="space-y-2 text-sm text-roots-dark-gray font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Always verify information before making promises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Educate clients on both benefits and risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Set realistic expectations for timelines and processes</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-roots-border-line">
            <div className="flex justify-between items-center">
              <EnhancedButton variant="secondary" onClick={onPrevPage}>
                ← Previous: Buyer Considerations
              </EnhancedButton>
              <div className="flex flex-col items-end gap-2">
                {!isCompleted && (
                  <div className="text-sm text-roots-dark-gray font-inter flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Complete all role-playing scenarios to continue
                  </div>
                )}
                <EnhancedButton
                  onClick={handleNextPage}
                  size="lg"
                  disabled={!isCompleted}
                  className={!isCompleted ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {isCompleted ? (
                    <>
                      Next: Case Study → <span className="ml-2 text-green-500">✓</span>
                    </>
                  ) : (
                    "Next: Case Study →"
                  )}
                </EnhancedButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)

Page12_AgentRole.displayName = "Page12_AgentRole"
