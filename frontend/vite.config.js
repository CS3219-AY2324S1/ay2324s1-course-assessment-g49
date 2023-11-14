import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      server: {
        host: "0.0.0.0",
        port: 5173,
      },
      plugins: [react()],
      build: { chunkSizeWarningLimit: 1600 },
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/tests/setupTests.js",
        dangerouslyIgnoreUnhandledErrors: true,
        //setupFiles: ["./src/tests/setupTests.js"],
      },
    };
  } else {
    return {
      server: {
        host: "0.0.0.0",
        port: 8080,
      },
      plugins: [react()],
      build: { chunkSizeWarningLimit: 1600 },
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/tests/setupTests.js",
        dangerouslyIgnoreUnhandledErrors: true,
        //setupFiles: ["./src/tests/setupTests.js"],
      },
    };
  }
});
