import type { Config } from "tailwindcss";

const config = {
  important: true,
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    backgroundSize: {
      highlight: "200% 100%",
    },
    backgroundPosition: {
      highlight: "100% 0",
    },
    backgroundImage: {
      highlight:
        "linear-gradient(90deg, var(--secondary) 50%, rgba(255, 255, 255, 0) 50%)",
    },
    extend: {
      colors: {
        "cream-lighter": "var(--cream-50)",
        "cream-light": "var(--cream-100)",
        cream: "var(--cream-200)",
        "cream-dark": "var(--cream-900)",
        "cream-darker": "var(--cream-950)",
        "purple-light": "var(--purple-200)",
        "purple-medium": "var(--purple-400)",
        "purple-medium-dark": "var(--purple-800)",
        purple: "var(--purple-900)",
        "purple-dark": "var(--purple-950)",
        "purple-darker": "var(--purple-1000)",
        cyan: "var(--cyan-400)",
        "cyan-dark": "var(--cyan-700)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          hover: "var(--secondary-hover)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        highlight: {
          to: {
            "background-position": "0 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        highlight: "highlight 1s 1 normal forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
} satisfies Config;

export default config;
