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
        primary: {
          500: '#FC008F',
        },
      },
      fontFamily: {
        header: ['brandon-grotesque', defaultTheme.fontFamily.sans],
        text: ['Noto Sans JP', defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        circle: '50%',
      },
      transitionDelay: {
        0: '0ms',
      },
      boxShadow: {
        'blur-black': '0 0 2px 4px rgba(#000000)',
        'blur-ivoly': '0 0 2px 4px rgba(#F2F2F0)',
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
