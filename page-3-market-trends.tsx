"use client"

import { useRef, useEffect, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Chart, registerables, type ChartConfiguration } from "chart.js"

Chart.register(...registerables)

interface Page3MarketTrendsProps {
  onNextPage?: () => void
  onPrevPage?: () => void
  onPageCompletion?: (completed: boolean) => void
  isCompleted?: boolean
}

interface MarketData {
  year: number
  rate: number
  condition: string
  description: string
  opportunity: string
  change: string
}

export function Page3_MarketTrends({
  onNextPage,
  onPrevPage,
  onPageCompletion,
  isCompleted = false,
}: Page3MarketTrendsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [selectedYear, setSelectedYear] = useState(2024)
  const [exploredYears, setExploredYears] = useState<Set<number>>(new Set([2024]))

  // Verified Freddie Mac 30-year fixed mortgage rates
  const marketData = useMemo<MarketData[]>(
    () => [
      {
        year: 2018,
        rate: 4.54,
        condition: "Stable Growth",
        description: "Moderate rates with steady market activity",
        opportunity: "Limited opportunities as rates were rising",
        change: "+0.8% from 2017",
      },
      {
        year: 2019,
        rate: 3.94,
        condition: "Buyer's Market",
        description: "Rates declined, creating favorable buying conditions",
        opportunity: "Emerging opportunities for future assumptions",
        change: "-0.6% from 2018",
      },
      {
        year: 2020,
        rate: 3.11,
        condition: "Historic Lows",
        description: "Pandemic-driven rate cuts created unprecedented opportunities",
        opportunity: "Prime loans for future assumption candidates",
        change: "-0.83% from 2019",
      },
      {
        year: 2021,
        rate: 2.96,
        condition: "Record Lows",
        description: "Lowest rates in modern history fueled buying frenzy",
        opportunity: "Golden era for assumable loan creation",
        change: "-0.15% from 2020",
      },
      {
        year: 2022,
        rate: 5.17,
        condition: "Rapid Rise",
        description: "Aggressive rate hikes to combat inflation",
        opportunity: "2020-2021 loans become highly valuable",
        change: "+2.21% from 2021",
      },
      {
        year: 2023,
        rate: 6.81,
        condition: "Elevated Rates",
        description: "Continued tightening created affordability challenges",
        opportunity: "Peak demand for low-rate assumptions",
        change: "+1.64% from 2022",
      },
      {
        year: 2024,
        rate: 6.75,
        condition: "Stabilizing",
        description: "Slight moderation but still elevated compared to recent history",
        opportunity: "Strong market for assumable transactions",
        change: "-0.06% from 2023",
      },
      {
        year: 2025,
        rate: 6.62,
        condition: "Projected Decline",
        description: "Expected gradual decline as economic conditions normalize",
        opportunity: "Continued strong demand for sub-4% assumptions",
        change: "-0.13% projected",
      },
    ],
    [],
  )

  const selectedData = useMemo(() => {
    return marketData.find((d) => d.year === selectedYear) || marketData[marketData.length - 1]
  }, [marketData, selectedYear])

  // Chart configuration
  const chartConfig = useMemo<ChartConfiguration<"line">>(
    () => ({
      type: "line",
      data: {
        labels: marketData.map((d) => d.year.toString()),
        datasets: [
          {
            label: "30-Year Fixed Rate",
            data: marketData.map((d) => d.rate),
            borderColor: "#CDFF64",
            backgroundColor: "rgba(205, 255, 100, 0.1)",
            pointBackgroundColor: "#CDFF64",
            pointBorderColor: "#303030",
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#303030",
            bodyColor: "#303030",
            borderColor: "#E0E0E0",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Year", color: "#303030" },
            ticks: { color: "#303030" },
            grid: { color: "rgba(224, 224, 224, 0.3)" },
          },
          y: {
            title: { display: true, text: "Interest Rate (%)", color: "#303030" },
            ticks: { color: "#303030", callback: (value) => `${value}%` },
            grid: { color: "rgba(224, 224, 224, 0.5)" },
            beginAtZero: false,
            min: 2,
            max: 8,
          },
        },
      },
    }),
    [marketData],
  )

  // Initialize chart
  useEffect(() => {
    if (!canvasRef.current) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(canvasRef.current, chartConfig)

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [chartConfig])

  const handleYearSelect = useCallback(
    (year: number) => {
      setSelectedYear(year)
      const newExploredYears = new Set([...exploredYears, year])
      setExploredYears(newExploredYears)

      // Check completion - user needs to explore at least 4 different years
      if (newExploredYears.size >= 4 && onPageCompletion) {
        onPageCompletion(true)
      }
    },
    [exploredYears, onPageCompletion],
  )

  const identificationTips = [
    "Look for properties purchased between 2019-2021 when rates were at historic lows",
    "Focus on FHA, VA, and USDA loans - these are typically assumable",
    "Check public records for original loan dates and amounts",
    "Network with real estate agents who specialize in assumable properties",
    "Use online databases and MLS systems that flag assumable loans",
    "Contact lenders directly to verify assumption eligibility",
  ]

  const mythsRealities = [
    {
      myth: "All mortgages are assumable",
      reality: "Only government-backed loans (FHA, VA, USDA) and some portfolio loans are typically assumable",
    },
    {
      myth: "You automatically qualify if you can afford the payments",
      reality: "Lenders still require full qualification including credit, income, and debt-to-income verification",
    },
    {
      myth: "The original borrower is released from liability immediately",
      reality: "Release of liability requires separate approval and isn't guaranteed",
    },
    {
      myth: "Assumable loans are easy to find",
      reality: "They require specialized knowledge and often aren't advertised as assumable",
    },
  ]

  return (
    <div className="min-h-screen bg-white font-inter">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-container p-8 mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#303030] mb-4">Market Trends & Timing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How historical rate movements impact assumable mortgage opportunities
          </p>
        </motion.div>

        {/* Key Insight Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-container p-6 mb-8 border-2 border-[#CDFF64]"
        >
          <h2 className="text-2xl font-bold text-[#303030] mb-3">💡 Key Insight</h2>
          <p className="text-lg text-gray-700">
            When current market rates exceed existing loan rates, assumable mortgages provide maximum savings and
            strategic timing.
          </p>
        </motion.div>

        {/* Main Visuals - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-container p-6"
          >
            <h3 className="text-xl font-bold text-[#303030] mb-4">Historical Interest Rate Trends</h3>
            <div className="h-80 w-full mb-4">
              <canvas ref={canvasRef} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <span className="text-red-600">🔥 Peak: </span>
                <span className="font-bold">2023: 6.81%</span>
              </div>
              <div className="text-center">
                <span className="text-blue-600">❄️ Low: </span>
                <span className="font-bold">2021: 2.96%</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Interactive Explorer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-container p-6"
          >
            <h3 className="text-xl font-bold text-[#303030] mb-4">Interactive Rate Explorer</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {marketData.map((data) => (
                <motion.button
                  key={data.year}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleYearSelect(data.year)}
                  className={`px-4 py-2 rounded font-medium transition-all ${
                    selectedYear === data.year
                      ? "bg-[#CDFF64] text-[#303030] shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {data.year}
                </motion.button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-[#CDFF64]">{selectedData.rate}%</div>
                  <div className="text-sm text-gray-600">Average Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-lg font-bold text-[#303030]">{selectedData.change}</div>
                  <div className="text-sm text-gray-600">Rate Change</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#303030] mb-2">Market Condition</h4>
                <p className="text-gray-700 text-sm">{selectedData.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#303030] mb-2">Assumable Opportunity</h4>
                <p className="text-gray-700 text-sm">{selectedData.opportunity}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How-To List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-container p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#303030] mb-6">How to Identify Assumable Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {identificationTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#CDFF64] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#303030]">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Myth vs Reality Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[#303030] mb-6 text-center">Common Misconceptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mythsRealities.map((item, index) => (
              <div key={index} className="card-container p-6 border-l-4 border-red-500">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-red-600 mb-2">❌ Myth:</h4>
                    <p className="text-gray-700 text-sm">{item.myth}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-600 mb-2">✅ Reality:</h4>
                    <p className="text-gray-700 text-sm">{item.reality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Line Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-container p-6 mb-8 bg-[#CDFF64] bg-opacity-10"
        >
          <h2 className="text-xl font-bold text-[#303030] mb-3">🎯 The Bottom Line</h2>
          <p className="text-gray-700">
            Historical rate trends reveal that assumable mortgages created between 2020-2021 offer exceptional value in
            today's market. Understanding these patterns helps identify the most profitable assumption opportunities and
            optimal timing strategies.
          </p>
        </motion.div>

        {/* Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "2023 Peak", value: "6.81%", color: "text-red-600" },
            { label: "2021 Historic Low", value: "2.96%", color: "text-blue-600" },
            { label: "Rate Spread", value: "3.85%", color: "text-[#CDFF64]" },
            { label: "Prime Opportunity", value: "2020-2021 loans", color: "text-green-600" },
          ].map((metric, index) => (
            <div key={index} className="card-container p-4 text-center">
              <div className={`text-xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation */}
        <nav
          className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200"
          role="navigation"
          aria-label="Lesson navigation"
        >
          <button
            onClick={onPrevPage}
            className="btn-secondary px-6 py-3 font-inter"
            aria-label="Go to previous lesson"
          >
            ← Previous: Introduction
          </button>

          <div className="flex flex-col items-end gap-2">
            {!isCompleted && (
              <div className="text-sm text-gray-600 font-inter flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                Explore {4 - exploredYears.size} more years to continue
              </div>
            )}
            <button
              onClick={onNextPage}
              disabled={!isCompleted}
              className={`btn-primary px-6 py-3 font-inter ${!isCompleted ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Go to next lesson"
            >
              {isCompleted ? (
                <>
                  Next: Calculator → <span className="ml-2 text-green-500">✓</span>
                </>
              ) : (
                "Next: Calculator →"
              )}
            </button>
          </div>
        </nav>
      </main>
    </div>
  )
}

// Named export

// Default export
export default Page3_MarketTrends
