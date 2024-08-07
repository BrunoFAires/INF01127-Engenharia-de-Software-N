/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important:true,
  theme: {
    extend: {
      backgroundImage: {
        'login_bg': "url('/public/bg.jpg')",
      },
      backdropBlur: {
        sm: '1px',
      }
    },
  },
  plugins: [],
}
