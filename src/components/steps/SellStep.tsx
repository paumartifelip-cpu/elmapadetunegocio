import { ShoppingBag } from 'lucide-react'
import type { OfferType, SellData } from '../../types'
import { OFFER_TYPES } from '../../content'
import { StepShell } from '../StepShell'
import { ExampleCallout, TextArea, TextField } from '../fields'

interface Props {
  value: SellData
  onChange: (patch: Partial<SellData>) => void
}

export function SellStep({ value, onChange }: Props) {
  return (
    <StepShell
      icon={ShoppingBag}
      accent="sun"
      title="¿Qué estás vendiendo?"
      explanation="Una persona no puede comprarte algo que no entiende. Ponle nombre, precio y resultado."
    >
      <ExampleCallout>Web que consigue reservas para hoteles pequeños — 600 €</ExampleCallout>

      <div className="space-y-5">
        <TextField
          label="Nombre de tu servicio, producto o idea"
          value={value.name}
          onChange={(v) => onChange({ name: v })}
          placeholder="Ej. Web que consigue reservas para hoteles pequeños"
        />

        <TextArea
          label="¿Qué resultado consigue la persona?"
          hint="El cambio real que nota tu cliente, no la tarea que haces tú."
          value={value.result}
          onChange={(v) => onChange({ result: v })}
          placeholder="Ej. Recibe más reservas directas sin depender solo de los portales"
          example="En vez de “le hago la web”, di “consigue más reservas directas”."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Precio aproximado"
            hint="Aunque sea un rango. Un precio convierte una idea en una oferta."
            value={value.price}
            onChange={(v) => onChange({ price: v })}
            placeholder="Ej. 600 €"
          />

          <div>
            <span className="field-label">¿Qué tipo de oferta es?</span>
            <div className="flex flex-wrap gap-2">
              {OFFER_TYPES.map((t) => {
                const selected = value.type === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onChange({ type: (selected ? '' : t.id) as OfferType })}
                    aria-pressed={selected}
                    className={[
                      'inline-flex items-center gap-1.5 rounded-lg border-2 px-4 py-2.5 text-sm font-bold transition-all',
                      selected
                        ? 'border-ink-800 bg-ink-800 text-white shadow-soft'
                        : 'border-ink-100 bg-cream-50/60 text-ink-600 hover:border-ink-200',
                    ].join(' ')}
                  >
                    <span aria-hidden="true">{t.emoji}</span>
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <TextArea
          label="¿Cómo lo explicarías en una frase?"
          optional
          value={value.onePhrase}
          onChange={(v) => onChange({ onePhrase: v })}
          placeholder="Ej. Monto webs que llenan las habitaciones de hoteles pequeños en una semana"
        />
      </div>
    </StepShell>
  )
}
