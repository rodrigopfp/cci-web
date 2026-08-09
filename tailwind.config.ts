import type { Config } from "tailwindcss";

// Paleta oficial del Manual de Identidad Visual CCI (enero 2026).
// Identidad primaria: naranjos #E04E00 / #F1873D / #F6BA8C + gris #5C5C5C.
// Identidad secundaria: azules #005CAD / #009DE6, negro y blanco.
// orange-dark y graphite-dark son tonos funcionales (hover / fondos), no de marca.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cci: {
          orange: "#E04E00",
          "orange-mid": "#F1873D",
          "orange-light": "#F6BA8C",
          "orange-dark": "#B84000",
          "orange-soft": "#FCEDE3",
          graphite: "#5C5C5C",
          "graphite-dark": "#3D3D3D",
          blue: "#005CAD",
          "blue-light": "#009DE6",
          "blue-soft": "#E6F3FC",
          ink: "#2B2B2B",
          slate: "#6E6E6E",
          "slate-light": "#9C9C9C",
          line: "#E6E4E2",
          paper: "#F7F5F3",
          "data-real": "#1E874B",
          "data-real-soft": "#E7F4EC",
          "data-mock": "#B07A15",
          "data-mock-soft": "#FBF3E0",
          "data-pending": "#8A8C8E",
          "data-pending-soft": "#F0EFEE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontWeight: { "500": "500", "800": "800", "900": "900" },
      maxWidth: { content: "1240px" },
      boxShadow: {
        card: "0 1px 2px rgba(43,43,43,0.04), 0 8px 24px rgba(43,43,43,0.06)",
        "card-hover": "0 4px 8px rgba(43,43,43,0.08), 0 16px 40px rgba(43,43,43,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
