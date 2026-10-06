/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0f0f13', card: '#1a1a23', elevated: '#222230' },
        border: { DEFAULT: '#2a2a35', light: '#35354a' },
        text: { DEFAULT: '#ffffff', secondary: '#8e8ea0', muted: '#5a5a6e' },
        accent: { DEFAULT: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: { sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'] },
      borderRadius: { card: '14px' },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
};
