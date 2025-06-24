"use client"

import { memo, useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"

interface SuccessBurstProps {
  show: boolean
  message?: string
  onComplete?: () => void
}

export const SuccessBurst = memo<SuccessBurstProps>(({ show, message = "Success!", onComplete }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-success-burst bg-roots-primary-accent text-roots-text px-8 py-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="font-bold font-inter text-lg">{message}</span>
        </div>
      </div>
    </div>
  )
})

SuccessBurst.displayName = "SuccessBurst"
