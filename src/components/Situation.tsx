import { ArrowRight, Check } from 'lucide-react'
import type { StartingPoint } from '../types'
import { STARTING_POINTS } from '../content'
import { startingPointIcons } from './icons'
import { TopBar } from './TopBar'

interface SituationProps {
  value: StartingPoint | null
  onSelect: (value: StartingPoint) => void
  onNext: () => void
  onBack: () => void
}

const accentRing: Record<string, string> = {
  sun: 'ring-sun-400 bg-sun-100/60',
  coral: 'ring-coral-400 bg-coral-100/50',
  ink: 'ring-ink-500 bg-ink-50',
}
const accentIcon: Record<string, string> = {
  sun: 'bg-sun-200 text-ink-800',
  coral: 'bg-coral-200 text-coral-600',
  ink: 'bg-ink-100 text-ink-700',
}

export function Situation({ value, onSelect, onNext, onBack }: SituationProps) {
  return (
    <div>
      <TopBar onBack={onBack} backLabel="Inicio" />
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6 sm:py-12">
        <div className="animate-fade-up mb-8 text-center">
          <span className="chip mb-4">Antes de empezar</span>
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">¿Dónde estás ahora?</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600">
            Elige la opción que más se parece a tu momento. Así podré darte consejos que encajen contigo.
          </p>
        </div>

        <div className="stagger space-y-3">
          {STARTING_POINTS.map((opt) => {
            const Icon = startingPointIcons[opt.iconKey]
            const selected = value === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelect(opt.id)}
                className={[
                  'card flex w-full items-center gap-4 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift',
                  selected ? `ring-2 ${accentRing[opt.accent]}` : 'ring-ink-900/5',
                ].join(' ')}
                aria-pressed={selected}
              >
                <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${accentIcon[opt.accent]}`}>
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold leading-snug text-ink-900">{opt.title}</p>
                  <p className="mt-0.5 text-ink-600">{opt.text}</p>
                </div>
                <div
                  className={[
                    'flex h-7 w-7 flex-none items-center justify-center rounded-full border-2 transition-all',
                    selected ? 'border-ink-800 bg-ink-800 text-white' : 'border-ink-200 text-transparent',
                  ].join(' ')}
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={onNext} disabled={!value} className="btn-primary text-lg">
            Empezar mi mapa
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
