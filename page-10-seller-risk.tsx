"use client"

import type React from "react"

import { memo, useState, useCallback, useMemo } from "react"
import { EnhancedButton } from "./enhanced-button"
import { Card } from "@/components/ui/card"
import { XCircle, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface RiskScenario {
  id: string
  title: string
  description: string
  riskLevel: "high" | "medium" | "low"
  riskPoints: number
}

interface RiskTheme {
  borderColor: string
  backgroundColor: string
  textColor: string
  badgeColor: string
  badgeTextColor: string
  icon: React.ReactNode
}

interface Page10_SellerRiskProps {
  onNextPage?: () => void
  onPrevPage?: () => void
  onPageCompletion?: (completed: boolean) => void
  isCompleted?: boolean
}

export const Page10_SellerRisk = memo<Page10_SellerRiskProps>(
  ({ onNextPage, onPrevPage, onPageCompletion, isCompleted = false }) => {
    const [selectedScenarios, setSelectedScenarios] = useState<Set<string>>(new Set())
    const [isAssessing, setIsAssessing] = useState(false)
    const [showResult, setShowResult] = useState(false)

    // Risk scenarios data
    const riskScenarios = useMemo(
      (): RiskScenario[] => [
        {
          id: "no-release",
          title: "No Release of Liability Obtained",
          description: "Seller remains legally responsible for the mortgage payments even after sale",
          riskLevel: "high",
          riskPoints: 10,
        },
        {
          id: "buyer-default",
          title: "Buyer Has Marginal Credit Score",
          description: "New buyer barely qualifies with credit score near minimum requirements",
          riskLevel: "high",
          riskPoints: 8,
        },
        {
          id: "high-dti",
          title: "Buyer's High Debt-to-Income Ratio",
          description: "Buyer is at maximum DTI limits, increasing default risk",
          riskLevel: "medium",
          riskPoints: 6,
        },
        {
          id: "job-instability",
          title: "Buyer Has Unstable Employment",
          description: "Recent job changes or self-employment with irregular income",
          riskLevel: "medium",
          riskPoints: 5,
        },
        {
          id: "minimal-assets",
          title: "Buyer Has Minimal Cash Reserves",
          description: "Little to no savings beyond down payment and closing costs",
          riskLevel: "medium",
          riskPoints: 4,
        },
        {
          id: "market-decline",
          title: "Declining Local Market Conditions",
          description: "Property values decreasing, reducing buyer's equity cushion",
          riskLevel: "low",
          riskPoints: 3,
        },
        {
          id: "first-time-buyer",
          title: "First-Time Homebuyer",
          description: "Buyer lacks experience with homeownership responsibilities",
          riskLevel: "low",
          riskPoints: 2,
        },
        {
          id: "remote-property",
          title: "Property in Different State/Region",
          description: "Harder to monitor property condition and buyer situation",
          riskLevel: "low",
          riskPoints: 2,
        },
      ],
      [],
    )

    // Toggle scenario selection
    const toggleScenario = useCallback((scenarioId: string) => {
      setSelectedScenarios((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(scenarioId)) {
          newSet.delete(scenarioId)
        } else {
          newSet.add(scenarioId)
        }
        return newSet
      })
    }, [])

    // Calculate overall risk level
    const calculateRiskLevel = useCallback((): "high" | "medium" | "low" => {
      const selectedRiskScenarios = riskScenarios.filter((scenario) => selectedScenarios.has(scenario.id))
      const totalRiskPoints = selectedRiskScenarios.reduce((sum, scenario) => sum + scenario.riskPoints, 0)

      if (totalRiskPoints >= 15) return "high"
      if (totalRiskPoints >= 8) return "medium"
      return "low"
    }, [riskScenarios, selectedScenarios])

    // Get risk theme based on level
    const getRiskTheme = useCallback((riskLevel: "high" | "medium" | "low"): RiskTheme => {
      switch (riskLevel) {
        case "high":
          return {
            borderColor: "border-red-500",
            backgroundColor: "bg-red-50",
            textColor: "text-red-700",
            badgeColor: "bg-red-500",
            badgeTextColor: "text-white",
            icon: <XCircle className="w-5 h-5 text-red-500" />,
          }
        case "medium":
          return {
            borderColor: "border-orange-500",
            backgroundColor: "bg-orange-50",
            textColor: "text-orange-700",
            badgeColor: "bg-orange-500",
            badgeTextColor: "text-white",
            icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
          }
        case "low":
          return {
            borderColor: "border-roots-primary-accent",
            backgroundColor: "bg-roots-primary-accent bg-opacity-10",
            textColor: "text-roots-text",
            badgeColor: "bg-roots-primary-accent",
            badgeTextColor: "text-roots-text",
            icon: <CheckCircle className="w-5 h-5 text-roots-primary-accent" />,
          }
      }
    }, [])

    // Handle risk assessment completion
    const handleAssessRisk = useCallback(async () => {
      setIsAssessing(true)
      // Simulate assessment delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsAssessing(false)
      setShowResult(true)

      // Mark page as completed when assessment is done
      if (onPageCompletion) {
        onPageCompletion(true)
      }
    }, [onPageCompletion])

    const handleNextPage = () => {
      if (isCompleted && onNextPage) {
        onNextPage()
      }
    }

    // Get current risk level and theme
    const currentRiskLevel = useMemo(() => calculateRiskLevel(), [calculateRiskLevel])
    const resultTheme = useMemo(() => getRiskTheme(currentRiskLevel), [getRiskTheme, currentRiskLevel])

    // Get scenario card styling
    const getScenarioStyling = useCallback(
      (scenario: RiskScenario, isSelected: boolean) => {
        if (isSelected) {
          const theme = getRiskTheme(scenario.riskLevel)
          return `${theme.borderColor} ${theme.backgroundColor} ${theme.textColor}`
        }
        return "border-roots-border-line bg-roots-container-bg hover:border-roots-icon-color hover:bg-roots-light-gray text-roots-text"
      },
      [getRiskTheme],
    )

    return (
      <section className="min-h-screen bg-roots-page-bg font-inter text-roots-text">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-roots-text font-inter mb-4">
              Seller Risks & Release of Liability <span className="text-red-500">⚠️</span>
            </h1>
            <p className="text-lg text-roots-dark-gray font-inter">
              Understanding the critical importance of protecting yourself when allowing mortgage assumption
            </p>
          </div>

          {/* Why it's Essential Section */}
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: "0.2s" }}>
            <div className="card-container p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl text-roots-text">🚨</span>
                <h3 className="text-2xl font-bold text-roots-text font-inter">Why Release of Liability is Essential</h3>
              </div>

              <div className="space-y-4 text-roots-dark-gray font-inter">
                <p>
                  When you allow someone to assume your mortgage, you remain{" "}
                  <strong className="text-roots-text">legally responsible</strong> for the debt unless you obtain a
                  formal Release of Liability from your lender. This means:
                </p>

                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-text mt-1">⚡</span>
                    <span>
                      <strong className="text-roots-text">You're still liable</strong> if the new buyer stops making
                      payments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-text mt-1">⚡</span>
                    <span>
                      <strong className="text-roots-text">Your credit will be damaged</strong> by any missed payments or
                      foreclosure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-text mt-1">⚡</span>
                    <span>
                      <strong className="text-roots-text">The loan counts against your DTI</strong> for future mortgage
                      applications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-text mt-1">⚡</span>
                    <span>
                      <strong className="text-roots-text">You have no control</strong> over the property but retain
                      financial responsibility
                    </span>
                  </li>
                </ul>

                <div className="card-container p-4 mt-6">
                  <p className="text-roots-text font-inter">
                    <strong>Critical Point:</strong> Release of Liability is NOT automatic and must be specifically
                    requested and approved by the lender. Many sellers mistakenly believe they're automatically released
                    when someone assumes their loan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Risk Assessment */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-orange-500">🎯</span>
              <h3 className="text-2xl font-bold text-roots-text font-inter">Interactive Risk Assessment</h3>
            </div>

            <p className="text-roots-dark-gray font-inter mb-6">
              Select the scenarios that apply to your situation to assess your overall risk level:
            </p>

            {/* Risk Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {riskScenarios.map((scenario, index) => {
                const isSelected = selectedScenarios.has(scenario.id)
                const theme = getRiskTheme(scenario.riskLevel)

                return (
                  <Card
                    key={scenario.id}
                    className={`card-enhanced cursor-pointer transition-all duration-300 p-6 animate-fade-in-up ${getScenarioStyling(
                      scenario,
                      isSelected,
                    )}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => toggleScenario(scenario.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {theme.icon}
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${theme.badgeColor} ${theme.badgeTextColor}`}
                        >
                          {scenario.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                      {isSelected && <span className="text-roots-primary-accent text-xl">✅</span>}
                    </div>

                    <h4 className="font-bold font-inter mb-2">{scenario.title}</h4>
                    <p className="text-sm font-inter">{scenario.description}</p>
                  </Card>
                )
              })}
            </div>

            {/* Assess Risk Button */}
            <div className="text-center mb-8">
              <EnhancedButton
                onClick={handleAssessRisk}
                disabled={selectedScenarios.size === 0 || isAssessing}
                size="lg"
                className="min-w-48"
              >
                {isAssessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Assessing Risk...
                  </>
                ) : (
                  <>
                    <span className="text-orange-500 mr-2">🎯</span>
                    Assess Risk Level
                  </>
                )}
              </EnhancedButton>
            </div>

            {/* Risk Assessment Result */}
            {showResult && (
              <Card
                className={`card-enhanced p-8 text-center animate-fade-in-up ${resultTheme.borderColor} ${resultTheme.backgroundColor}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    {resultTheme.icon}
                    <h4 className={`text-2xl font-bold font-inter ${resultTheme.textColor}`}>
                      {currentRiskLevel.toUpperCase()} RISK LEVEL
                    </h4>
                    {resultTheme.icon}
                  </div>

                  <div className={`text-lg font-inter ${resultTheme.textColor}`}>
                    {currentRiskLevel === "high" && (
                      <div className="space-y-3">
                        <p>
                          <strong>⚠️ HIGH RISK:</strong> Your situation presents significant risks. Strongly consider
                          requiring Release of Liability approval before proceeding.
                        </p>
                        <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                          <p className="text-red-800 text-sm">
                            <strong>Recommendation:</strong> Consult with a real estate attorney and require the buyer
                            to obtain formal Release of Liability approval before closing.
                          </p>
                        </div>
                      </div>
                    )}

                    {currentRiskLevel === "medium" && (
                      <div className="space-y-3">
                        <p>
                          <strong>⚡ MEDIUM RISK:</strong> Some risk factors are present. Release of Liability is highly
                          recommended for your protection.
                        </p>
                        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                          <p className="text-orange-800 text-sm">
                            <strong>Recommendation:</strong> Pursue Release of Liability and consider additional
                            protections like requiring larger down payment or reserves.
                          </p>
                        </div>
                      </div>
                    )}

                    {currentRiskLevel === "low" && (
                      <div className="space-y-3">
                        <p>
                          <strong>✅ LOW RISK:</strong> Fewer risk factors present, but Release of Liability is still
                          recommended as a best practice.
                        </p>
                        <div className="bg-roots-primary-accent bg-opacity-20 border border-roots-primary-accent rounded-lg p-4">
                          <p className="text-roots-text text-sm">
                            <strong>Recommendation:</strong> Still pursue Release of Liability when possible, and ensure
                            proper documentation of the assumption process.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-roots-dark-gray font-inter">
                    Selected {selectedScenarios.size} risk factor{selectedScenarios.size !== 1 ? "s" : ""} •{" "}
                    {riskScenarios.filter((s) => selectedScenarios.has(s.id)).reduce((sum, s) => sum + s.riskPoints, 0)}{" "}
                    total risk points
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Protection Strategies */}
          <div className="animate-fade-in-up mt-12" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-roots-primary-accent">✅</span>
              <h3 className="text-2xl font-bold text-roots-text font-inter">Protection Strategies</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-enhanced p-6">
                <h4 className="font-bold text-roots-text font-inter mb-3">Primary Protection</h4>
                <ul className="space-y-2 text-sm text-roots-dark-gray font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Require Release of Liability approval before closing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Get written confirmation from lender</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Include contingency in purchase contract</span>
                  </li>
                </ul>
              </Card>

              <Card className="card-enhanced p-6">
                <h4 className="font-bold text-roots-text font-inter mb-3">Additional Safeguards</h4>
                <ul className="space-y-2 text-sm text-roots-dark-gray font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Require higher down payment for added security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Verify buyer's financial stability thoroughly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Consider seller financing for additional control</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-roots-border-line">
            <div className="flex justify-between items-center">
              <EnhancedButton variant="secondary" onClick={onPrevPage}>
                ← Previous: Down Payment Gap
              </EnhancedButton>
              <div className="flex flex-col items-end gap-2">
                {!isCompleted && (
                  <div className="text-sm text-roots-dark-gray font-inter flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Complete risk assessment to continue
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
                      Next: Buyer Considerations → <span className="ml-2 text-green-500">✓</span>
                    </>
                  ) : (
                    "Next: Buyer Considerations →"
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

Page10_SellerRisk.displayName = "Page10_SellerRisk"
