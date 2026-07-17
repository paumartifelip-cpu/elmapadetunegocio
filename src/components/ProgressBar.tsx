import { Check } from 'lucide-react'

interface ProgressBarProps {
  current: number // índice 0..total-1
  total: number
  labels: string[]
  completed: boolean[]
  onJump: (index: number) => void
}

export function ProgressBar({ current, total, labels, completed, onJump }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-extrabold uppercase tracking-wide text-ink-500">
          Paso {current + 1} de {total}
        </p>
        <p className="text-sm font-bold text-ink-400">{labels[current]}</p>
      </div>

      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const done = completed[i]
          const active = i === current
          const reachable = i <= current || completed[i] || (i > 0 && completed[i - 1])
          return (
            <button
              key={i}
              type="button"
              disabled={!reachable}
              onClick={() => reachable && onJump(i)}
              className="group relative flex-1"
              aria-label={`Ir al paso ${i + 1}: ${labels[i]}`}
              aria-current={active ? 'step' : undefined}
            >
              <span
                className={[
                  'block h-2.5 rounded-full transition-all duration-500',
                  active ? 'bg-ink-800' : done ? 'bg-coral-400' : 'bg-ink-100',
                  reachable ? 'group-hover:brightness-95' : 'cursor-not-allowed',
                ].join(' ')}
              />
            </button>
          )
        })}
      </div>

      {/* Puntos con número/check para escritorio */}
      <div className="mt-3 hidden justify-between sm:flex">
        {labels.map((label, i) => {
          const done = completed[i]
          const active = i === current
          const reachable = i <= current || completed[i] || (i > 0 && completed[i - 1])
          return (
            <button
              key={i}
              type="button"
              disabled={!reachable}
              onClick={() => reachable && onJump(i)}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 text-center"
            >
              <span
                className={[
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold transition-all',
                  active
                    ? 'bg-ink-800 text-white ring-4 ring-ink-100'
                    : done
                      ? 'bg-coral-400 text-white'
                      : 'bg-ink-100 text-ink-400',
                ].join(' ')}
              >
                {done && !active ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`truncate text-[11px] font-bold ${active ? 'text-ink-800' : 'text-ink-400'}`}
                title={label}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
