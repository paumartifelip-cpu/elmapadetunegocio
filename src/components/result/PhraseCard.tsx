import { useState } from 'react'
import { Check, Copy, Quote, RefreshCw } from 'lucide-react'
import type { BusinessPhrase } from '../../lib/logic'

interface PhraseCardProps {
  phrase: BusinessPhrase
  override?: string
  onChange: (value: string | undefined) => void
  editable: boolean
}

export function PhraseCard({ phrase, override, onChange, editable }: PhraseCardProps) {
  const [copied, setCopied] = useState(false)
  const value = override ?? phrase.text
  const isEdited = override != null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <div className="print-card relative overflow-hidden rounded-2xl bg-ink-900 p-6 text-white shadow-card sm:p-8">
      <Quote className="absolute -right-2 -top-2 h-24 w-24 text-white/5" aria-hidden="true" />
      <div className="relative">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-sun-300">Mi frase de negocio</p>

        {editable ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-2xl border-2 border-white/15 bg-white/5 px-4 py-3 text-xl font-bold leading-snug text-white placeholder:text-white/40 focus:border-sun-300 focus:bg-white/10 focus:outline-none sm:text-2xl"
            aria-label="Frase de negocio editable"
          />
        ) : (
          <p className="text-xl font-bold leading-snug sm:text-2xl">{value}</p>
        )}

        {!isEdited && !phrase.complete && (
          <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm text-sun-100">
            <span className="font-bold">Para redondearla, completa:</span>{' '}
            {phrase.missing.join(' · ')}
          </div>
        )}

        <div className="no-print mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-lg bg-sun-400 px-4 py-2 text-sm font-extrabold text-ink-900 transition-colors hover:bg-sun-300"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? '¡Copiada!' : 'Copiar frase'}
          </button>
          {editable && isEdited && (
            <button
              onClick={() => onChange(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4" />
              Volver a la automática
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
