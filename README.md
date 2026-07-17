# El Mapa de tu Negocio

> Pon orden a tu idea y descubre qué hacer para empezar a conseguir clientes.

Aplicación web del curso **Saber y Cobrar**. Guía a una persona, en menos de 10
minutos y desde el móvil, para ver su negocio entero de un vistazo —como el plano
de una casa antes de construirla— respondiendo cinco partes:

1. **Lo que vendes**
2. **A quién ayudas**
3. **Cómo lo entregas**
4. **Dónde trabaja la IA**
5. **Lo que haces tú**

Al terminar genera un **mapa mental** de su negocio, una **frase de negocio**
editable, un **diagnóstico** con tres indicadores (0–100), la **prioridad
recomendada** según su punto de partida y sus **tres próximos pasos**.

## Características

- 🧭 Experiencia guiada por pasos con barra de progreso y validaciones suaves.
- 💾 **Guardado automático** en `localStorage` (sin registro, sin login, sin backend).
- ✍️ Puedes **editar** cualquier respuesta y volver atrás en cualquier momento.
- 🧪 Botón **"Cargar ejemplo"** con un negocio ficticio completo y **"Ver un ejemplo"**.
- ♻️ Botón **"Empezar de nuevo"** con confirmación antes de borrar.
- 🖨️ Botón **"Descargar mi mapa"** que imprime / guarda como **PDF** limpio.
- 📱 Diseño **responsive** (móvil y ordenador) y estética minimalista.
- 🌐 Todo en español. Funciona 100% offline: no necesita ninguna API ni clave.

## Tecnología

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) como bundler y servidor de desarrollo
- [Tailwind CSS](https://tailwindcss.com/) para el diseño
- [lucide-react](https://lucide.dev/) para los iconos

Toda la lógica "inteligente" (frase de negocio, puntuaciones, prioridad y pasos)
se genera de forma determinista a partir de las respuestas, en
[`src/lib/logic.ts`](src/lib/logic.ts). No hay llamadas externas.

## Cómo ejecutarlo en local

Necesitas [Node.js](https://nodejs.org/) 18 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev
```

Abre la URL que aparece en la terminal (por defecto <http://localhost:5173>).

### Otros comandos

```bash
npm run build      # Comprueba tipos y genera la versión de producción en dist/
npm run preview    # Sirve la versión de producción ya compilada
npm run typecheck  # Solo comprobación de tipos
```

## Estructura del proyecto

```
src/
├─ App.tsx                # Estado global, navegación y persistencia
├─ types.ts               # Modelo de datos
├─ content.ts             # Textos, automatizaciones y ejemplo ficticio
├─ hooks/
│  └─ useLocalStorage.ts  # Guardado automático tolerante a fallos
├─ lib/
│  └─ logic.ts            # Diagnóstico, frase de negocio, prioridad y pasos
└─ components/
   ├─ Welcome.tsx         # Pantalla inicial
   ├─ Situation.tsx       # "¿Dónde estás ahora?"
   ├─ StepFlow.tsx        # Orquestador de los 5 pasos
   ├─ steps/              # Los 5 formularios
   ├─ Result.tsx          # Pantalla final "Mi mapa de negocio"
   ├─ MindMap.tsx         # Mapa mental (radial en escritorio, apilado en móvil)
   └─ result/             # Frase de negocio y barras de diagnóstico
```

## Descargar el mapa como PDF

El botón **"Descargar mi mapa"** abre el diálogo de impresión del navegador con
una hoja de estilos específica (`@media print`) que oculta la interfaz y deja
solo el mapa, la frase, el diagnóstico y los pasos. Elige **"Guardar como PDF"**
como destino para obtener el archivo.

## Ideas para una segunda versión

- Conectar un modelo de lenguaje (p. ej. Claude) para redactar frases de negocio
  más naturales y consejos personalizados. El código está preparado para ello:
  toda la generación vive aislada en `src/lib/logic.ts`.
- Exportar el mapa como imagen.
- Compartir el mapa mediante un enlace.

---

Hecho con cariño para el curso **Saber y Cobrar**.
