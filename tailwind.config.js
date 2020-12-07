const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'renderer/**/*.css',
      'renderer/**/*.js',
      'renderer/**/*.ts',
      'renderer/**/*.jsx',
      'renderer/**/*.tsx',
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: '#FF15AB',
        success: '#09E85E',
        lightGray: '#757780',
        darkGray: '#45474C',
        gray: '#757780',
        surface: {
          0: '#FCFBFC',
          1: '#ffffff',
          2: '#CDD0DA',
          3: '#000000',
        },
      },
      fontFamily: {
        header: ['Baskerville', 'Noto Serif JP', defaultTheme.fontFamily.serif],
        text: ['Baskerville', 'Noto Serif JP', defaultTheme.fontFamily.serif],
      },
      borderRadius: {
        circle: '50%',
      },
      transitionDelay: {
        0: '0ms',
      },
      boxShadow: {
        black: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  variants: {
    width: ['responsive', 'hover', 'group-hover'],
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {};

      addUtilities(newUtilities);
    },
  ],
};
