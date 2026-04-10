import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), cloudflare()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["archlinux.local"]
  }
})