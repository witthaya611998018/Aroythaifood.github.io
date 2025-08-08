import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/", // <--- เปลี่ยนจาก "/" เป็น "./"
  plugins: [react()],
});
