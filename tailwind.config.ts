import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        'serif-display': ['var(--font-playfair-display)', 'serif'],
      },
      colors: {
        neon: '#39FF14',
        crimson: '#DC143C'
      },
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '20': 'repeat(20, minmax(0, 1fr))',
      }
    }
  },
  plugins: []
};
export default config;
