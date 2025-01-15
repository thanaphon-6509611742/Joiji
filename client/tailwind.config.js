/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-home': "url('./src/assets/backgrounds/background-home.png')",
        'background-signup': "url('./src/assets/backgrounds/background-signup.png')"
      },
      colors: {
        'red-netflix': '#EC0000',
        'red-netflix-active': '#99161d',
        'black-netflix': '#1B1B19',
        'black-netflix-active': '#141414',
        'white1': '#f2f3f4',
        'dark-purple': "#081A51",
        'light-white': "rgba(255,255,255,0.17)",
        'white2' : '#f8f9fa',
        'black1' : 'rgb(229, 231, 235)'
      }
    },
  },
}

