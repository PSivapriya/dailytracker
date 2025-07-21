/** @type {import('tailwindcss').Config} */
 export default {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
      extend: {
        colors:{
          primary: "#000507",
          // secondary: "#7ad7fd",
          secondary:"#00bfff",
          third:"#0070b8",
        },
        container:{
          center:true,
            padding:{
            default: "1rem",
            sm: "2rem",
            lg: "4rem",
            xl: "6rem",
            "2xl": "6rem"
          }
        }
      },
    },
    plugins: [],
  }
