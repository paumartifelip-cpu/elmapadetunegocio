import { Users } from 'lucide-react'
import type { AudienceData } from '../../types'
import { StepShell } from '../StepShell'
import { ExampleCallout, TextArea } from '../fields'

interface Props {
  value: AudienceData
  onChange: (patch: Partial<AudienceData>) => void
}

export function AudienceStep({ value, onChange }: Props) {
  return (
    <StepShell
      icon={Users}
      accent="coral"
      title="¿A quién se lo vendes?"
      explanation="Cuando hablas para todo el mundo, nadie siente que le hablas a él."
    >
      <ExampleCallout>
        Dueños de hoteles pequeños que responden mensajes todo el día y no tienen tiempo.
      </ExampleCallout>

      <div className="space-y-5">
        <TextArea
          label="¿Qué tipo de persona o negocio es?"
          value={value.who}
          onChange={(v) => onChange({ who: v })}
          placeholder="Ej. Dueños de hoteles rurales pequeños, de 5 a 20 habitaciones"
        />
        <TextArea
          label="¿Qué problema tiene ahora?"
          value={value.problem}
          onChange={(v) => onChange({ problem: v })}
          placeholder="Ej. Pierde el día respondiendo mensajes y su web no consigue reservas"
        />
        <TextArea
          label="¿Qué desea conseguir?"
          value={value.desire}
          onChange={(v) => onChange({ desire: v })}
          placeholder="Ej. Llenar más noches sin pagar tantas comisiones a los portales"
        />
        <TextArea
          label="¿Dónde podrías encontrar a esas personas?"
          hint="Instagram, negocios locales, LinkedIn, conocidos, grupos, ferias…"
          value={value.where}
          onChange={(v) => onChange({ where: v })}
          placeholder="Ej. Instagram, grupos de turismo rural y visitando negocios de la zona"
        />
      </div>
    </StepShell>
  )
}
