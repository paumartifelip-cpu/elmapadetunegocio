import { HandHeart } from 'lucide-react'
import type { HumanData } from '../../types'
import { StepShell } from '../StepShell'
import { TextArea } from '../fields'

interface Props {
  value: HumanData
  onChange: (patch: Partial<HumanData>) => void
}

const ideas = [
  'Entender al cliente',
  'Tomar decisiones',
  'Dar confianza',
  'Cerrar una venta',
  'Crear una relación real',
]

export function HumanStep({ value, onChange }: Props) {
  return (
    <StepShell
      icon={HandHeart}
      accent="sun"
      title="¿Qué solo puedes hacer tú?"
      explanation="La IA puede acelerar el camino. Pero tu experiencia, tu criterio y la confianza que generas son la parte difícil de copiar."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {ideas.map((i) => (
          <span key={i} className="chip bg-sun-100 text-ink-700">
            {i}
          </span>
        ))}
      </div>

      <div className="space-y-5">
        <TextArea
          label="¿Qué haces mejor que una inteligencia artificial?"
          value={value.betterThanAi}
          onChange={(v) => onChange({ betterThanAi: v })}
          placeholder="Ej. Entender de verdad qué hace especial a cada cliente y contarlo con alma"
        />
        <TextArea
          label="¿Qué experiencia o historia personal te diferencia?"
          value={value.story}
          onChange={(v) => onChange({ story: v })}
          placeholder="Ej. Trabajé años en recepción de un hotel, conozco el negocio por dentro"
        />
        <TextArea
          label="¿Qué parte necesita tu trato humano?"
          value={value.humanTouch}
          onChange={(v) => onChange({ humanTouch: v })}
          placeholder="Ej. La primera videollamada de confianza y las decisiones finales"
        />
        <TextArea
          label="¿Cuál será tu tarea más importante cada semana?"
          hint="Esa que, si la haces, todo lo demás avanza."
          value={value.weeklyTask}
          onChange={(v) => onChange({ weeklyTask: v })}
          placeholder="Ej. Hablar con dos clientes nuevos cada semana"
        />
      </div>
    </StepShell>
  )
}
