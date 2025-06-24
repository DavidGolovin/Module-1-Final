"use client"

import type React from "react"

import { memo } from "react"
import { Search, Calendar, FileText, Users, Database, Phone } from "lucide-react"

interface OpportunityStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

export const AssumableOpportunitiesGuide = memo(() => {
  const steps: OpportunityStep[] = [
    {
      id: 1,
      title: "Look for properties purchased between 2019-2021",
      description: "Target homes bought when rates were at historic lows (2-4% range)",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Focus on FHA, VA, and USDA loans",
      description: "These government-backed loans are typically assumable by design",
      icon: <FileText className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      title: "Check public records for original loan dates",
      description: "Research property history to identify potential assumable mortgages",
      icon: <Search className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      title: "Network with specialized real estate agents",
      description: "Connect with agents who have experience in assumable properties",
      icon: <Users className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 5,
      title: "Use online databases and MLS systems",
      description: "Leverage technology platforms that flag assumable loan opportunities",
      icon: <Database className="w-6 h-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: 6,
      title: "Contact lenders directly",
      description: "Verify assumption eligibility and requirements with mortgage servicers",
      icon: <Phone className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#303030] font-inter">
            How to Identify Assumable Opportunities
          </h2>
          <span className="text-3xl">🎯</span>
        </div>
        <p className="text-lg text-gray-600 font-inter">
          Strategic approaches to finding properties with assumable mortgages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mb-2`}>
                  <div className={step.color}>{step.icon}</div>
                </div>
                <div className="w-12 h-8 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#303030] font-inter">{step.id}</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#303030] font-inter mb-2 leading-tight">{step.title}</h3>
                <p className="text-gray-600 font-inter text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500 font-inter">
                <span>
                  Step {step.id} of {steps.length}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: steps.length }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < step.id ? "bg-[#CDFF64]" : "bg-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="bg-white p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-bold text-[#303030] font-inter">Pro Tips for Success</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold text-[#303030] font-inter">Research Strategy</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-inter">
                <li className="flex items-start gap-2">
                  <span className="text-[#CDFF64] mt-1">•</span>
                  <span>Start with neighborhoods that saw high activity in 2020-2021</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CDFF64] mt-1">•</span>
                  <span>Look for first-time homebuyer areas (likely FHA loans)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CDFF64] mt-1">•</span>
                  <span>Check military communities for VA loan opportunities</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[#303030] font-inter">Verification Process</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-inter">
                <li className="flex items-start gap-2">
                  <span className="text-[#CDFF64] mt-1">•</span>
                  <span>Always confirm assumability with the current lender</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CDFF64] mt-1">•</span>
                  <span>Get written verification before making offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CDFF64] mt-1">•</span>
                  <span>Understand qualification requirements upfront</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <p className="text-[#303030] font-inter">
            <strong>Ready to start your search?</strong> Use these strategies systematically to identify the best
            assumable mortgage opportunities in your target market.
          </p>
        </div>
      </div>
    </div>
  )
})

AssumableOpportunitiesGuide.displayName = "AssumableOpportunitiesGuide"
