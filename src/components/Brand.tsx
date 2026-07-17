import { MapPinned } from 'lucide-react'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-ink-800 text-sun-300 shadow-soft">
        <MapPinned className="h-5 w-5" strokeWidth={2.4} />
      </div>
      <div className="leading-none">
        <p className={`font-bold tracking-tight text-ink-900 ${compact ? 'text-sm' : 'text-base'}`}>
          EL MAPA DE TU NEGOCIO
        </p>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-coral-500">
          Curso · Saber y Cobrar
        </p>
      </div>
    </div>
  )
}
