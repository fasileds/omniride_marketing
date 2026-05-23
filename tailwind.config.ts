import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#e8edf5',
          100: '#c5d0e6',
          200: '#9eb0d5',
          300: '#7790c4',
          400: '#5a78b8',
          500: '#3d60ab',
          600: '#2f5099',
          700: '#1e3d80',
          800: '#0f2d67',
          900: '#0F2447',
          950: '#091630',
        },
        gold: {
          400: '#f9c35f',
          500: '#F5A623',
          600: '#e0941a',
        },
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typography],
}

export default config
