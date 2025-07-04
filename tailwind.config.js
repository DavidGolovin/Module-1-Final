/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ENFORCE GLOBAL THEME - OVERRIDE ALL COLORS
        transparent: "transparent",
        current: "currentColor",

        // PRIMARY THEME COLORS
        white: "#FFFFFF",
        black: "#303030",
        primary: {
          DEFAULT: "#303030",
          foreground: "#CDFF64",
        },
        accent: {
          DEFAULT: "#CDFF64",
          foreground: "#303030",
        },

        // FORCE ALL COLOR SCALES TO USE THEME
        gray: {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        blue: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        green: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        red: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        yellow: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        purple: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        indigo: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },
        orange: {
          DEFAULT: "#303030",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#303030",
          600: "#303030",
          700: "#303030",
          800: "#303030",
          900: "#303030",
        },

        // Shadcn compatibility - force theme colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        // FORCE SQUARE CORNERS EVERYWHERE
        none: "0px",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "var(--radius)",
        "2xl": "var(--radius)",
        "3xl": "var(--radius)",
        full: "var(--radius)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // WHITE DROP SHADOWS
        sm: "0 1px 2px rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 4px 6px rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.1)",
        md: "0 6px 8px rgba(255, 255, 255, 0.8), 0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(255, 255, 255, 0.9), 0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(255, 255, 255, 0.9), 0 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(255, 255, 255, 0.95), 0 25px 50px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px rgba(255, 255, 255, 0.8)",
        none: "none",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleUp: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        progressFill: {
          from: { width: "0%" },
          to: { width: "var(--progress-width)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "scale-up": "scaleUp 0.4s ease-out forwards",
        "progress-fill": "progressFill 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
