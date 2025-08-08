// filepath: d:\POS\pos_page_food\vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/Aroythaifood.github.io/",
  plugins: [react()],
});
