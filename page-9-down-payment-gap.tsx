"use client"

import type React from "react"

import { memo, useState, useCallback, useMemo } from "react"
import { PageContainer } from "./page-container"
import { InfoModal } from "./info-modal"
import { Card } from "@/components/ui/card"
import { DollarSign, Home, Calculator } from "lucide-react"

interface GapItem {
  id: string
  title: string
  amount: number
  description: string
  detailedExplanation: string
  keyPoints: string[]
  examples: string[]
  tips: string[]
  barColor: string
  textColor: string
  icon: React.ReactNode
}

export const Page9_DownPaymentGap = memo(() => {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GapItem | null>(null)

  // Example scenario data
  const exampleData = useMemo(
    () => ({
      salePrice: 450000,
      loanBalance: 320000,
      downPayment: 130000,
    }),
    [],
  )

  // Gap calculation items
  const gapItems = useMemo(
    (): GapItem[] => [
      {
        id: "sale-price",
        title: "Sale Price",
        amount: exampleData.salePrice,
        description: "The agreed-upon purchase price of the property",
        detailedExplanation:
          "The sale price is the total amount you agree to pay for the property. This is negotiated between you and the seller and represents the current market value of the home. With assumable mortgages, sellers may command a premium due to the valuable low-rate financing.",
        keyPoints: [
          "Negotiated between buyer and seller",
          "Reflects current market conditions",
          "May include premium for assumable loan benefit",
          "Should be supported by comparable sales",
        ],
        examples: [
          "Home listed at $450,000 with 2.8% assumable loan",
          "Seller accepts $450,000 due to loan's value",
          "Comparable non-assumable homes selling for $430,000",
        ],
        tips: [
          "Factor in the value of the low interest rate when negotiating",
          "Get a comparative market analysis (CMA) from your agent",
          "Consider the total cost of ownership, not just purchase price",
        ],
        barColor: "bg-roots-icon-color",
        textColor: "text-roots-page-bg",
        icon: <Home className="w-6 h-6" />,
      },
      {
        id: "loan-balance",
        title: "Remaining Loan Balance",
        amount: exampleData.loanBalance,
        description: "The amount still owed on the existing mortgage",
        detailedExplanation:
          "This is the principal balance remaining on the original mortgage that you'll be assuming. The balance decreases over time as the current owner makes payments. The exact amount should be verified with the lender as it changes monthly.",
        keyPoints: [
          "Decreases with each monthly payment made",
          "Must be verified with current lender",
          "Determines the loan amount you'll assume",
          "Affects your loan-to-value ratio",
        ],
        examples: [
          "Original loan: $350,000 in 2020",
          "Current balance: $320,000 after 4 years",
          "Monthly principal reduction of ~$650",
        ],
        tips: [
          "Get the most current payoff statement from lender",
          "Account for any principal payments made during closing process",
          "Verify the exact balance on your intended closing date",
        ],
        barColor: "bg-roots-dark-gray",
        textColor: "text-roots-page-bg",
        icon: <DollarSign className="w-6 h-6" />,
      },
      {
        id: "down-payment",
        title: "Down Payment Gap",
        amount: exampleData.downPayment,
        description: "The cash you need to bridge the gap between sale price and loan balance",
        detailedExplanation:
          "The down payment gap is the difference between what you're paying for the house and what you're assuming in debt. This is the cash you need to bring to closing. Unlike traditional mortgages where you choose your down payment percentage, with assumptions the gap is predetermined by the existing loan balance.",
        keyPoints: [
          "Calculated as: Sale Price - Loan Balance",
          "Must be paid in cash at closing",
          "Cannot be financed with additional loans",
          "Represents your immediate equity in the property",
        ],
        examples: [
          "$450,000 sale price - $320,000 loan = $130,000 gap",
          "Equivalent to 29% down payment",
          "Immediate equity position in the property",
        ],
        tips: [
          "Ensure you have sufficient liquid funds available",
          "Factor in closing costs on top of the gap amount",
          "Consider gift funds if allowed by the lender",
        ],
        barColor: "bg-roots-primary-accent",
        textColor: "text-roots-text",
        icon: <Calculator className="w-6 h-6" />,
      },
    ],
    [exampleData],
  )

  // Format currency helper
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  // Handle item click
  const handleItemClick = useCallback((item: GapItem) => {
    setSelectedItem(item)
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedItem(null)
  }, [])

  // Calculate percentages for visual representation
  const maxAmount = useMemo(() => Math.max(...gapItems.map((item) => item.amount)), [gapItems])

  const getBarWidth = useCallback(
    (amount: number) => {
      return (amount / maxAmount) * 100
    },
    [maxAmount],
  )

  return (
    <PageContainer
      title="Understanding the Down Payment Gap"
      subtitle="How the cash requirement is calculated in assumable mortgage transactions"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Introduction */}
        <div className="text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl text-roots-icon-color">📉</span>
            <h2 className="text-2xl font-bold text-roots-text font-inter">The Cash Gap Explained</h2>
          </div>
          <p className="text-lg text-roots-dark-gray font-inter max-w-3xl mx-auto">
            Unlike traditional mortgages where you choose your down payment percentage, assumable mortgages require a
            specific cash amount determined by the gap between the sale price and remaining loan balance.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="space-y-8">
          {/* Gap Calculation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Sale Price Card */}
            <Card
              className="card-enhanced cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-300 animate-fade-in-up p-6"
              onClick={() => handleItemClick(gapItems[0])}
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="p-2 bg-roots-icon-color rounded-lg text-roots-page-bg">{gapItems[0].icon}</div>
                  <h3 className="text-lg font-bold text-roots-text font-inter">{gapItems[0].title}</h3>
                </div>

                <div className="space-y-3">
                  <div className="text-2xl font-bold text-roots-text font-inter">
                    {formatCurrency(gapItems[0].amount)}
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-roots-light-gray rounded-lg h-8 overflow-hidden">
                    <div
                      className={`h-full ${gapItems[0].barColor} ${gapItems[0].textColor} flex items-center justify-center font-bold text-sm font-inter transition-all duration-500`}
                      style={{ width: `${getBarWidth(gapItems[0].amount)}%` }}
                    >
                      100%
                    </div>
                  </div>

                  <p className="text-sm text-roots-dark-gray font-inter">{gapItems[0].description}</p>
                </div>
              </div>
            </Card>

            {/* Minus Operator */}
            <div className="flex justify-center">
              <div
                className="text-4xl font-bold text-roots-icon-color animate-bounce-in"
                style={{ animationDelay: "0.2s" }}
              >
                −
              </div>
            </div>

            {/* Loan Balance Card */}
            <Card
              className="card-enhanced cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-300 animate-fade-in-up p-6"
              style={{ animationDelay: "0.1s" }}
              onClick={() => handleItemClick(gapItems[1])}
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="p-2 bg-roots-dark-gray rounded-lg text-roots-page-bg">{gapItems[1].icon}</div>
                  <h3 className="text-lg font-bold text-roots-text font-inter">{gapItems[1].title}</h3>
                </div>

                <div className="space-y-3">
                  <div className="text-2xl font-bold text-roots-text font-inter">
                    {formatCurrency(gapItems[1].amount)}
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-roots-light-gray rounded-lg h-8 overflow-hidden">
                    <div
                      className={`h-full ${gapItems[1].barColor} ${gapItems[1].textColor} flex items-center justify-center font-bold text-sm font-inter transition-all duration-500`}
                      style={{ width: `${getBarWidth(gapItems[1].amount)}%` }}
                    >
                      {Math.round((gapItems[1].amount / gapItems[0].amount) * 100)}%
                    </div>
                  </div>

                  <p className="text-sm text-roots-dark-gray font-inter">{gapItems[1].description}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Equals Operator */}
          <div className="flex justify-center">
            <div
              className="text-4xl font-bold text-roots-icon-color animate-bounce-in"
              style={{ animationDelay: "0.4s" }}
            >
              =
            </div>
          </div>

          {/* Down Payment Gap Result */}
          <div className="flex justify-center">
            <Card
              className="card-enhanced cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-300 animate-fade-in-up p-8 max-w-md w-full"
              style={{ animationDelay: "0.2s" }}
              onClick={() => handleItemClick(gapItems[2])}
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="p-3 bg-roots-primary-accent rounded-lg text-roots-text">{gapItems[2].icon}</div>
                  <h3 className="text-xl font-bold text-roots-text font-inter">{gapItems[2].title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-bold text-roots-text font-inter">
                    {formatCurrency(gapItems[2].amount)}
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-roots-light-gray rounded-lg h-10 overflow-hidden">
                    <div
                      className={`h-full ${gapItems[2].barColor} ${gapItems[2].textColor} flex items-center justify-center font-bold text-lg font-inter transition-all duration-500`}
                      style={{ width: `${getBarWidth(gapItems[2].amount)}%` }}
                    >
                      {Math.round((gapItems[2].amount / gapItems[0].amount) * 100)}% Down
                    </div>
                  </div>

                  <p className="text-roots-dark-gray font-inter">{gapItems[2].description}</p>

                  <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-3">
                    <p className="text-sm text-roots-text font-inter font-medium">
                      This is the cash you need at closing
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Key Insights */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="bg-roots-container-bg border border-roots-border-line rounded-xl p-8">
            <h3 className="text-xl font-bold text-roots-text font-inter mb-6 text-center">Key Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-roots-text font-inter">Why This Matters</h4>
                <ul className="space-y-2 text-sm text-roots-dark-gray font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>The gap determines your required cash investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>You can't choose your down payment percentage like with new loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>Higher loan balances mean lower cash requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-primary-accent">•</span>
                    <span>The gap becomes your immediate equity in the property</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-roots-text font-inter">Planning Considerations</h4>
                <ul className="space-y-2 text-sm text-roots-dark-gray font-inter">
                  <li className="flex items-start gap-2">
                    <span className="text-roots-icon-color">•</span>
                    <span>Ensure you have sufficient liquid funds available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-icon-color">•</span>
                    <span>Factor in additional closing costs beyond the gap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-icon-color">•</span>
                    <span>Consider the total return on investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-roots-icon-color">•</span>
                    <span>Verify exact amounts with lender before closing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Example Scenarios */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <h3 className="text-xl font-bold text-roots-text font-inter mb-6 text-center">
            How Different Scenarios Affect Your Gap
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-4">
              <h4 className="font-bold text-roots-text font-inter mb-2">High Balance Scenario</h4>
              <div className="text-sm text-roots-dark-gray font-inter space-y-1">
                <div>Sale Price: $400,000</div>
                <div>Loan Balance: $360,000</div>
                <div className="font-bold text-roots-primary-accent">Gap: $40,000 (10%)</div>
              </div>
            </div>

            <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-4">
              <h4 className="font-bold text-roots-text font-inter mb-2">Medium Balance Scenario</h4>
              <div className="text-sm text-roots-dark-gray font-inter space-y-1">
                <div>Sale Price: $400,000</div>
                <div>Loan Balance: $280,000</div>
                <div className="font-bold text-roots-primary-accent">Gap: $120,000 (30%)</div>
              </div>
            </div>

            <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-4">
              <h4 className="font-bold text-roots-text font-inter mb-2">Low Balance Scenario</h4>
              <div className="text-sm text-roots-dark-gray font-inter space-y-1">
                <div>Sale Price: $400,000</div>
                <div>Loan Balance: $200,000</div>
                <div className="font-bold text-roots-primary-accent">Gap: $200,000 (50%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <InfoModal isOpen={showModal} onClose={handleCloseModal} title={selectedItem?.title || "Gap Component Details"}>
        {selectedItem && (
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Overview</h4>
              <p className="text-roots-dark-gray font-inter">{selectedItem.detailedExplanation}</p>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Key Points</h4>
              <ul className="space-y-2">
                {selectedItem.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-roots-dark-gray font-inter">
                    <span className="text-roots-primary-accent">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Examples</h4>
              <ul className="space-y-2">
                {selectedItem.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2 text-roots-dark-gray font-inter">
                    <span className="text-roots-icon-color">📋</span>
                    <span className="text-sm italic">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-bold text-roots-text mb-3 font-inter">Pro Tips</h4>
              <ul className="space-y-2">
                {selectedItem.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-roots-dark-gray font-inter">
                    <span className="text-roots-icon-color">💡</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amount Highlight */}
            <div className="bg-roots-light-gray border border-roots-border-line rounded-lg p-4">
              <h4 className="font-bold text-roots-text mb-2 font-inter">In This Example</h4>
              <div className="text-2xl font-bold text-roots-primary-accent font-inter">
                {formatCurrency(selectedItem.amount)}
              </div>
            </div>
          </div>
        )}
      </InfoModal>
    </PageContainer>
  )
})

Page9_DownPaymentGap.displayName = "Page9_DownPaymentGap"
