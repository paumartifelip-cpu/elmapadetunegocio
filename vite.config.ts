import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Usamos rutas RELATIVAS en producción (`base: './'`) para que la app funcione
// en cualquier alojamiento sin cambios: GitHub Pages (en subcarpeta), Cloudflare
// Pages (en la raíz), Netlify, Vercel o incluso abriendo el index.html en local.
// En desarrollo se sirve en la raíz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
