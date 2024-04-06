import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_APP_BACKEND_URL_PROD": JSON.stringify(
        env.VITE_APP_BACKEND_URL_PROD
      ),
    },
    plugins: [react()],
  };
});
