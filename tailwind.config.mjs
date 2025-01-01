/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#133149',
          700: '#21537B',
          500: '#2E75AD',
          300: '#73A3C8',
          100: '#BED4E6',
        },
        secondary: {
          900: '#6B3C13',
          500: '#FF902E',
          300: '#FFB573',
          100: '#FFDDBE',
        },
        neutral: {
          900: '#262626',
          700: '#5B5B5B',
          600: '#747474',
          500: '#808080',
          300: '#AAAAAA',
          200: '#BBBBBB',
          100: '#D8D8D8',
          50: '#F7F7F7',
        },
        success: {
          500: '#22C014',
        },
        warning: {
          500: '#CD2929',
        },
        background: {
          light: '#FFFBFE',
        },
      },
      fontFamily: {
        sans: ['Oswald', 'Arial', 'sans-serif'],
        serif: ['Nunito', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
