import { useEffect, useState } from 'react'
import type { Band, Indicator } from '../../lib/logic'

const bandColor: Record<Band, { bar: string; text: string; label: string }> = {
  low: { bar: 'bg-coral-400', text: 'text-coral-600', label: 'A reforzar' },
  mid: { bar: 'bg-sun-400', text: 'text-sun-500', label: 'En marcha' },
  high: { bar: 'bg-ink-600', text: 'text-ink-700', label: 'Sólido' },
}

export function DiagnosticBar({ indicator, delay = 0 }: { indicator: Indicator; delay?: number }) {
  const c = bandColor[indicator.band]
  // Animar el llenado de la barra al montar
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(indicator.score), 80 + delay)
    return () => clearTimeout(t)
  }, [indicator.score, delay])

  return (
    <div className="print-card rounded-2xl border border-ink-900/5 bg-white p-5 shadow-soft">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h4 className="font-bold leading-tight text-ink-900">{indicator.label}</h4>
        <span className={`text-2xl font-bold tabular-nums ${c.text}`}>{indicator.score}</span>
      </div>

      <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full ${c.bar} transition-[width] duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="mb-3 flex justify-between">
        <span className={`text-xs font-bold uppercase tracking-wide ${c.text}`}>{c.label}</span>
        <span className="text-xs font-bold text-ink-300">/ 100</span>
      </div>

      <p className="text-sm leading-relaxed text-ink-600">{indicator.message}</p>
    </div>
  )
}
