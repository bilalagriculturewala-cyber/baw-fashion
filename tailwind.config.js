/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'baw-black': '#5B4632',
        'baw-dark': '#FAF7F0',
        'baw-gray': '#F1EBDD',
        'baw-gold': '#F4D9A0',
        'baw-gold-light': '#F4D9A0',
        'baw-champagne': '#F4D9A0',
        'baw-amber': '#C8792C',
        'baw-ivory': '#5B4632',
        'baw-ivory-dark': '#E8DFD1',
        'baw-muted': '#766B5E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F4D9A0 0%, #FAF7F0 50%, #F4D9A0 100%)',
        'dark-gradient': 'linear-gradient(180deg, #FAF7F0 0%, #F1EBDD 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(244, 217, 160, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(244, 217, 160, 0.45)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-glow': 'pulse_glow 2s ease-in-out infinite',
      },
      boxShadow: {
        gold: '0 0 20px rgba(244, 217, 160, 0.24)',
        'gold-lg': '0 0 40px rgba(244, 217, 160, 0.35)',
        luxury: '0 20px 60px rgba(91, 70, 50, 0.12)',
        card: '0 4px 20px rgba(91, 70, 50, 0.08)',
        'card-hover': '0 12px 40px rgba(91, 70, 50, 0.15)',
      },
    },
  },
  plugins: [],
};
