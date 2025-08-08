import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// สำหรับ repo ที่ชื่อเหมือน username.github.io ให้ใช้ base: "/"
export default defineConfig({
  base: "/",
  plugins: [react()],
});
