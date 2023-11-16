/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        sm: '0.25rem', // 4px
        md: '0.5rem', // 8px
        lg: '1rem', // 16px
      },
      borderWidth: {
        sm: '0.0625rem', // 1px
        md: '0.125rem', // 2px
        lg: '0.25rem', // 4px
      },
    },
    spacing: {
      2: '0.5rem',
      4: '1rem',
      8: '2rem',
      24: '6rem',
      xs: '0.25rem', // 4px
      sm: '0.5rem', // 8px
      md: '1rem', // 16px
      lg: '1.5rem', // 24px
      xl: '2rem', // 32px
    },
    colors: {
      'text-primary': '#111111',
      'text-secondary': '#777777',
      'contour-primary': '#DFDFDF',
      'point-green': '#ADFF00',
      'point-yellow': '#FFC044',
      'point-blue': '#0087E9',
      'point-lavender': '#D4AAFF',
      transparent: 'transparent',
      'surface-primary': '#FFFFFF',
      error: '#ff4d4d',
    },
  },
  plugins: [],
};
