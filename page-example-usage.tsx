"use client"

import { AssumableOpportunitiesGuide } from "./assumable-opportunities-guide"

// Example of how to use it in your lesson content
export function ExampleLessonWithGuide() {
  return (
    <section className="min-h-screen bg-roots-page-bg font-inter text-roots-text">
      <div className="container mx-auto px-4 py-8">
        {/* Your existing lesson content */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Finding Assumable Properties</h1>
          <p className="text-lg text-roots-dark-gray mb-8">
            Learn the proven strategies for identifying assumable mortgage opportunities in today's market.
          </p>
        </div>

        {/* Enhanced Assumable Opportunities Guide */}
        <AssumableOpportunitiesGuide />

        {/* Continue with rest of your lesson content */}
      </div>
    </section>
  )
}
