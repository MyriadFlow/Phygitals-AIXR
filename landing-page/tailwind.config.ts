import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1A1B41',
        'primary-light': '#F3F4F6',
        'accent': '#E04B97', // Neon pink accent
        'secondary': '#2A9D8F', // Teal secondary
        'background-dark': '#121212', 
        'background-light': '#FFFFFF',
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-image.png')",
        'custom-gradient': 'linear-gradient(to top, #020024, #8308A3, #3D0E6F)',
      },
    },
    fontFamily: {
      'sans': ['Rajdhani', 'sans-serif'],
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.particle-container': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          'z-index': '-1',
        },
      });
    }),
  ],
};

export default config;
