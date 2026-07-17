import { useId, useState, type ReactNode } from 'react'
import { ChevronDown, Lightbulb } from 'lucide-react'

interface BaseFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: ReactNode
  example?: string
  optional?: boolean
  maxLength?: number
}

/** Ejemplo desplegable reutilizable */
export function ExampleReveal({ text, label = 'Ver un ejemplo' }: { text: string; label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn-quiet -ml-1 text-coral-500 hover:text-coral-600"
        aria-expanded={open}
      >
        <Lightbulb className="h-4 w-4" />
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="animate-fade-up mt-1 rounded-2xl bg-sun-100/70 px-4 py-3 text-sm font-semibold italic text-ink-700">
          “{text}”
        </p>
      )}
    </div>
  )
}

/** Ejemplo siempre visible, para dar contexto de un vistazo */
export function ExampleCallout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-sun-200 bg-sun-100/60 px-4 py-3">
      <Lightbulb className="mt-0.5 h-5 w-5 flex-none text-sun-500" />
      <p className="text-sm leading-relaxed text-ink-700">
        <span className="font-bold">Ejemplo:</span>{' '}
        <span className="font-semibold italic">{children}</span>
      </p>
    </div>
  )
}

function Labelling({
  id,
  label,
  optional,
  hint,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: ReactNode
}) {
  return (
    <>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-semibold text-ink-300">(opcional)</span>}
      </label>
      {hint && <p className="-mt-1 mb-2 text-sm text-ink-500">{hint}</p>}
    </>
  )
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  example,
  optional,
  maxLength,
}: BaseFieldProps) {
  const id = useId()
  return (
    <div>
      <Labelling id={id} label={label} optional={optional} hint={hint} />
      <input
        id={id}
        type="text"
        className="field-input"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
      {example && <ExampleReveal text={example} />}
    </div>
  )
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  example,
  optional,
  maxLength,
  rows = 3,
}: BaseFieldProps & { rows?: number }) {
  const id = useId()
  return (
    <div>
      <Labelling id={id} label={label} optional={optional} hint={hint} />
      <textarea
        id={id}
        className="field-input min-h-[3.25rem] leading-relaxed"
        rows={rows}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
      {example && <ExampleReveal text={example} />}
    </div>
  )
}
