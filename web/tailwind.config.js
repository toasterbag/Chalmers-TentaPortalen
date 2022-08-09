const theme = {
  primary: "hsla(160, 22%, 46%, 1.0)",
  accent: "hsla(357, 46%, 52%, 1.0)",
  purple: "hsla(255, 25%, 59%, 1)",
  warning: "hsl(32, 98%, 61%)",
  error: "hsla(357, 46%, 52%, 1.0)",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      colors: {
        purple: "hsl(255, 25%, 59%)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...theme,
          muted: "hsl(216deg, 15%, 48%)",
          "base-content": "hsl(210 6% 33%)",
          "base-100": "hsl(30, 6%, 94%)",
          "base-200": "hsl(30, 6%, 90%)",
          "base-300": "hsl(30, 6%, 86%)",
          "--border-btn": "0px",
        },
        dark: {
          ...theme,
          "base-content": "hsl(220 13% 69%)",
          "base-100": "hsl(220 17% 23%)",
          "base-200": "hsl(220 17% 20%)",
          "base-300": "hsl(219 18% 18%)",
        },
      },
    ],
  },
};
