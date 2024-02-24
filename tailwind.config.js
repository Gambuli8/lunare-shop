/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('https://res.cloudinary.com/ds7hhoq17/image/upload/v1708726984/Logo/Imagen_de_WhatsApp_2024-02-22_a_las_22.28.07_82c95ffa_subwee.jpg')"
      })
    }
  },
  plugins: []
}
