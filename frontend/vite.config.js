import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:3000",
  //   },
  // },
})


