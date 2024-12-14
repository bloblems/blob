module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#222323',
        foreground: '#f0f6f0',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      fontSize: {
        base: '14px',
      },
      lineHeight: {
        base: '20px',
      },
    },
  },
  plugins: [],
}

