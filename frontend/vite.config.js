import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/setupTests.js",
    dangerouslyIgnoreUnhandledErrors: true,
    //setupFiles: ["./src/tests/setupTests.js"],
  },
});
