import { defineConfig } from "vite";
import { builderDevTools } from "@builder.io/dev-tools/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";

// =================================================================================================
// WSL detection
// TODO: extract it somewhere
import process from 'node:process';
import os from 'node:os';
const isWsl = () => {
	if (process.platform !== 'linux') {
		return false;
	}

	if (os.release().toLowerCase().includes('microsoft')) {
		return true;
	}

  return false;
}
// =================================================================================================

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
        usePolling: isWsl(), // use polling if we run inside WSL
        interval: 2000,
        binaryInterval: 5000,
      }
    },
    build: {
      sourcemap: isDevelopmentMode
    }
  };
});
