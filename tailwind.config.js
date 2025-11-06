/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80e1ff',
          300: '#4dd6ff',
          400: '#26ceff',
          500: '#00d2ff',  // Main cyan
          600: '#00b8e6',
          700: '#009acc',
          800: '#007cb3',
          900: '#005e99',
        },
        secondary: {
          50: '#e8f0fe',
          100: '#c5d9fc',
          200: '#9ebffa',
          300: '#77a5f8',
          400: '#5a91f6',
          500: '#3a7bd5',  // Secondary blue
          600: '#2d66c0',
          700: '#2051aa',
          800: '#143d94',
          900: '#0a2980',
        },
        dark: {
          50: '#e6ebf1',
          100: '#b3bfd1',
          200: '#8093b1',
          300: '#4d6791',
          400: '#264b7b',
          500: '#0575E6',  // Bright blue
          600: '#0463c2',
          700: '#03519d',
          800: '#023f79',
          900: '#021B79',  // Deep blue
        },
        navy: {
          50: '#e6e8eb',
          100: '#b3b9c3',
          200: '#80899b',
          300: '#4d5a73',
          400: '#26365a',
          500: '#1a2332',
          600: '#151d2a',
          700: '#101621',
          800: '#0c1019',
          900: '#0a1929',  // Darkest navy
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0575E6 0%, #021B79 100%)',
        'gradient-button': 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 10px #00d2ff, 0 0 20px #00d2ff' },
          '50%': { textShadow: '0 0 20px #00d2ff, 0 0 30px #00d2ff' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}