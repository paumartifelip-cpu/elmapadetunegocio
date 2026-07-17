// Modelo de datos de "El Mapa de tu Negocio"

export type StartingPoint = 'cero' | 'experiencia' | 'clientes'

export type OfferType = '' | 'servicio' | 'producto' | 'formacion' | 'suscripcion'

/** 1. Lo que vendes */
export interface SellData {
  name: string
  result: string
  price: string
  type: OfferType
  onePhrase: string
}

/** 2. A quién ayudas */
export interface AudienceData {
  who: string
  problem: string
  desire: string
  where: string
}

/** 3. Cómo lo entregas */
export interface DeliveryData {
  what: string
  steps: string
  how: string
  time: string
  hardest: string
}

/** 4. Dónde trabaja la IA */
export interface AiData {
  /** ids de las automatizaciones seleccionadas */
  selected: string[]
  /** tareas propias que la persona quiere automatizar */
  custom: string[]
}

/** 5. Lo que haces tú */
export interface HumanData {
  betterThanAi: string
  story: string
  humanTouch: string
  weeklyTask: string
}

export interface BusinessData {
  startingPoint: StartingPoint | null
  sell: SellData
  audience: AudienceData
  delivery: DeliveryData
  ai: AiData
  human: HumanData
  /** Frase de negocio editada a mano (si la persona la personaliza) */
  phraseOverride?: string
}

export type Screen = 'welcome' | 'situation' | 'steps' | 'result'
