"use client"

import { memo, useRef, useEffect, useMemo, useState } from "react"
import { PageContainer } from "./page-container"
import { Chart, type ChartConfiguration, registerables } from "chart.js"
import { Button } from "@/components/ui/button"

// Register Chart.js components
Chart.register(...registerables)

interface Page2_IntroductionProps {
  onNextPage?: () => void
  onPrevPage?: () => void
  onPageCompletion?: (completed: boolean) => void
  isCompleted?: boolean
}

export const Page2_Introduction = memo<Page2_IntroductionProps>(
  ({ onNextPage, onPrevPage, onPageCompletion, isCompleted = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const chartRef = useRef<Chart | null>(null)
    const [hasReadContent, setHasReadContent] = useState(false)
    const [timeSpent, setTimeSpent] = useState(0)

    // Track reading time
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(timer)
    }, [])

    // Mark as completed after 30 seconds of reading
    useEffect(() => {
      if (timeSpent >= 30 && !hasReadContent) {
        setHasReadContent(true)
        onPageCompletion?.(true)
      }
    }, [timeSpent, hasReadContent, onPageCompletion])

    // Chart configuration with themed colors
    const chartConfig = useMemo((): ChartConfiguration<"bar"> => {
      return {
        type: "bar",
        data: {
          labels: ["Typical New Mortgage", "Example Assumable Mortgage"],
          datasets: [
            {
              data: [6.81, 2.96],
              backgroundColor: [
                "rgba(48, 48, 48, 1)", // roots-text color
                "rgba(205, 255, 100, 1)", // roots-primary-accent color
              ],
              borderColor: [
                "rgba(48, 48, 48, 1)", // roots-text color
                "rgba(48, 48, 48, 1)", // roots-text color
              ],
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              titleColor: "rgba(48, 48, 48, 1)",
              bodyColor: "rgba(48, 48, 48, 1)",
              borderColor: "rgba(224, 224, 224, 1)",
              borderWidth: 1,
              titleFont: {
                family: "Inter, sans-serif",
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                family: "Inter, sans-serif",
                size: 13,
              },
              callbacks: {
                label: (context) => {
                  return `Interest Rate: ${context.parsed.x}%`
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 8,
              ticks: {
                color: "rgba(48, 48, 48, 1)",
                font: {
                  family: "Inter, sans-serif",
                  size: 12,
                },
                callback: (value) => `${value}%`,
              },
              grid: {
                color: "rgba(224, 224, 224, 0.5)",
              },
              border: {
                color: "rgba(224, 224, 224, 1)",
              },
              title: {
                display: true,
                text: "Interest Rate (%)",
                color: "rgba(48, 48, 48, 1)",
                font: {
                  family: "Inter, sans-serif",
                  size: 14,
                  weight: "bold",
                },
              },
            },
            y: {
              ticks: {
                color: "rgba(48, 48, 48, 1)",
                font: {
                  family: "Inter, sans-serif",
                  size: 12,
                },
              },
              grid: {
                color: "rgba(224, 224, 224, 0.3)",
              },
              border: {
                color: "rgba(224, 224, 224, 1)",
              },
            },
          },
        },
      }
    }, [])

    // Create and destroy chart
    useEffect(() => {
      if (!canvasRef.current) return

      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy()
      }

      // Create new chart
      chartRef.current = new Chart(canvasRef.current, chartConfig)

      // Cleanup function
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy()
          chartRef.current = null
        }
      }
    }, [chartConfig])

    const handleNextPage = () => {
      if (isCompleted && onNextPage) {
        onNextPage()
      }
    }

    return (
      <PageContainer
        title="What is an Assumable Loan?"
        subtitle="Understanding the basics of mortgage assumption and its benefits"
      >
        <div
          className="max-w-4xl mx-auto space-y-8"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "0",
            boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.5)",
            padding: "20px",
            fontFamily: "Inter, sans-serif",
            color: "#303030",
          }}
        >
          {/* Introduction Section */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl text-roots-icon-color">🤔</span>
              <h2 className="text-2xl font-bold text-roots-text font-inter">Let's Start with the Basics</h2>
            </div>

            <div className="space-y-4 text-roots-dark-gray font-inter leading-relaxed">
              <p className="text-lg">
                An <strong className="text-roots-text">assumable loan</strong> is a type of mortgage that allows a
                qualified buyer to take over the existing mortgage payments and terms from the current homeowner, rather
                than obtaining a brand new mortgage.
              </p>

              <p>
                When you assume a loan, you essentially "step into the shoes" of the original borrower, taking on their
                remaining mortgage balance, interest rate, and payment terms. This can be incredibly beneficial in
                certain market conditions.
              </p>
            </div>
          </div>

          {/* Primary Benefit Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-roots-container-bg border border-roots-border-line rounded-xl p-8">
              <h3 className="text-xl font-bold text-roots-text font-inter mb-4">
                The Primary Benefit: Lower Interest Rates
              </h3>

              <div className="space-y-4 text-roots-dark-gray font-inter">
                <p>
                  The most significant advantage of assumable loans is the potential to secure a
                  <strong className="text-roots-text"> much lower interest rate</strong> than what's currently available
                  in the market.
                </p>

                <p>
                  If the original mortgage was obtained when interest rates were lower, you could save
                  <strong className="text-roots-text"> thousands of dollars</strong> over the life of the loan by
                  assuming that lower rate instead of getting a new mortgage at today's higher rates.
                </p>
              </div>
            </div>
          </div>

          {/* Interest Rate Comparison Chart */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-bold text-roots-text font-inter mb-6">Interest Rate Comparison Example</h3>

            <div className="bg-roots-container-bg p-6 rounded-lg shadow-md border border-roots-border-line">
              <div className="mb-4">
                <p className="text-roots-dark-gray font-inter text-sm">
                  Here's a real-world example showing the potential savings with an assumable mortgage:
                </p>
              </div>

              <div className="h-64 w-full">
                <canvas ref={canvasRef} />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-roots-text rounded"></div>
                  <span className="text-roots-dark-gray font-inter">
                    <strong>Typical New Mortgage:</strong> 6.81% APR
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-roots-primary-accent rounded"></div>
                  <span className="text-roots-dark-gray font-inter">
                    <strong>Example Assumable:</strong> 2.96% APR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Explanation */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="bg-roots-light-gray border border-roots-border-line rounded-xl p-6">
              <h4 className="text-lg font-bold text-roots-text font-inter mb-3">What This Means for You</h4>

              <div className="space-y-3 text-roots-dark-gray font-inter">
                <p>In this example, the difference between a 6.81% rate and a 2.96% rate could save you:</p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-roots-text">Hundreds of dollars</strong> in monthly payments
                  </li>
                  <li>
                    <strong className="text-roots-text">Tens of thousands</strong> over the life of the loan
                  </li>
                  <li>
                    <strong className="text-roots-text">Significant equity building</strong> opportunities
                  </li>
                </ul>

                <p className="mt-4 text-sm bg-roots-page-bg p-3 rounded border border-roots-border-line">
                  <strong>Note:</strong> This is just one example. Actual rates and savings will vary based on the
                  specific loan, market conditions, and your financial situation.
                </p>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <div className="text-center bg-roots-primary-accent bg-opacity-20 border border-roots-primary-accent rounded-xl p-6">
              <h4 className="text-lg font-bold text-roots-text font-inter mb-2">Key Takeaway</h4>
              <p className="text-roots-dark-gray font-inter">
                Assumable loans can provide substantial savings when market rates are higher than the original loan's
                rate. Understanding how to identify and qualify for these opportunities is crucial for maximizing your
                real estate investment potential.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="animate-fade-in-up" style={{ animationDelay: "1.0s" }}>
            <div className="flex justify-between items-center pt-8 border-t border-roots-border-line">
              <Button variant="secondary" onClick={onPrevPage}>
                ← Previous: Welcome
              </Button>
              <div className="flex flex-col items-end gap-2">
                {!isCompleted && (
                  <div className="text-sm text-roots-dark-gray font-inter flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Keep reading to unlock next page ({Math.max(0, 30 - timeSpent)}s remaining)
                  </div>
                )}
                <Button
                  onClick={handleNextPage}
                  size="lg"
                  disabled={!isCompleted}
                  className={!isCompleted ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {isCompleted ? (
                    <>
                      Next: Market Trends → <span className="ml-2 text-green-500">✓</span>
                    </>
                  ) : (
                    "Next: Market Trends →"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    )
  },
)

Page2_Introduction.displayName = "Page2_Introduction"
