"use client"

import { memo, useState, useCallback, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckSquare, Square } from "lucide-react"
import { EnhancedButton } from "@/components/enhanced-button"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: "financial" | "legal" | "property" | "lender"
  priority: "high" | "medium" | "low"
}

interface CategoryTheme {
  borderColor: string
  backgroundColor: string
  textColor: string
}

interface Page11_BuyerConsiderationsProps {
  onNextPage?: () => void
  onPrevPage?: () => void
  onPageCompletion?: (completed: boolean) => void
  isCompleted?: boolean
}

export const Page11_BuyerConsiderations = memo<Page11_BuyerConsiderationsProps>(
  ({ onNextPage, onPrevPage, onPageCompletion, isCompleted = false }) => {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

    // Checklist items data
    const checklistItems = useMemo(
      (): ChecklistItem[] => [
        {
          id: "verify-assumability",
          title: "Verify Loan is Actually Assumable",
          description: "Confirm with lender that the specific loan allows assumption and get written verification",
          category: "lender",
          priority: "high",
        },
        {
          id: "check-interest-rate",
          title: "Confirm Current Interest Rate",
          description: "Verify the exact interest rate and ensure it's lower than current market rates",
          category: "financial",
          priority: "high",
        },
        {
          id: "review-loan-terms",
          title: "Review All Loan Terms",
          description: "Understand payment schedule, remaining term, and any special conditions",
          category: "legal",
          priority: "high",
        },
        {
          id: "calculate-down-payment",
          title: "Calculate Required Down Payment",
          description: "Determine exact cash needed (sale price minus loan balance) plus closing costs",
          category: "financial",
          priority: "high",
        },
        {
          id: "get-property-inspection",
          title: "Get Professional Property Inspection",
          description: "Hire qualified inspector to identify any issues before committing to purchase",
          category: "property",
          priority: "high",
        },
        {
          id: "review-payment-history",
          title: "Review Seller's Payment History",
          description: "Verify current owner has made payments on time and loan is in good standing",
          category: "lender",
          priority: "medium",
        },
        {
          id: "understand-qualification",
          title: "Understand Qualification Requirements",
          description: "Know credit score, income, and DTI requirements for assumption approval",
          category: "lender",
          priority: "medium",
        },
        {
          id: "check-property-taxes",
          title: "Verify Property Tax Information",
          description: "Confirm current tax amounts and any pending assessments or exemptions",
          category: "financial",
          priority: "medium",
        },
        {
          id: "review-hoa-docs",
          title: "Review HOA Documents (if applicable)",
          description: "Understand fees, rules, and any pending special assessments",
          category: "legal",
          priority: "medium",
        },
        {
          id: "get-title-search",
          title: "Order Title Search and Insurance",
          description: "Ensure clear title and protect against any title defects",
          category: "legal",
          priority: "medium",
        },
        {
          id: "check-insurance-costs",
          title: "Get Insurance Quotes",
          description: "Obtain homeowner's insurance quotes to budget for monthly costs",
          category: "financial",
          priority: "medium",
        },
        {
          id: "understand-seller-liability",
          title: "Understand Seller's Liability Status",
          description: "Know if seller will be released from liability or remain responsible",
          category: "legal",
          priority: "low",
        },
        {
          id: "research-neighborhood",
          title: "Research Neighborhood and Schools",
          description: "Investigate area amenities, crime rates, and school districts",
          category: "property",
          priority: "low",
        },
        {
          id: "plan-moving-costs",
          title: "Budget for Moving and Setup Costs",
          description: "Factor in moving expenses, utilities setup, and immediate repairs",
          category: "financial",
          priority: "low",
        },
        {
          id: "backup-financing",
          title: "Have Backup Financing Plan",
          description: "Prepare alternative financing in case assumption is denied",
          category: "financial",
          priority: "low",
        },
      ],
      [],
    )

    // Toggle item checked state
    const toggleItem = useCallback((itemId: string) => {
      setCheckedItems((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(itemId)) {
          newSet.delete(itemId)
        } else {
          newSet.add(itemId)
        }
        return newSet
      })
    }, [])

    // Calculate progress percentage
    const getProgressPercentage = useCallback((): number => {
      return Math.round((checkedItems.size / checklistItems.length) * 100)
    }, [checkedItems.size, checklistItems.length])

    // Get category theme
    const getCategoryTheme = useCallback((category: string): CategoryTheme => {
      switch (category) {
        case "financial":
          return {
            borderColor: "border-roots-icon-color",
            backgroundColor: "bg-roots-container-bg",
            textColor: "text-roots-text",
          }
        case "legal":
          return {
            borderColor: "border-red-500",
            backgroundColor: "bg-roots-container-bg",
            textColor: "text-roots-text",
          }
        case "property":
          return {
            borderColor: "border-green-500",
            backgroundColor: "bg-roots-container-bg",
            textColor: "text-roots-text",
          }
        case "lender":
          return {
            borderColor: "border-blue-500",
            backgroundColor: "bg-roots-container-bg",
            textColor: "text-roots-text",
          }
        default:
          return {
            borderColor: "border-roots-border-line",
            backgroundColor: "bg-roots-container-bg",
            textColor: "text-roots-text",
          }
      }
    }, [])

    // Get priority icon and styling
    const getPriorityIcon = useCallback((priority: string) => {
      switch (priority) {
        case "high":
          return {
            icon: "🔴",
            badge: "HIGH PRIORITY",
            badgeColor: "bg-red-500",
            badgeTextColor: "text-white",
          }
        case "medium":
          return {
            icon: "🟡",
            badge: "MEDIUM PRIORITY",
            badgeColor: "bg-orange-500",
            badgeTextColor: "text-white",
          }
        case "low":
          return {
            icon: "🟢",
            badge: "LOW PRIORITY",
            badgeColor: "bg-green-500",
            badgeTextColor: "text-white",
          }
        default:
          return {
            icon: "⚪",
            badge: "PRIORITY",
            badgeColor: "bg-roots-medium-gray",
            badgeTextColor: "text-roots-text",
          }
      }
    }, [])

    // Check if all items are completed
    const allItemsCompleted = useMemo(() => {
      return checkedItems.size === checklistItems.length
    }, [checkedItems.size, checklistItems.length])

    // Group items by category for better organization
    const itemsByCategory = useMemo(() => {
      const grouped = checklistItems.reduce(
        (acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = []
          }
          acc[item.category].push(item)
          return acc
        },
        {} as Record<string, ChecklistItem[]>,
      )

      // Sort items within each category by priority
      Object.keys(grouped).forEach((category) => {
        grouped[category].sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        })
      })

      return grouped
    }, [checklistItems])

    // Category display names
    const categoryNames = useMemo(
      () => ({
        financial: "Financial Considerations",
        legal: "Legal & Documentation",
        property: "Property Assessment",
        lender: "Lender Requirements",
      }),
      [],
    )

    // Check completion when items are checked
    useEffect(() => {
      const highPriorityItems = checklistItems.filter((item) => item.priority === "high")
      const completedHighPriority = highPriorityItems.filter((item) => checkedItems.has(item.id))

      // Require all high priority items to be completed
      if (completedHighPriority.length === highPriorityItems.length && onPageCompletion) {
        onPageCompletion(true)
      }
    }, [checkedItems, onPageCompletion, checklistItems])

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
              Buyer Due Diligence Checklist <span className="text-roots-icon-color">🧐</span>
            </h1>
            <p className="text-lg text-roots-dark-gray font-inter">
              Essential items to verify before proceeding with an assumable mortgage
            </p>
          </div>

          {/* Progress Section */}
          {checkedItems.size > 0 && (
            <div
              className="bg-roots-container-bg border border-roots-border-line rounded-xl p-6 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl text-roots-icon-color">📋</span>
                <h3 className="text-xl font-bold text-roots-text font-inter">Your Progress</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-roots-dark-gray font-inter">
                    {checkedItems.size} of {checklistItems.length} items completed
                  </span>
                  <span className="text-2xl font-bold text-roots-text font-inter">{getProgressPercentage()}%</span>
                </div>

                <div className="progress-enhanced">
                  <div
                    className="progress-fill transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>

                <p className="text-sm text-roots-dark-gray font-inter">
                  {allItemsCompleted
                    ? "Excellent! You've completed all due diligence items."
                    : "Keep going! Complete all items before proceeding with the assumption."}
                </p>
              </div>
            </div>
          )}

          {/* Checklist by Category */}
          <div className="space-y-8">
            {Object.entries(itemsByCategory).map(([category, items], categoryIndex) => (
              <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                <h3 className="text-xl font-bold text-roots-text font-inter mb-4">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item, itemIndex) => {
                    const isChecked = checkedItems.has(item.id)
                    const categoryTheme = getCategoryTheme(item.category)
                    const priorityInfo = getPriorityIcon(item.priority)

                    return (
                      <Card
                        key={item.id}
                        className={`card-enhanced cursor-pointer transition-all duration-300 p-6 animate-fade-in-up ${
                          isChecked
                            ? "border-roots-primary-accent bg-roots-primary-accent bg-opacity-10 scale-105"
                            : `${categoryTheme.borderColor} ${categoryTheme.backgroundColor} hover:bg-roots-light-gray`
                        }`}
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Checkbox */}
                          <div className="flex-shrink-0 mt-1">
                            {isChecked ? (
                              <CheckSquare className="w-6 h-6 text-roots-primary-accent" />
                            ) : (
                              <Square className="w-6 h-6 text-roots-medium-gray" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4
                                className={`font-bold font-inter ${
                                  isChecked ? "line-through text-roots-dark-gray" : categoryTheme.textColor
                                }`}
                              >
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 ml-2">
                                <span className="text-lg">{priorityInfo.icon}</span>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-bold ${priorityInfo.badgeColor} ${priorityInfo.badgeTextColor}`}
                                >
                                  {priorityInfo.badge}
                                </span>
                              </div>
                            </div>

                            <p
                              className={`text-sm font-inter ${
                                isChecked ? "line-through text-roots-dark-gray" : "text-roots-dark-gray"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Completion Message */}
          {allItemsCompleted && (
            <Card className="card-enhanced p-8 text-center mt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">🎉</span>
                  <h3 className="text-2xl font-bold text-roots-text font-inter">Congratulations!</h3>
                  <span className="text-4xl">🎉</span>
                </div>

                <p className="text-lg text-roots-text font-inter">
                  You've completed all due diligence items! You're now well-prepared to proceed with confidence in your
                  assumable mortgage transaction.
                </p>

                <div className="card-container p-4">
                  <p className="text-roots-text font-inter">
                    <strong>Next Steps:</strong> Review your findings with your real estate agent and lender to finalize
                    your assumption application and move toward closing.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(itemsByCategory).map(([category, items]) => {
              const completedInCategory = items.filter((item) => checkedItems.has(item.id)).length
              const categoryTheme = getCategoryTheme(category)

              return (
                <Card
                  key={category}
                  className={`card-enhanced p-4 text-center ${categoryTheme.borderColor} ${categoryTheme.backgroundColor}`}
                >
                  <div className="text-2xl font-bold text-roots-text font-inter">
                    {completedInCategory}/{items.length}
                  </div>
                  <div className="text-sm text-roots-dark-gray font-inter">
                    {categoryNames[category as keyof typeof categoryNames]}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-8 border-t border-roots-border-line">
            <div className="flex justify-between items-center">
              <EnhancedButton variant="secondary" onClick={onPrevPage}>
                ← Previous: Seller Risk
              </EnhancedButton>
              <div className="flex flex-col items-end gap-2">
                {!isCompleted && (
                  <div className="text-sm text-roots-dark-gray font-inter flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Complete all high priority items to continue
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
                      Next: Agent Role → <span className="ml-2 text-green-500">✓</span>
                    </>
                  ) : (
                    "Next: Agent Role →"
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

Page11_BuyerConsiderations.displayName = "Page11_BuyerConsiderations"
