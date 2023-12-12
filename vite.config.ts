import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { builderDevTools } from "@builder.io/dev-tools/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";

export default defineConfig(({ mode }) => {
  const isDevelopmentMode = mode === 'development';
  return {
    plugins: [
      builderDevTools(),
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      qwikReact(),
    ],
    server: {
      watch: {
        usePolling: true, // we run inside WLS
        interval: 2000,
        binaryInterval: 5000,
      }
    },
    build: {
      sourcemap: isDevelopmentMode
    }
  };
});
