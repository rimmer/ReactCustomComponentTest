import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import isWsl from 'is-wsl';

export default defineConfig(({ mode }) => {
  const isDevelopmentMode = mode === 'development';
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      qwikReact(),
    ],
    server: {
      watch: {
        usePolling: isWsl, // use polling if we run inside WSL
        interval: 2000,
        binaryInterval: 5000,
      }
    },
    build: {
      sourcemap: isDevelopmentMode
    }
  };
});
