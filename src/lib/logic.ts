import type { BusinessData, StartingPoint } from '../types'
import { AUTOMATION_BY_ID, OFFER_TYPES } from '../content'

// ----------------------------------------------------------------------------
// Utilidades
// ----------------------------------------------------------------------------

const clean = (s: string) => s.trim()
const has = (s: string) => clean(s).length > 0
const rich = (s: string, n = 22) => clean(s).length >= n
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

/** Banda cualitativa para pintar el color y el tono del mensaje */
export type Band = 'low' | 'mid' | 'high'
export function bandOf(score: number): Band {
  if (score < 34) return 'low'
  if (score < 67) return 'mid'
  return 'high'
}

// ----------------------------------------------------------------------------
// Diagnóstico — tres indicadores de 0 a 100
// ----------------------------------------------------------------------------

export interface Indicator {
  key: 'oferta' | 'clientes' | 'ia'
  label: string
  score: number
  band: Band
  message: string
}

export function computeIndicators(d: BusinessData): Indicator[] {
  return [offerClarity(d), clientEase(d), aiLeverage(d)]
}

function offerClarity(d: BusinessData): Indicator {
  const { name, result, price, type, onePhrase } = d.sell
  let s = 0
  if (has(name)) s += 25
  if (has(result)) s += rich(result) ? 30 : 16
  if (has(price)) s += 15
  if (has(type)) s += 10
  if (has(onePhrase)) s += 20
  const score = clamp(s)
  const band = bandOf(score)

  let message: string
  if (!has(name)) {
    message = 'Todavía no le has puesto nombre a lo que vendes. Empieza por ahí: sin nombre no hay oferta.'
  } else if (!has(result) || !rich(result)) {
    message =
      'Tu oferta necesita un resultado más concreto. En vez de "ayudo con redes", explica qué cambio consigue tu cliente.'
  } else if (!has(price)) {
    message = 'Ya se entiende qué vendes. Ponle un precio, aunque sea aproximado: un precio convierte una idea en una oferta.'
  } else if (band === 'high') {
    message = 'Se entiende muy bien qué vendes, para quién y a qué precio. Esta es tu base para empezar a hablar con clientes.'
  } else {
    message = 'Vas por buen camino. Afina la frase de una línea para que cualquiera lo entienda en cinco segundos.'
  }
  return { key: 'oferta', label: 'Claridad de oferta', score, band, message }
}

function clientEase(d: BusinessData): Indicator {
  const { who, problem, desire, where } = d.audience
  const part = (v: string) => (has(v) ? (rich(v) ? 25 : 15) : 0)
  const score = clamp(part(who) + part(problem) + part(desire) + part(where))
  const band = bandOf(score)

  let message: string
  if (!has(who)) {
    message = 'Aún no sabemos a quién le hablas. Cuando hablas para todo el mundo, nadie siente que le hablas a él.'
  } else if (!has(where)) {
    message = 'Tienes claro a quién ayudas. Ahora decide dónde encontrarlo: sin un sitio donde buscarlo, es difícil conseguir clientes.'
  } else if (!has(problem) || !has(desire)) {
    message = 'Describe mejor el problema que tiene hoy y lo que desea conseguir. Ahí está el motivo por el que te comprará.'
  } else if (band === 'high') {
    message = 'Tienes muy claro a quién ayudas, qué le duele y dónde encontrarlo. Eso hace mucho más fácil conseguir clientes.'
  } else {
    message = 'Bien encaminado. Cuanto más concreto sea tu cliente ideal, más fácil será que sienta que le hablas a él.'
  }
  return { key: 'clientes', label: 'Facilidad para conseguir clientes', score, band, message }
}

function aiLeverage(d: BusinessData): Indicator {
  const selected = d.ai.selected.length
  const custom = d.ai.custom.filter(has).length
  let s = selected * 18 + Math.min(custom, 2) * 8
  if (has(d.delivery.hardest)) s += 6 // sabes qué parte te cuesta = sabes qué delegar
  const score = clamp(s)
  const band = bandOf(score)

  let message: string
  if (selected === 0 && custom === 0) {
    message = 'Todavía no dejas que la IA te quite trabajo. Elige al menos una tarea repetitiva para empezar a ganar tiempo.'
  } else if (band === 'high') {
    message = 'Tienes claras varias tareas que la IA puede quitarte de encima. Así ganas horas para lo que solo puedes hacer tú.'
  } else {
    message = 'Buen comienzo con la IA. Marca alguna automatización más para liberar todavía más tiempo cada semana.'
  }
  return { key: 'ia', label: 'Capacidad de ahorrar tiempo con IA', score, band, message }
}

/** Porcentaje global de completitud, para animaciones y estados vacíos */
export function completion(d: BusinessData): number {
  const fields = [
    d.sell.name, d.sell.result, d.sell.price, d.sell.type, d.sell.onePhrase,
    d.audience.who, d.audience.problem, d.audience.desire, d.audience.where,
    d.delivery.what, d.delivery.steps, d.delivery.how, d.delivery.time, d.delivery.hardest,
    d.human.betterThanAi, d.human.story, d.human.humanTouch, d.human.weeklyTask,
  ]
  const filled = fields.filter((f) => has(f)).length
  const aiFilled = d.ai.selected.length > 0 || d.ai.custom.some(has) ? 1 : 0
  return clamp(((filled + aiFilled) / (fields.length + 1)) * 100)
}

// ----------------------------------------------------------------------------
// Frase de negocio
// ----------------------------------------------------------------------------

export interface BusinessPhrase {
  text: string
  /** true cuando todos los huecos están rellenos */
  complete: boolean
  /** qué falta por completar, en lenguaje amable */
  missing: string[]
}

export function buildPhrase(d: BusinessData): BusinessPhrase {
  const missing: string[] = []
  // Cada pieza va en mitad de la frase: sin mayúscula inicial ni punto final.
  const piece = (s: string) => shorten(stripEdges(lowerFirst(s)), 120)

  const who = has(d.audience.who)
    ? piece(d.audience.who)
    : placeholder('a quién ayudas', missing, 'el tipo de persona a la que ayudas')
  const result = has(d.sell.result)
    ? piece(d.sell.result)
    : placeholder('qué resultado consigue', missing, 'el resultado que consigue tu cliente')
  const offer = has(d.sell.name)
    ? piece(d.sell.name)
    : placeholder('qué vendes', missing, 'tu servicio o producto')

  const autos = d.ai.selected.map((id) => AUTOMATION_BY_ID[id]?.short).filter(Boolean) as string[]
  const customAutos = d.ai.custom.filter(has).map((s) => stripEdges(lowerFirst(s)))
  const allAutos = [...autos, ...customAutos]
  const aiPart =
    allAutos.length > 0 ? joinList(allAutos.slice(0, 3)) : placeholder('tareas para la IA', missing, 'algunas tareas repetitivas')

  const text = `Ayudo a ${who} a conseguir ${result} mediante ${offer}, mientras la IA me ayuda con ${aiPart}.`

  return { text, complete: missing.length === 0, missing }
}

function placeholder(_key: string, bag: string[], label: string): string {
  bag.push(label)
  return `⟨${label}⟩`
}

// ----------------------------------------------------------------------------
// Prioridad recomendada, según el punto de partida
// ----------------------------------------------------------------------------

export interface PriorityBlock {
  title: string
  intro: string
  bullets: string[]
}

export function priorityBlock(sp: StartingPoint | null): PriorityBlock {
  switch (sp) {
    case 'cero':
      return {
        title: 'Tu prioridad ahora: una oferta sencilla y clara',
        intro:
          'Estás empezando, así que no necesitas algo perfecto: necesitas algo entendible. Define una oferta simple y deja que la IA te ayude a avanzar más rápido.',
        bullets: [
          'Elige un único servicio con un resultado claro y un precio de salida.',
          'Escríbelo en una frase que cualquiera entienda a la primera.',
          'Usa la IA para ganar velocidad: textos, ideas y primeros contactos.',
        ],
      }
    case 'experiencia':
      return {
        title: 'Tu prioridad ahora: convertir tu experiencia en una solución concreta',
        intro:
          'Ya sabes hacer cosas valiosas. El salto está en empaquetarlas en algo que se entienda y se pueda comprar, y en contar qué te hace diferente.',
        bullets: [
          'Transforma lo que sabes en un resultado concreto que el cliente pueda ver.',
          'Apóyate en tu historia y tu criterio: eso es lo difícil de copiar.',
          'Ponle nombre y precio para que deje de ser "lo que hago" y pase a ser "lo que vendo".',
        ],
      }
    case 'clientes':
      return {
        title: 'Tu prioridad ahora: mejorar la entrega y automatizar lo repetitivo',
        intro:
          'Ya tienes clientes, así que no arriesgues cambiando todo. Ordena tu forma de entregar y quita de tu mesa las tareas repetitivas para crecer sin trabajar más horas.',
        bullets: [
          'Define los pasos de tu entrega para que sea igual de buena cada vez.',
          'Elige la tarea que más tiempo te roba y pásasela a la IA.',
          'Protege tu tiempo para lo importante: vender y cuidar la relación.',
        ],
      }
    default:
      return {
        title: 'Tu prioridad ahora: poner orden en tu idea',
        intro:
          'Antes de correr, conviene ver el negocio entero. Completa las cinco partes y sabremos por dónde empezar.',
        bullets: [
          'Define qué vendes y a quién.',
          'Ordena cómo lo entregas.',
          'Decide qué le pides a la IA y qué te reservas para ti.',
        ],
      }
  }
}

// ----------------------------------------------------------------------------
// Tres próximos pasos, concretos y para esta semana
// ----------------------------------------------------------------------------

export function nextSteps(d: BusinessData): string[] {
  const steps: string[] = []
  const phrase = buildPhrase(d)

  // Paso 1 — según el punto de partida
  if (d.startingPoint === 'cero') {
    steps.push('Escribe en una nota del móvil tu oferta en una sola frase: qué vendes, a quién y qué resultado consigue.')
  } else if (d.startingPoint === 'clientes') {
    steps.push('Escribe los pasos exactos de tu entrega, del "pago" al "resultado", para que cada cliente reciba lo mismo.')
  } else {
    steps.push('Convierte lo que ya sabes hacer en una frase de oferta con un resultado concreto y guárdala en el móvil.')
  }

  // Paso 2 — cliente ideal
  if (!has(d.audience.who) || !has(d.audience.where)) {
    steps.push('Define en una línea a quién ayudas y dónde encontrarlo (Instagram, negocios locales, LinkedIn, conocidos…).')
  } else {
    steps.push('Haz una lista de 20 personas o negocios que encajan con tu cliente ideal y por dónde contactarlos.')
  }

  // Paso 3 — IA / tiempo
  if (d.ai.selected.length === 0 && d.ai.custom.filter(has).length === 0) {
    steps.push('Elige una sola tarea repetitiva (responder dudas, hacer seguimiento, crear contenido) y pídele a la IA que empiece a ayudarte con ella.')
  } else if (!phrase.complete) {
    steps.push('Completa los huecos que faltan en tu frase de negocio para tenerla lista para usar cuando alguien te pregunte a qué te dedicas.')
  } else {
    steps.push('Prepara una plantilla con la IA para la tarea que más tiempo te roba y úsala con tu próximo cliente.')
  }

  return steps.slice(0, 3)
}

// ----------------------------------------------------------------------------
// Resúmenes para el mapa mental
// ----------------------------------------------------------------------------

export interface MapNode {
  key: 'sell' | 'audience' | 'delivery' | 'ai' | 'human'
  title: string
  lines: string[]
  filled: boolean
}

export function mapNodes(d: BusinessData): MapNode[] {
  const offerType = OFFER_TYPES.find((t) => t.id === d.sell.type)

  const sellLines = [
    d.sell.name,
    d.sell.result && `→ ${d.sell.result}`,
    d.sell.price && `💶 ${d.sell.price}`,
    offerType && `${offerType.emoji} ${offerType.label}`,
  ]

  const audienceLines = [
    d.audience.who,
    d.audience.problem && `Le duele: ${d.audience.problem}`,
    d.audience.desire && `Quiere: ${d.audience.desire}`,
    d.audience.where && `Dónde: ${d.audience.where}`,
  ]

  const deliveryLines = [
    d.delivery.what,
    d.delivery.steps,
    d.delivery.how && `Cómo: ${d.delivery.how}`,
    d.delivery.time && `⏱ ${d.delivery.time}`,
  ]

  const aiLines = [
    ...d.ai.selected.map((id) => AUTOMATION_BY_ID[id]?.name).filter(Boolean),
    ...d.ai.custom.filter(has),
  ] as string[]

  const humanLines = [
    d.human.betterThanAi,
    d.human.humanTouch && `Trato humano: ${d.human.humanTouch}`,
    d.human.weeklyTask && `⭐ Cada semana: ${d.human.weeklyTask}`,
  ]

  const build = (key: MapNode['key'], title: string, raw: (string | false | undefined)[]): MapNode => {
    const lines = raw.filter((x): x is string => Boolean(x)).map((s) => clean(s))
    return { key, title, lines, filled: lines.length > 0 }
  }

  return [
    build('sell', 'Lo que vendo', sellLines),
    build('audience', 'A quién ayudo', audienceLines),
    build('delivery', 'Cómo lo entrego', deliveryLines),
    build('ai', 'Cómo trabaja la IA', aiLines),
    build('human', 'Lo que hago yo', humanLines),
  ]
}

/** Nombre central del mapa: nombre de la oferta o alternativa amable */
export function centerLabel(d: BusinessData): string {
  if (has(d.sell.name)) return clean(d.sell.name)
  if (has(d.sell.onePhrase)) return clean(d.sell.onePhrase)
  return 'Mi negocio'
}

// ----------------------------------------------------------------------------
// Helpers de texto
// ----------------------------------------------------------------------------

function lowerFirst(s: string): string {
  const t = clean(s)
  if (!t) return t
  // Minúscula inicial salvo siglas (dos mayúsculas seguidas, p. ej. "IA", "SEO")
  if (/^[A-ZÁÉÍÓÚÑ]{2,}/.test(t)) return t
  return t.charAt(0).toLocaleLowerCase('es') + t.slice(1)
}

/** Quita espacios y puntuación final para encajar la pieza dentro de la frase */
function stripEdges(s: string): string {
  return clean(s).replace(/[\s.;,:·—–-]+$/u, '')
}

function shorten(s: string, max = 90): string {
  const t = clean(s).replace(/\s+/g, ' ')
  if (t.length <= max) return t
  return t.slice(0, max - 1).replace(/[\s,.;:]+\S*$/, '') + '…'
}

function joinList(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1]
}
