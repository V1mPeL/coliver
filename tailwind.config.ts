import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          main: '#0040FF', // Основний колір
          60: '#3366FF', // 60% відтінок
          70: '#668CFF', // 70% відтінок
          80: '#99B2FF', // 80% відтінок
          90: '#CCD9FF', // 90% відтінок
        },
        // Success
        success: {
          main: '#00CC44', // Основний колір
          60: '#33FF66', // 60% відтінок
          70: '#66FF8C', // 70% відтінок
          80: '#99FFB3', // 80% відтінок
          90: '#CCFFD9', // 90% відтінок
        },
        // Warn
        warn: {
          main: '#FFEA00', // Основний колір
          60: '#FFEE33', // 60% відтінок
          70: '#FFF266', // 70% відтінок
          80: '#FFF799', // 80% відтінок
          90: '#FFFBCC', // 90% відтінок
        },
        // Error
        error: {
          main: '#FF2B00', // Основний колір
          60: '#FF5533', // 60% відтінок
          70: '#FF8066', // 70% відтінок
          80: '#FFAA99', // 80% відтінок
          90: '#FFD5CC', // 90% відтінок
        },
        // Neutrals
        neutrals: {
          black: '#1A1A1A', // Чорний
          20: '#333333', // 20% відтінок
          30: '#4D4D4D', // 30% відтінок
          40: '#666666', // 40% відтінок
          50: '#808080', // 50% відтінок
          60: '#999999', // 60% відтінок
          70: '#B3B3B3', // 70% відтінок
          80: '#CCCCCC', // 80% відтінок
          90: '#f9fafb', // 90% відтінок
          white: '#FFFFFF', // Білий
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
