/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 0.3s ease forwards',
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 },
        },
        fadeIn: {
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};