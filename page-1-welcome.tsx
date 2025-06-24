"use client"

import type React from "react"
import { memo, useState, useCallback } from "react"
import { PageContainer } from "./page-container"
import { User, Loader2, CheckCircle } from "lucide-react"

interface Page1_WelcomeProps {
  onUserNameConfirmed: (confirmed: boolean, name: string) => void
  onAdvanceToNextPage: () => void
  userName: string
  isCompleted?: boolean
}

interface FormData {
  firstName: string
  lastName: string
  licenseNumber: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  licenseNumber?: string
}

export const Page1_Welcome = memo<Page1_WelcomeProps>(
  ({ onUserNameConfirmed, onAdvanceToNextPage, userName, isCompleted }) => {
    const [formData, setFormData] = useState<FormData>({
      firstName: "",
      lastName: "",
      licenseNumber: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(!!userName)

    // Validation regex for names (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-']+$/

    const validateField = useCallback(
      (field: keyof FormData, value: string): string | undefined => {
        switch (field) {
          case "firstName":
          case "lastName":
            if (value.length < 2) {
              return `${field === "firstName" ? "First" : "Last"} name must be at least 2 characters`
            }
            if (!nameRegex.test(value)) {
              return "Name can only contain letters, spaces, hyphens, and apostrophes"
            }
            return undefined
          case "licenseNumber":
            if (!value.trim()) {
              return "License number is required"
            }
            if (value.trim().length < 3) {
              return "License number must be at least 3 characters"
            }
            return undefined
          default:
            return undefined
        }
      },
      [nameRegex],
    )

    const validateForm = useCallback((): boolean => {
      const newErrors: FormErrors = {}
      let isValid = true

      Object.keys(formData).forEach((key) => {
        const field = key as keyof FormData
        const error = validateField(field, formData[field])
        if (error) {
          newErrors[field] = error
          isValid = false
        }
      })

      setErrors(newErrors)
      return isValid
    }, [formData, validateField])

    const handleInputChange = useCallback(
      (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Real-time validation
        const error = validateField(field, value)
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }))
      },
      [validateField],
    )

    const simulateApiCall = useCallback(async (): Promise<boolean> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Always return success for demo
      return true
    }, [])

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
          return
        }

        setIsLoading(true)

        try {
          const success = await simulateApiCall()

          if (success) {
            const fullName = `${formData.firstName} ${formData.lastName}`
            setIsConfirmed(true)
            onUserNameConfirmed(true, fullName)
          } else {
            setErrors({
              licenseNumber: "Unable to verify license number. Please try again.",
            })
          }
        } catch (error) {
          setErrors({
            licenseNumber: "An error occurred. Please try again.",
          })
        } finally {
          setIsLoading(false)
        }
      },
      [formData, validateForm, simulateApiCall, onUserNameConfirmed],
    )

    const handleChangeName = useCallback(() => {
      setIsConfirmed(false)
      setFormData({
        firstName: "",
        lastName: "",
        licenseNumber: "",
      })
      setErrors({})
      onUserNameConfirmed(false, "")
    }, [onUserNameConfirmed])

    const handleContinue = useCallback(() => {
      onAdvanceToNextPage()
    }, [onAdvanceToNextPage])

    const isFormValid =
      formData.firstName.trim().length >= 2 &&
      formData.lastName.trim().length >= 2 &&
      formData.licenseNumber.trim().length >= 3 &&
      Object.values(errors).every((error) => !error)

    if (isConfirmed && userName) {
      return (
        <PageContainer>
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Confirmed Welcome Section */}
            <div className="text-center animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-4 bg-[#CDFF64] rounded-full">
                  <User className="w-8 h-8 text-[#303030]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#303030] font-inter">
                  Welcome, {userName}! <span className="text-[#303030]">👋</span>
                </h1>
              </div>
              <p className="text-lg text-[#303030] font-inter mb-8">
                Great! Your information has been confirmed. You're all set to begin your learning journey.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={handleChangeName}
                className="px-6 py-3 border border-[#303030] text-[#303030] rounded-lg hover:bg-[#303030] hover:text-white transition-colors font-inter font-medium"
              >
                Change Name
              </button>
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-[#CDFF64] text-[#303030] rounded-lg hover:bg-[#B8E55C] transition-colors font-inter font-medium text-lg"
              >
                Continue to Course
              </button>
            </div>

            {/* Success Indicator */}
            <div
              className="flex items-center justify-center gap-2 text-green-600 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-inter font-medium">Profile Confirmed</span>
            </div>

            {/* Navigation - Bottom of page */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={handleContinue}
                  className="px-8 py-3 bg-[#CDFF64] text-[#303030] rounded-lg hover:bg-[#B8E55C] transition-colors font-inter font-medium text-lg"
                >
                  Next: Introduction →
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      )
    }

    return (
      <PageContainer>
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold font-inter mb-4 text-[#303030]">
              Welcome to Roots! <span className="text-[#303030]">👋</span>
            </h1>
            <p className="text-lg font-inter mb-2 text-[#303030]">
              We're excited to have you join our learning community!
            </p>
            <p className="font-inter text-[#303030]">
              Please provide your information below to get started with your personalized learning experience.
            </p>
          </div>

          {/* Registration Form */}
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="relative">
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#303030] mb-2 font-inter">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#CDFF64] focus:border-transparent transition-colors ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#303030]" />
                  </div>
                  {errors.firstName && <p className="mt-1 text-sm text-red-600 font-inter">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="relative">
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#303030] mb-2 font-inter">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#CDFF64] focus:border-transparent transition-colors ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#303030]" />
                  </div>
                  {errors.lastName && <p className="mt-1 text-sm text-red-600 font-inter">{errors.lastName}</p>}
                </div>
              </div>

              {/* License Number */}
              <div className="relative">
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-[#303030] mb-2 font-inter">
                  License Number
                </label>
                <div className="relative">
                  <input
                    id="licenseNumber"
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    placeholder="Enter your license number"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#CDFF64] focus:border-transparent transition-colors ${
                      errors.licenseNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#303030]" />
                </div>
                {errors.licenseNumber && <p className="mt-1 text-sm text-red-600 font-inter">{errors.licenseNumber}</p>}
              </div>

              {/* Real-time Validation Feedback */}
              {formData.firstName && !errors.firstName && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-inter">
                  <CheckCircle className="w-4 h-4" />
                  <span>First name looks good!</span>
                </div>
              )}

              {formData.lastName && !errors.lastName && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-inter">
                  <CheckCircle className="w-4 h-4" />
                  <span>Last name looks good!</span>
                </div>
              )}

              {formData.licenseNumber && !errors.licenseNumber && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-inter">
                  <CheckCircle className="w-4 h-4" />
                  <span>License number provided!</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`w-full px-8 py-3 rounded-lg font-inter font-medium text-lg transition-colors ${
                    !isFormValid || isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#CDFF64] text-[#303030] hover:bg-[#B8E55C]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying Information...
                    </span>
                  ) : (
                    "Start Course"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div
            className="text-center text-sm font-inter animate-fade-in-up text-[#303030]"
            style={{ animationDelay: "0.4s" }}
          >
            <p>Your information is secure and will only be used to personalize your learning experience.</p>
          </div>
        </div>
      </PageContainer>
    )
  },
)

Page1_Welcome.displayName = "Page1_Welcome"
