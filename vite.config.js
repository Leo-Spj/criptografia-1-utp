import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //gh pages
  base: 'https://Leo-Spj.github.io/criptografia-1-utp',
})
