import { PackageCheck } from 'lucide-react'
import type { DeliveryData } from '../../types'
import { StepShell } from '../StepShell'
import { ExampleCallout, TextArea, TextField } from '../fields'

interface Props {
  value: DeliveryData
  onChange: (patch: Partial<DeliveryData>) => void
}

export function DeliveryStep({ value, onChange }: Props) {
  return (
    <StepShell
      icon={PackageCheck}
      accent="ink"
      title="¿Cómo recibe el resultado?"
      explanation="No basta con prometer algo. Tu cliente debe entender qué pasa desde que paga hasta que consigue el resultado."
    >
      <ExampleCallout>
        Primero hacemos una videollamada. Después preparo la web y la entrego por un enlace en siete días.
      </ExampleCallout>

      <div className="space-y-5">
        <TextArea
          label="¿Qué recibe exactamente el cliente?"
          value={value.what}
          onChange={(v) => onChange({ what: v })}
          placeholder="Ej. Una web lista para recibir reservas, con textos, fotos y botón de contacto"
        />
        <TextArea
          label="¿Cuáles son los pasos de la entrega?"
          hint="Del “paga” al “resultado”. Puedes separarlos con guiones o puntos."
          value={value.steps}
          onChange={(v) => onChange({ steps: v })}
          placeholder="Ej. Videollamada · Recojo materiales · Monto la web · Revisamos · Entrego"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="¿Cómo se lo entregas?"
            hint="Videollamada, WhatsApp, email, web, presencial…"
            value={value.how}
            onChange={(v) => onChange({ how: v })}
            placeholder="Ej. Enlace + soporte por WhatsApp"
          />
          <TextField
            label="¿Cuánto tiempo tarda en recibirlo?"
            value={value.time}
            onChange={(v) => onChange({ time: v })}
            placeholder="Ej. 7 días"
          />
        </div>
        <TextArea
          label="¿Qué parte te está costando más hacer ahora?"
          hint="Nos servirá para saber qué podría quitarte de encima la IA."
          value={value.hardest}
          onChange={(v) => onChange({ hardest: v })}
          placeholder="Ej. Escribir los textos y hacer seguimiento a los interesados"
        />
      </div>
    </StepShell>
  )
}
