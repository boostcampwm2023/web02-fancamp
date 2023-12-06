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
      '2xl': '4rem', // 64px
    },
    colors: {
      'text-primary': '#111111',
      'text-secondary': '#777777',
      'contour-primary': '#DBDBDB',
      'point-green': '#ADFF00',
      'point-yellow': '#FFC044',
      'point-blue': '#0087E9',
      'point-lavender': '#D4AAFF',
      'point-red': '#FF5044',
      'surface-primary': '#FFFFFF',
      'light-yellow': '#FDF2DF',
      'logo-green': '#36B85D',
      yellow: '#FFE2B5',
      transparent: 'transparent',
      white: '#FFFFFF',
      error: '#ff4d4d',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    ({ addBase, addComponents, addUtilities }) => {
      addBase({
        body: {
          '@apply overflow-y-scroll': {},
        },
        main: {
          '@apply h-[100vh] overflow-y-auto cool-scrollbar': {},
        },
        aside: {
          '@apply h-[100vh]': {},
        },
        mark: {
          background: `linear-gradient(90deg, #FFB82F70 0%, #FFB82F80 80%, #FFB82F90 100%)`,
        },
      });
      addComponents({
        '.content': {
          '@apply relative w-[48rem] h-center px-xl': {},
        },
      });
      addUtilities({
        '.display-regular-20': {
          '@apply font-[TheJamsil] text-[1.25rem] leading-[1.375rem] font-[400]':
            {},
        },
        '.display-regular-16': {
          '@apply font-[TheJamsil] text-[1rem] leading-[1.185rem] font-[400]':
            {},
        },
        '.display-regular-14': {
          '@apply font-[TheJamsil] text-[0.875rem] leading-[1rem] font-[400]':
            {},
        },
        '.display-regular-13': {
          '@apply font-[TheJamsil] text-[0.8125rem] leading-[0.875rem] font-[400]':
            {},
        },
        '.display-light-20': {
          '@apply font-[TheJamsil] text-[1.25rem] leading-[1.375rem] font-[300]':
            {},
        },
        '.display-light-16': {
          '@apply font-[TheJamsil] text-[1rem] leading-[1.185rem] font-[300]':
            {},
        },
        '.display-light-14': {
          '@apply font-[TheJamsil] text-[0.875rem] leading-[1rem] font-[300]':
            {},
        },
        '.display-light-13': {
          '@apply font-[TheJamsil] text-[0.8125rem] leading-[0.875rem] font-[300]':
            {},
        },
        '.display-thin-20': {
          '@apply font-[TheJamsil] text-[1.25rem] leading-[1.375rem] font-[100]':
            {},
        },
        '.display-thin-16': {
          '@apply font-[TheJamsil] text-[1rem] leading-[1.185rem] font-[100]':
            {},
        },
        '.display-thin-14': {
          '@apply font-[TheJamsil] text-[0.875rem] leading-[1rem] font-[100]':
            {},
        },
        '.display-thin-13': {
          '@apply font-[TheJamsil] text-[0.8125rem] leading-[0.875rem] font-[100]':
            {},
        },
        '.center': {
          '@apply left-[50%] top-[50%]': {},
          transform: 'translate(-50%, -50%)',
        },
        '.h-center': {
          '@apply left-[50%]': {},
          transform: 'translateX(-50%)',
        },
        '.v-center': {
          '@apply top-[50%]': {},
          transform: 'translateY(-50%)',
        },
        '.smooth-transition': {
          transition: 'all 0.2s ease-in-out',
        },
        '.text-limit-line-5': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': '5',
          '-webkit-box-orient': 'vertical',
        },
      });
    },
  ],
};
