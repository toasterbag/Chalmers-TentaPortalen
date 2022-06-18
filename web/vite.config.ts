import { join } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: "es2015",
  },
  resolve: {
    alias: {
      "@plugins": join(__dirname, "src/plugins"),
      "@backend": join(__dirname, "../src/"),
    },
  },
});
