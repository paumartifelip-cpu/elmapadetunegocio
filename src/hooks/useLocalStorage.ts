import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Estado persistente en localStorage con guardado automático.
 * Tolerante a fallos: si localStorage no está disponible (modo privado,
 * cuota llena…), sigue funcionando en memoria sin romper la app.
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw != null) return JSON.parse(raw) as T
    } catch {
      /* ignorar: usaremos el valor inicial */
    }
    return initial
  })

  // Evitar escribir en el primer render si el valor no cambió
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* ignorar errores de escritura */
    }
  }, [key, value])

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* ignorar */
    }
  }, [key])

  return [value, setValue, clear]
}
