/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-bg": "#F7F7F9", // 배경
        "primary-blue": "#1D4ED8", // 메인 테마
        "accent-blue": "#3B82F6", // 강조/호버
        "neutral-light": "#E5E7EB", // 이미지 테두리
      },
    },
  },
  plugins: [],
};
