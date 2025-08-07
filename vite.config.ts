// import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from "vite";
// import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   plugins: [tailwindcss()],
// });

import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react'

// ⚠️ เปลี่ยนชื่อ repo ด้านล่างให้ตรงกับชื่อจริงของคุณ (สำคัญมาก)
const repoName = "Aroythaifood.github.io";

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
});
