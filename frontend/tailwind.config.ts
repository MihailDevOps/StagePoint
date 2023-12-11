/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "istok-web": ["Istok Web", "sans-serif"],
        "ibm": ['IBM Plex Sans Thai Looped'],
        "inter": ['Inter']
      },
      height: {
        
      },
      width: {
        
      },
      screens: {
        sm: "576px",
        md: "836px",
        lg: "1280px",
        xl: "1600px",
        "2xl": "1920px",
      },
      fontSize: {
      },
      colors: {
        
        
      },
      gradientColorStops: {
        
      },
      borderRadius: {
        
      },
      backgroundImage: {
      }
    },
  },
  plugins: [
  ],
};
