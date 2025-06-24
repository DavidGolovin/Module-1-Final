"use client"

import { memo } from "react"

interface OpportunityItem {
  id: number
  text: string
  icon: string
  color: string
}

export const AssumableOpportunitiesList = memo(() => {
  const opportunities: OpportunityItem[] = [
    {
      id: 1,
      text: "Look for properties purchased between 2019-2021 when rates were at historic lows",
      icon: "📅",
      color: "text-blue-600",
    },
    {
      id: 2,
      text: "Focus on FHA, VA, and USDA loans - these are typically assumable",
      icon: "🏛️",
      color: "text-green-600",
    },
    {
      id: 3,
      text: "Check public records for original loan dates and amounts",
      icon: "🔍",
      color: "text-purple-600",
    },
    {
      id: 4,
      text: "Network with real estate agents who specialize in assumable properties",
      icon: "🤝",
      color: "text-orange-600",
    },
    {
      id: 5,
      text: "Use online databases and MLS systems that flag assumable loans",
      icon: "💻",
      color: "text-indigo-600",
    },
    {
      id: 6,
      text: "Contact lenders directly to verify assumption eligibility",
      icon: "📞",
      color: "text-red-600",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#303030] font-inter mb-2">
          🎯 How to Identify Assumable Opportunities 🎯
        </h2>
        <p className="text-gray-600 font-inter">Your step-by-step guide to finding assumable mortgage opportunities</p>
      </div>

      <div className="bg-white p-8 border border-gray-200 shadow-sm">
        <ul className="space-y-6">
          {opportunities.map((item, index) => (
            <li
              key={item.id}
              className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className={`text-xl font-bold ${item.color} font-inter min-w-[24px]`}>{item.id}</span>
              </div>

              <div className="flex-1">
                <p className="text-[#303030] font-inter text-base leading-relaxed">{item.text}</p>
              </div>

              <div className="flex-shrink-0 opacity-30">
                <div className={`w-2 h-2 rounded-full bg-current ${item.color}`}></div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 justify-center">
            <span className="text-xl">💡</span>
            <p className="text-gray-600 font-inter text-sm italic">
              <strong>Pro Tip:</strong> Start with steps 1-3 to build your target list, then use steps 4-6 to verify and
              pursue opportunities!
            </p>
            <span className="text-xl">✨</span>
          </div>
        </div>
      </div>
    </div>
  )
})

AssumableOpportunitiesList.displayName = "AssumableOpportunitiesList"
