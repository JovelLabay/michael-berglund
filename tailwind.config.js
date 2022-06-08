module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./lib/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      gotham:
        "gotham, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      lora: "lora, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
    fontSize: {
      "app-h1": ["64px", "68px"],
      "app-h2": ["48px", "52px"],
      "app-h3": ["36px", "40px"],
      "app-h3-mobile": ["28px", "32px"],
      "app-h4": ["24px", "28px"],
      "pre-title": ["14px", "16px"],
      "body-s": ["14px", "22px"],
      "body-m": ["16px", "24px"],
      "body-l": ["20px", "28px"],
      input: ["16px", "18px"],
      "link-footer": ["14px", "16px"],
      "link-s": ["14px", "18px"],
      "link-m": ["16px", "20px"],
      "quote-l": ["24px", "32px"],
      "pre-title": ["14px", "16px"],
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },
    extend: {
      colors: {
        "dark-blue": "#1A2241",
        "light-green": "#B0BCB2",
        "medium-green": "#D4CECB",
        "dark-green": "#3E5C58",
        orange: "#D4743B",
        "light-beige": "#F9F6F5",
        "medium-beige": "#D4CECB",
        "dark-beige": "#A5A09E",
        "normal-beige": "#ECE5E2",
        "darker-beige": "#ECE5E2",
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography'),],
}
