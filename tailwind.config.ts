import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2937",
        canvas: "#F4F7F9",
        moss: "#075985",
        saffron: "#C65D11",
        sand: "#E8EEF2",
        portal: {
          navy: "#001E40",
          primary: "#003366",
          blue: "#206393",
          bg: "#F8F9FA",
          border: "#E0E4E8",
        },
      },
      boxShadow: {
        soft: "0 2px 8px rgba(15, 59, 82, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
