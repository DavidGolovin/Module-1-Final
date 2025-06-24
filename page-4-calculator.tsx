"use client"

import { memo, useState } from "react"
import { MortgageCalculator } from "./mortgage-calculator"

interface Page4_CalculatorProps {
  onNextPage?: () => void
  onPrevPage?: () => void
  onPageCompletion?: (completed: boolean) => void
  isCompleted?: boolean
}

export const Page4_Calculator = memo<Page4_CalculatorProps>(
  ({ onNextPage, onPrevPage, onPageCompletion, isCompleted = false }) => {
    const [hasCalculated, setHasCalculated] = useState(false)

    const handleCalculationComplete = () => {
      if (!hasCalculated) {
        setHasCalculated(true)
        onPageCompletion?.(true)
      }
    }

    return (
      <div className="container mx-auto px-4 py-8 font-inter">
        <div className="global-container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary font-inter mb-4">Lesson 4: Mortgage Payment Calculator</h1>
            <p className="text-gray-600 font-inter max-w-2xl mx-auto">
              Learn to calculate mortgage payments for assumable loans. This is an essential skill for evaluating
              assumable mortgage opportunities and understanding the financial benefits.
            </p>
          </div>

          <MortgageCalculator onCalculationComplete={handleCalculationComplete} />

          {/* Educational Content */}
          <div className="mt-8 card-container p-6">
            <h3 className="text-xl font-bold text-primary font-inter mb-4">
              Understanding Assumable Mortgage Calculations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 font-inter">
              <div>
                <h4 className="font-bold text-primary mb-2">Key Components:</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>Principal:</strong> Loan amount minus down payment
                  </li>
                  <li>
                    • <strong>Interest Rate:</strong> Annual rate divided by 12 months
                  </li>
                  <li>
                    • <strong>Term:</strong> Total number of monthly payments
                  </li>
                  <li>
                    • <strong>Monthly Payment:</strong> Fixed amount paid each month
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-2">Assumable Loan Advantage:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Assume existing low interest rates</li>
                  <li>• Avoid current higher market rates</li>
                  <li>• Reduce total interest paid over loan term</li>
                  <li>• Lower monthly payments = better cash flow</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {isCompleted && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onPrevPage}
                className="btn-secondary px-6 py-3 font-inter"
                aria-label="Go to previous lesson"
              >
                ← Previous: Market Trends
              </button>
              <button onClick={onNextPage} className="btn-primary px-6 py-3 font-inter" aria-label="Go to next lesson">
                Next: Win-Win Scenario →
              </button>
            </div>
          )}
        </div>
      </div>
    )
  },
)

Page4_Calculator.displayName = "Page4_Calculator"
