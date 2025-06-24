"use client"

import { useState, useCallback } from "react"

interface MortgageCalculatorProps {
  onCalculationComplete?: () => void
}

export function MortgageCalculator({ onCalculationComplete }: MortgageCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [termYears, setTermYears] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [results, setResults] = useState<{
    monthlyPayment: number
    totalInterest: number
    totalPayment: number
    principalAmount: number
  } | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)

  const calculateMortgage = useCallback(() => {
    const principal = Number.parseFloat(loanAmount) - Number.parseFloat(downPayment || "0")
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12
    const numberOfPayments = Number.parseFloat(termYears) * 12

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      alert("Please enter valid positive numbers for all fields")
      return
    }

    // Monthly payment formula: M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1]
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal

    setResults({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      principalAmount: principal,
    })

    if (!hasCalculated) {
      setHasCalculated(true)
      onCalculationComplete?.()
    }
  }, [loanAmount, interestRate, termYears, downPayment, hasCalculated, onCalculationComplete])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const clearCalculator = useCallback(() => {
    setLoanAmount("")
    setInterestRate("")
    setTermYears("")
    setDownPayment("")
    setResults(null)
  }, [])

  return (
    <div className="card-container p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary font-inter mb-2">Assumable Mortgage Payment Calculator</h2>
        <p className="text-gray-600 font-inter">
          Calculate monthly payments and total interest for assumable mortgages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="loanAmount" className="block text-primary text-sm font-bold mb-2 font-inter">
              Loan Amount
            </label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g., 400000"
              className="input-field w-full"
              aria-label="Enter the total loan amount in dollars"
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-primary text-sm font-bold mb-2 font-inter">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 3.5"
              step="0.01"
              className="input-field w-full"
              aria-label="Enter the annual interest rate as a percentage"
            />
          </div>

          <div>
            <label htmlFor="termYears" className="block text-primary text-sm font-bold mb-2 font-inter">
              Term (Years)
            </label>
            <input
              type="number"
              id="termYears"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              placeholder="e.g., 30"
              className="input-field w-full"
              aria-label="Enter the loan term in years"
            />
          </div>

          <div>
            <label htmlFor="downPayment" className="block text-primary text-sm font-bold mb-2 font-inter">
              Down Payment
            </label>
            <input
              type="number"
              id="downPayment"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 80000"
              className="input-field w-full"
              aria-label="Enter the down payment amount in dollars"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={calculateMortgage}
              className="bg-black text-[#CDFF64] font-bold py-3 px-6 hover:bg-gray-800 transition-colors font-inter flex-1"
              aria-label="Calculate mortgage payment"
            >
              Calculate Payment
            </button>
            <button onClick={clearCalculator} className="btn-secondary py-3 px-4" aria-label="Clear all fields">
              Clear
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary font-inter">Calculation Results</h3>

          <div className="space-y-3" aria-live="polite" aria-atomic="true">
            {results ? (
              <>
                <div className="bg-green-50 border border-green-200 p-4">
                  <div className="text-sm text-green-600 font-medium font-inter">Monthly Payment</div>
                  <div className="text-2xl font-bold text-green-800 font-inter">
                    {formatCurrency(results.monthlyPayment)}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4">
                  <div className="text-sm text-blue-600 font-medium font-inter">Principal Amount</div>
                  <div className="text-lg font-bold text-blue-800 font-inter">
                    {formatCurrency(results.principalAmount)}
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4">
                  <div className="text-sm text-orange-600 font-medium font-inter">Total Interest</div>
                  <div className="text-lg font-bold text-orange-800 font-inter">
                    {formatCurrency(results.totalInterest)}
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4">
                  <div className="text-sm text-purple-600 font-medium font-inter">Total Payment</div>
                  <div className="text-lg font-bold text-purple-800 font-inter">
                    {formatCurrency(results.totalPayment)}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600 font-inter">
                    💡 <strong>Assumable Loan Benefit:</strong> If this were an assumable loan at a lower rate than
                    current market rates, you could save significantly on interest payments!
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500 font-inter">
                <div className="text-4xl mb-2">🏠</div>
                <p>Enter loan details and click "Calculate Payment" to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasCalculated && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200">
          <p className="text-green-800 font-inter font-medium text-center">
            🎉 Great! You've learned how to calculate assumable mortgage payments. This is a key skill for evaluating
            assumable loan opportunities!
          </p>
        </div>
      )}
    </div>
  )
}
