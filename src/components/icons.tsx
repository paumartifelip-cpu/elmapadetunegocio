import {
  Sprout,
  Compass,
  TrafficCone,
  Headset,
  Target,
  Sparkles,
  DoorOpen,
  Printer,
  type LucideIcon,
} from 'lucide-react'

/** Iconos del paso "¿Dónde estás ahora?" */
export const startingPointIcons: Record<string, LucideIcon> = {
  seed: Sprout,
  compass: Compass,
  traffic: TrafficCone,
}

/** Iconos de las automatizaciones de IA */
export const automationIcons: Record<string, LucideIcon> = {
  phone: Headset,
  target: Target,
  copy: Sparkles,
  door: DoorOpen,
  printer: Printer,
}
