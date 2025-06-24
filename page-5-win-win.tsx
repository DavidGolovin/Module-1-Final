"use client"

import { memo, useState, useEffect, useMemo } from "react"
import { PageContainer } from "./page-container"
import { BackgroundPattern } from "./background-pattern"
import { Card as MuiCard, Typography, Grid, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useTheme } from "@mui/material/styles"
import { TrendingUp, Users, Target, DollarSign } from "lucide-react"
import CheckCircle from "@mui/icons-material/CheckCircle" // Import CheckCircle

const StyledCard = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  textAlign: "center",
  fontFamily: "Inter, sans-serif",
}))

interface Page5_WinWinProps {
  onNextPage?: () => void
  onPrevPage?: () => void
}

export const Page5_WinWin = memo<Page5_WinWinProps>(({ onNextPage, onPrevPage }) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const theme = useTheme()

  // Trigger section animations on mount
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "buyer"])), 200),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "seller"])), 400),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "impact"])), 600),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "agents"])), 800),
      setTimeout(() => setVisibleSections((prev) => new Set([...prev, "conditions"])), 1000),
    ]

    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Static data arrays
  const buyerBenefits = useMemo(
    () => [
      {
        title: "Lower Interest Rates",
        description: "Access rates that may be 2-4% lower than current market rates",
        icon: <TrendingUp className="w-5 h-5 text-roots-icon-color" />,
      },
      {
        title: "Reduced Closing Costs",
        description: "Avoid many fees associated with new loan origination",
        icon: <DollarSign className="w-5 h-5 text-roots-icon-color" />,
      },
      {
        title: "Faster Closing Process",
        description: "Streamlined process with fewer requirements and faster approval",
        icon: <Target className="w-5 h-5 text-roots-icon-color" />,
      },
      {
        title: "Competitive Advantage",
        description: "Stand out in multiple offer situations with unique financing",
        icon: <CheckCircle className="w-5 h-5 text-roots-icon-color" />,
      },
    ],
    [],
  )

  const sellerBenefits = useMemo(
    () => [
      {
        title: "Faster Sale Process",
        description: "Qualified buyers with pre-approved assumption can close quickly",
        icon: <Target className="w-5 h-5 text-roots-icon-color" />,
      },
      {
        title: "Attract More Buyers",
        description: "Low-rate assumptions draw significant buyer interest",
        icon: <Users className="w-5 h-5 text-roots-icon-color" />,
      },
      {
        title: "Premium Pricing",
        description: "Command higher prices due to valuable financing terms",
        icon: <TrendingUp className="w-5 h-5 text-roots-icon-color" />,
      },
      {
        title: "Liability Release",
        description: "Potential release from mortgage obligation with proper approval",
        icon: <CheckCircle className="w-5 h-5 text-roots-icon-color" />,
      },
    ],
    [],
  )

  const realWorldStats = useMemo(
    () => [
      {
        number: "$847",
        label: "Average Monthly Savings",
        description: "Based on 3.2% vs 6.8% rate comparison",
        color: "text-roots-icon-color",
      },
      {
        number: "45%",
        label: "Faster Sale Time",
        description: "Assumable properties vs traditional listings",
        color: "text-roots-primary-accent",
      },
      {
        number: "$15,000",
        label: "Typical Closing Cost Savings",
        description: "Compared to new loan origination",
        color: "text-roots-text",
      },
      {
        number: "3x",
        label: "More Buyer Interest",
        description: "Properties with assumable loans",
        color: "text-roots-icon-color",
      },
    ],
    [],
  )

  const agentBenefits = useMemo(
    () => [
      {
        category: "Listing Advantages",
        benefits: [
          "Unique selling proposition for listings",
          "Faster sales and higher prices",
          "Reduced days on market",
          "Premium commission opportunities",
        ],
        borderColor: "border-roots-icon-color",
      },
      {
        category: "Buyer Representation",
        benefits: [
          "Help clients access better financing",
          "Competitive edge in offer situations",
          "Expanded inventory of opportunities",
          "Specialized expertise differentiation",
        ],
        borderColor: "border-roots-primary-accent",
      },
    ],
    [],
  )

  const marketConditions = useMemo(
    () => [
      {
        condition: "High Rate Environment",
        description: "When current rates are 2%+ higher than existing loans",
        benefits: ["Maximum savings potential for buyers", "Highest premium for sellers", "Greatest market demand"],
        emoji: "🔥",
        emojiColor: "text-red-700",
      },
      {
        condition: "Slow Market Conditions",
        description: "When traditional sales are sluggish",
        benefits: ["Assumable properties stand out", "Faster transaction times", "Motivated buyer pool"],
        emoji: "❄️",
        emojiColor: "text-roots-icon-color",
      },
    ],
    [],
  )

  return (
    <div className="relative">
      <BackgroundPattern pattern="hexagon" />
      <PageContainer
        title="The Win-Win-Win Scenario"
        subtitle="How assumable mortgages benefit buyers, sellers, and real estate professionals"
      >
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          {/* Introduction */}
          <div className="text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl text-roots-icon-color">✨</span>
              <h2 className="text-2xl font-bold text-roots-text font-inter">Everyone Wins</h2>
            </div>
            <p className="text-lg text-roots-dark-gray font-inter max-w-3xl mx-auto">
              Assumable mortgages create unique opportunities that benefit all parties involved in the transaction.
              Let's explore how buyers, sellers, and real estate agents can all come out ahead.
            </p>
          </div>

          {/* Buyer and Seller Benefits Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For the Buyer */}
            <div
              className={`card-enhanced border-2 border-roots-icon-color p-8 ${
                visibleSections.has("buyer") ? "animate-slide-in-left" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl text-roots-icon-color">🛍️</span>
                <h3 className="text-xl font-bold text-roots-text font-inter">For the Buyer</h3>
              </div>

              <div className="space-y-4">
                {buyerBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      visibleSections.has("buyer") ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 bg-roots-light-gray rounded-lg">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-roots-text font-inter mb-1">{benefit.title}</h4>
                      <p className="text-sm text-roots-dark-gray font-inter">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For the Seller */}
            <div
              className={`card-enhanced border-2 border-roots-primary-accent p-8 ${
                visibleSections.has("seller") ? "animate-slide-in-right" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl text-roots-icon-color">🏡</span>
                <h3 className="text-xl font-bold text-roots-text font-inter">For the Seller</h3>
              </div>

              <div className="space-y-4">
                {sellerBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      visibleSections.has("seller") ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 bg-roots-light-gray rounded-lg">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-roots-text font-inter mb-1">{benefit.title}</h4>
                      <p className="text-sm text-roots-dark-gray font-inter">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-World Impact */}
          <MuiCard
            className={`card-enhanced border border-roots-border-line p-8 ${
              visibleSections.has("impact") ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-roots-icon-color">💡</span>
              <h3 className="text-xl font-bold text-roots-text font-inter">Real-World Impact</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {realWorldStats.map((stat, index) => (
                <MuiCard
                  key={index}
                  className={`card-enhanced border border-roots-border-line p-6 text-center ${
                    visibleSections.has("impact") ? "animate-bounce-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`text-3xl font-bold ${stat.color} font-inter mb-2`}>{stat.number}</div>
                  <div className="text-sm font-bold text-roots-text font-inter mb-1">{stat.label}</div>
                  <div className="text-xs text-roots-dark-gray font-inter">{stat.description}</div>
                </MuiCard>
              ))}
            </div>
          </MuiCard>

          {/* Benefits for Real Estate Agents */}
          <div className={`${visibleSections.has("agents") ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-roots-icon-color">📊</span>
              <h3 className="text-xl font-bold text-roots-text font-inter">Benefits for Real Estate Agents</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agentBenefits.map((category, index) => (
                <MuiCard
                  key={index}
                  className={`card-enhanced border-2 ${category.borderColor} p-6 ${
                    visibleSections.has("agents") ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h4 className="text-lg font-bold text-roots-text font-inter mb-4">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2 text-sm text-roots-dark-gray font-inter">
                        <CheckCircleIcon className="w-4 h-4 text-roots-primary-accent flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </MuiCard>
              ))}
            </div>
          </div>

          {/* When Assumptions Shine Brightest */}
          <MuiCard
            className={`card-enhanced border border-roots-border-line p-8 ${
              visibleSections.has("conditions") ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-roots-icon-color">🎯</span>
              <h3 className="text-xl font-bold text-roots-text font-inter">When Assumptions Shine Brightest</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {marketConditions.map((condition, index) => (
                <div
                  key={index}
                  className={`${visibleSections.has("conditions") ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-2xl ${condition.emojiColor}`}>{condition.emoji}</span>
                    <h4 className="text-lg font-bold text-roots-text font-inter">{condition.condition}</h4>
                  </div>

                  <p className="text-roots-dark-gray font-inter mb-4">{condition.description}</p>

                  <ul className="space-y-2">
                    {condition.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2 text-sm text-roots-dark-gray font-inter">
                        <CheckCircleIcon className="w-4 h-4 text-roots-primary-accent flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MuiCard>

          {/* Key Takeaway */}
          <div
            className={`text-center ${visibleSections.has("conditions") ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="card-container p-8">
              <h4 className="text-lg font-bold text-roots-text font-inter mb-4">The Bottom Line</h4>
              <p className="text-roots-dark-gray font-inter max-w-3xl mx-auto">
                Assumable mortgages create a rare scenario where buyers save money, sellers get premium prices, and
                agents differentiate their services. Understanding how to identify and execute these opportunities is
                key to maximizing benefits for all parties involved.
              </p>
            </div>
          </div>

          {/* Collaboration, Negotiation, Compromise */}
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <StyledCard>
                <IconButton disabled sx={{ color: theme.palette.success.main, margin: "0 auto", display: "block" }}>
                  <CheckCircleIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Collaboration
                </Typography>
                <Typography variant="body2">Working together to achieve common goals and share success.</Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <IconButton disabled sx={{ color: theme.palette.success.main, margin: "0 auto", display: "block" }}>
                  <CheckCircleIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Negotiation
                </Typography>
                <Typography variant="body2">
                  Finding mutually agreeable solutions through open communication.
                </Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <IconButton disabled sx={{ color: theme.palette.success.main, margin: "0 auto", display: "block" }}>
                  <CheckCircleIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Compromise
                </Typography>
                <Typography variant="body2">
                  Making concessions to reach a balanced and satisfactory agreement.
                </Typography>
              </StyledCard>
            </Grid>
          </Grid>
          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-roots-border-line">
            <div className="flex justify-between items-center">
              <button
                onClick={onPrevPage}
                className="btn-secondary px-6 py-3 font-inter"
                aria-label="Go to previous lesson"
              >
                ← Previous: Calculator
              </button>
              <button onClick={onNextPage} className="btn-primary px-6 py-3 font-inter" aria-label="Go to next lesson">
                Next: Eligible Loans →
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
})

Page5_WinWin.displayName = "Page5_WinWin"
