/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#1A2E6C',
        secondary: '#F5B700',
        accent:    '#C0392B',
        cyan:      '#00B4D8',
        success:   '#27AE60',
        dark:      '#0D1B3E',
        light:     '#F9FAFB',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': 'clamp(2.5rem, 5vw, 4.5rem)',
        'h2': 'clamp(2rem, 4vw, 3rem)',
        'h3': 'clamp(1.5rem, 3vw, 2rem)',
      },
      boxShadow: {
        'card':    '0 4px 24px rgba(26,46,108,0.10)',
        'card-lg': '0 12px 48px rgba(26,46,108,0.18)',
        'gold':    '0 4px 24px rgba(245,183,0,0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(13,27,62,0.92) 0%, rgba(26,46,108,0.75) 50%, rgba(0,180,216,0.35) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
