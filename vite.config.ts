import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/cyberpunk-video-presentation/",
  server: {
    port: 5174,
    fs: { allow: [".."] },
  },
});
