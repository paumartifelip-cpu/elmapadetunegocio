import type { BusinessData, OfferType, StartingPoint } from './types'

// ----------------------------------------------------------------------------
// Punto de partida
// ----------------------------------------------------------------------------

export interface StartingPointOption {
  id: StartingPoint
  title: string
  text: string
  iconKey: 'seed' | 'compass' | 'traffic'
  accent: 'sun' | 'coral' | 'ink'
}

export const STARTING_POINTS: StartingPointOption[] = [
  {
    id: 'cero',
    title: 'Empiezo desde cero',
    text: 'Todavía no tengo clientes ni una oferta clara.',
    iconKey: 'seed',
    accent: 'sun',
  },
  {
    id: 'experiencia',
    title: 'Tengo experiencia, pero no sé cómo convertirla en dinero',
    text: 'Sé hacer cosas valiosas, pero me cuesta explicarlas o venderlas.',
    iconKey: 'compass',
    accent: 'coral',
  },
  {
    id: 'clientes',
    title: 'Ya tengo clientes, pero estoy atascado',
    text: 'Quiero entregar mejor, ahorrar tiempo o crecer sin trabajar más horas.',
    iconKey: 'traffic',
    accent: 'ink',
  },
]

// ----------------------------------------------------------------------------
// Tipos de oferta (sección 1)
// ----------------------------------------------------------------------------

export const OFFER_TYPES: { id: Exclude<OfferType, ''>; label: string; emoji: string }[] = [
  { id: 'servicio', label: 'Servicio', emoji: '🤝' },
  { id: 'producto', label: 'Producto', emoji: '📦' },
  { id: 'formacion', label: 'Formación', emoji: '🎓' },
  { id: 'suscripcion', label: 'Suscripción', emoji: '🔁' },
]

// ----------------------------------------------------------------------------
// Automatizaciones de IA (sección 4)
// ----------------------------------------------------------------------------

export interface Automation {
  id: string
  name: string
  description: string
  /** Frase corta que se usa al construir la frase de negocio */
  short: string
  iconKey: 'phone' | 'target' | 'copy' | 'door' | 'printer'
}

export const AUTOMATIONS: Automation[] = [
  {
    id: 'recepcionista',
    name: 'Recepcionista inmortal',
    description: 'Responde las dudas iniciales de tus clientes a cualquier hora.',
    short: 'responder las primeras dudas',
    iconKey: 'phone',
  },
  {
    id: 'perro',
    name: 'Perro de presa',
    description: 'Hace seguimiento a las personas que mostraron interés.',
    short: 'el seguimiento a interesados',
    iconKey: 'target',
  },
  {
    id: 'clones',
    name: 'Fábrica de clones',
    description: 'Te ayuda a crear contenido para atraer clientes.',
    short: 'crear contenido',
    iconKey: 'copy',
  },
  {
    id: 'portero',
    name: 'Portero de discoteca',
    description: 'Da la bienvenida y organiza a los nuevos clientes.',
    short: 'dar la bienvenida y organizar clientes',
    iconKey: 'door',
  },
  {
    id: 'impresora',
    name: 'Impresora de billetes',
    description: 'Te ayuda a preparar propuestas y presupuestos.',
    short: 'preparar propuestas y presupuestos',
    iconKey: 'printer',
  },
]

export const AUTOMATION_BY_ID = Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a])) as Record<
  string,
  Automation
>

// ----------------------------------------------------------------------------
// Estado inicial vacío
// ----------------------------------------------------------------------------

export function emptyBusinessData(): BusinessData {
  return {
    startingPoint: null,
    sell: { name: '', result: '', price: '', type: '', onePhrase: '' },
    audience: { who: '', problem: '', desire: '', where: '' },
    delivery: { what: '', steps: '', how: '', time: '', hardest: '' },
    ai: { selected: [], custom: [] },
    human: { betterThanAi: '', story: '', humanTouch: '', weeklyTask: '' },
  }
}

// ----------------------------------------------------------------------------
// Ejemplo completo — negocio ficticio
// ----------------------------------------------------------------------------

export const EXAMPLE_DATA: BusinessData = {
  startingPoint: 'experiencia',
  sell: {
    name: 'Web que consigue reservas para hoteles pequeños',
    result: 'Más reservas directas y menos dependencia de los portales de reservas',
    price: '600 €',
    type: 'servicio',
    onePhrase: 'Web que consigue reservas para hoteles pequeños — 600 €',
  },
  audience: {
    who: 'Dueños de hoteles rurales y pequeños de 5 a 20 habitaciones.',
    problem: 'Responden mensajes todo el día y no tienen tiempo ni web que convierta.',
    desire: 'Llenar más noches sin pagar tantas comisiones a las plataformas.',
    where: 'Instagram, grupos de turismo rural y visitando negocios locales de la zona.',
  },
  delivery: {
    what: 'Una web lista para recibir reservas, con textos, fotos y botón de contacto.',
    steps: 'Videollamada inicial · Recojo fotos y textos · Monto la web · Reviso contigo · Entrego',
    how: 'Videollamada al principio y entrega final por un enlace, con soporte por WhatsApp.',
    time: 'Siete días desde que tengo los materiales.',
    hardest: 'Escribir los textos que convencen y hacer el seguimiento a los interesados.',
  },
  ai: {
    selected: ['recepcionista', 'perro', 'clones'],
    custom: ['Redactar el primer borrador de los textos de cada web'],
  },
  human: {
    betterThanAi: 'Entender de verdad qué hace especial a cada hotel y contarlo con alma.',
    story: 'Trabajé cinco años en recepción de un hotel rural, conozco el negocio por dentro.',
    humanTouch: 'La videollamada de confianza y las decisiones de diseño finales.',
    weeklyTask: 'Hablar con dos hoteles nuevos cada semana.',
  },
}
