import { useState } from 'react'
import { Bot, Check, Plus, X } from 'lucide-react'
import type { AiData } from '../../types'
import { AUTOMATIONS } from '../../content'
import { automationIcons } from '../icons'
import { StepShell } from '../StepShell'

interface Props {
  value: AiData
  onChange: (patch: Partial<AiData>) => void
}

export function AiStep({ value, onChange }: Props) {
  const [draft, setDraft] = useState('')

  const toggle = (id: string) => {
    const selected = value.selected.includes(id)
      ? value.selected.filter((x) => x !== id)
      : [...value.selected, id]
    onChange({ selected })
  }

  const addCustom = () => {
    const t = draft.trim()
    if (!t) return
    onChange({ custom: [...value.custom, t] })
    setDraft('')
  }

  const removeCustom = (i: number) => {
    onChange({ custom: value.custom.filter((_, idx) => idx !== i) })
  }

  return (
    <StepShell
      icon={Bot}
      accent="coral"
      title="¿Dónde puede trabajar la IA por ti?"
      explanation="La IA no tiene que sustituirte. Tiene que quitarte trabajo repetitivo para que tú te quedes con lo importante."
    >
      <p className="mb-4 text-sm font-bold text-ink-500">
        Marca las que te servirían{' '}
        <span className="font-semibold text-ink-400">
          ({value.selected.length} {value.selected.length === 1 ? 'elegida' : 'elegidas'})
        </span>
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {AUTOMATIONS.map((a) => {
          const Icon = automationIcons[a.iconKey]
          const selected = value.selected.includes(a.id)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              aria-pressed={selected}
              className={[
                'relative flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-0.5',
                selected
                  ? 'border-coral-400 bg-coral-100/50 shadow-soft'
                  : 'border-ink-100 bg-cream-50/50 hover:border-ink-200',
              ].join(' ')}
            >
              <div
                className={[
                  'flex h-11 w-11 flex-none items-center justify-center rounded-2xl transition-colors',
                  selected ? 'bg-coral-400 text-white' : 'bg-ink-100 text-ink-600',
                ].join(' ')}
              >
                <Icon className="h-6 w-6" strokeWidth={2.1} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink-900">{a.name}</p>
                <p className="mt-0.5 text-sm leading-snug text-ink-600">{a.description}</p>
              </div>
              <span
                className={[
                  'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all',
                  selected ? 'border-coral-500 bg-coral-500 text-white' : 'border-ink-200 text-transparent',
                ].join(' ')}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </button>
          )
        })}
      </div>

      {/* Tareas propias */}
      <div className="mt-8">
        <p className="field-label">¿Alguna tarea tuya que te gustaría automatizar?</p>
        <p className="-mt-1 mb-3 text-sm text-ink-500">Añade las que quieras. Piensa en lo que repites cada semana.</p>

        {value.custom.length > 0 && (
          <ul className="mb-3 space-y-2">
            {value.custom.map((t, i) => (
              <li
                key={i}
                className="animate-fade-up flex items-center gap-3 rounded-2xl bg-ink-50 px-4 py-2.5"
              >
                <span className="flex-1 font-semibold text-ink-800">{t}</span>
                <button
                  type="button"
                  onClick={() => removeCustom(i)}
                  className="btn-quiet flex-none text-ink-400 hover:text-coral-500"
                  aria-label={`Quitar “${t}”`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            className="field-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustom()
              }
            }}
            placeholder="Ej. Preparar el resumen semanal para cada cliente"
          />
          <button type="button" onClick={addCustom} disabled={!draft.trim()} className="btn-sun flex-none px-5">
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Añadir</span>
          </button>
        </div>
      </div>
    </StepShell>
  )
}
