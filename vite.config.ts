import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Usamos la base '/elmapadetunegocio/' solo al compilar en GitHub Actions
// para el despliegue en GitHub Pages (que se sirve en una subcarpeta).
// En cualquier otro entorno (como Cloudflare Pages o local) usamos '/'
// para evitar que la página se quede en blanco.
export default defineConfig(() => ({
  root: 'src',
  publicDir: '../public',
  // @ts-ignore
  base: process.env.GITHUB_ACTIONS === 'true' ? '/elmapadetunegocio/' : '/',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
}))
