/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-zenith': '#020308',
        'sky-mid': '#04070e',
        'sky-horizon': '#060b16',
        'surface': '#020308',
        'elevated': '#16171C',
        'card-bg': '#04060C',
        'accent': {
          DEFAULT: '#8fc7a4',
          dim: 'rgba(143, 199, 164, 0.55)',
          glow: 'rgba(143, 199, 164, 0.15)',
        },
        'ink': {
          DEFAULT: 'rgba(230, 237, 245, 0.92)',
          dim: 'rgba(199, 210, 222, 0.72)',
          faint: 'rgba(176, 189, 204, 0.66)',
          solid: '#E6EDF5',
        },
        'line': {
          DEFAULT: 'rgba(154, 176, 201, 0.16)',
          strong: 'rgba(154, 176, 201, 0.3)',
        }
      },
      fontFamily: {
        heading: ['Marcellus', 'Georgia', 'serif'],
        text: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      }
    },
  },
  plugins: [],
}
