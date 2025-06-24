"use client"

import { memo, type ReactNode } from "react"
import { X } from "lucide-react"
import { EnhancedButton } from "./enhanced-button"

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const InfoModal = memo<InfoModalProps>(({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-roots-page-bg rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up">
        <div className="flex items-center justify-between p-6 border-b border-roots-border-line">
          <h2 className="text-xl font-bold text-roots-text font-inter">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-roots-container-bg rounded-lg transition-colors">
            <X className="w-5 h-5 text-roots-text" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        <div className="p-6 border-t border-roots-border-line">
          <EnhancedButton onClick={onClose} className="ml-auto block">
            Close
          </EnhancedButton>
        </div>
      </div>
    </div>
  )
})

InfoModal.displayName = "InfoModal"
