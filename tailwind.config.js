/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul profundo — color principal
        ink: {
          50: '#eef2fb',
          100: '#d6e0f5',
          200: '#adc0eb',
          300: '#7f99dc',
          400: '#5573c9',
          500: '#3752ad',
          600: '#2a3f8c',
          700: '#213170',
          800: '#1a2758',
          900: '#141d42',
          950: '#0d1330',
        },
        // Amarillo — energía
        sun: {
          100: '#fff2cc',
          200: '#ffe49a',
          300: '#ffd45c',
          400: '#ffc42e',
          500: '#f5ae12',
        },
        // Coral — calidez
        coral: {
          100: '#ffe1db',
          200: '#ffc0b3',
          300: '#ff988a',
          400: '#ff6f5c',
          500: '#f4553f',
          600: '#d63e2c',
        },
        // Fondo claro cálido (muy sutil, no blanco puro)
        cream: {
          50: '#faf9f7',
          100: '#f3f1ec',
          200: '#e9e6df',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Display',
          'Inter',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        // Sombras discretas, estilo Apple
        soft: '0 1px 2px rgba(20, 29, 66, 0.04), 0 4px 12px -8px rgba(20, 29, 66, 0.10)',
        card: '0 1px 3px rgba(20, 29, 66, 0.05), 0 10px 24px -16px rgba(20, 29, 66, 0.18)',
        lift: '0 8px 30px -12px rgba(20, 29, 66, 0.20)',
      },
      screens: {
        xs: '420px',
      },
      borderRadius: {
        '4xl': '1.25rem',
        '5xl': '1.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'grow-x': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'pop': 'pop 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
