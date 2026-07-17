import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// En producción la app se publica en GitHub Pages bajo /elmapadetunegocio/,
// así que el `base` debe incluir ese subdirectorio para que carguen los assets.
// En desarrollo se sirve en la raíz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/elmapadetunegocio/' : '/',
  plugins: [react()],
}))
