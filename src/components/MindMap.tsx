import { Bot, HandHeart, PackageCheck, Pencil, ShoppingBag, Users, type LucideIcon } from 'lucide-react'
import type { MapNode } from '../lib/logic'

type NodeKey = MapNode['key']

interface Style {
  icon: LucideIcon
  dot: string // color del punto/línea
  chip: string // fondo del icono
  ring: string // borde de la tarjeta
}

const STYLES: Record<NodeKey, Style> = {
  sell: { icon: ShoppingBag, dot: '#f5ae12', chip: 'bg-sun-200 text-ink-800', ring: 'border-sun-200' },
  audience: { icon: Users, dot: '#ff6f5c', chip: 'bg-coral-200 text-coral-600', ring: 'border-coral-200' },
  delivery: { icon: PackageCheck, dot: '#5573c9', chip: 'bg-ink-100 text-ink-700', ring: 'border-ink-200' },
  ai: { icon: Bot, dot: '#ff6f5c', chip: 'bg-coral-200 text-coral-600', ring: 'border-coral-200' },
  human: { icon: HandHeart, dot: '#f5ae12', chip: 'bg-sun-200 text-ink-800', ring: 'border-sun-200' },
}

const STEP_OF: Record<NodeKey, number> = { sell: 0, audience: 1, delivery: 2, ai: 3, human: 4 }

// Posiciones radiales (centro de cada tarjeta) en % del contenedor, para escritorio
const POS: Record<NodeKey, { x: number; y: number }> = {
  sell: { x: 22, y: 18 },
  audience: { x: 78, y: 18 },
  delivery: { x: 87, y: 60 },
  ai: { x: 13, y: 60 },
  human: { x: 50, y: 89 },
}
const HUB = { x: 50, y: 46 }

interface MindMapProps {
  center: string
  nodes: MapNode[]
  onEditStep?: (step: number) => void
}

function NodeCard({
  node,
  onEdit,
  compact = false,
  className = '',
}: {
  node: MapNode
  onEdit?: () => void
  compact?: boolean
  className?: string
}) {
  const s = STYLES[node.key]
  const Icon = s.icon
  const lines = node.lines.slice(0, compact ? 3 : 4)
  return (
    <div className={`print-card group relative rounded-2xl border bg-white p-4 shadow-soft ${s.ring} ${className}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-xl ${s.chip}`}>
          <Icon className="h-4 w-4" strokeWidth={2.3} />
        </span>
        <h4 className="truncate text-sm font-bold uppercase tracking-wide text-ink-800">{node.title}</h4>
        {onEdit && (
          <button
            onClick={onEdit}
            className="no-print ml-auto text-ink-300 opacity-0 transition-opacity hover:text-ink-700 group-hover:opacity-100"
            aria-label={`Editar ${node.title}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
      </div>
      {node.filled ? (
        <ul className="space-y-1">
          {lines.map((line, i) => (
            <li
              key={i}
              className={`text-sm leading-snug text-ink-700 ${compact ? 'truncate' : 'break-words'}`}
            >
              {i === 0 ? <span className="font-bold text-ink-900">{line}</span> : line}
            </li>
          ))}
        </ul>
      ) : (
        <button
          onClick={onEdit}
          className="text-sm font-semibold italic text-ink-400 hover:text-ink-600"
          disabled={!onEdit}
        >
          Aún por completar…
        </button>
      )}
    </div>
  )
}

function Hub({ center }: { center: string }) {
  return (
    <div className="print-card rounded-2xl bg-ink-900 p-5 text-center shadow-lift ring-4 ring-white">
      <p className="text-[11px] font-bold uppercase tracking-widest text-sun-300">Mi negocio</p>
      <p className="mt-1 line-clamp-3 break-words text-lg font-bold leading-tight text-white">{center}</p>
    </div>
  )
}

export function MindMap({ center, nodes, onEditStep }: MindMapProps) {
  const editOf = (key: NodeKey) => (onEditStep ? () => onEditStep(STEP_OF[key]) : undefined)

  return (
    <>
      {/* ---- Escritorio: radial con conectores ---- */}
      <div className="relative mx-auto hidden aspect-[16/10] w-full max-w-4xl lg:block">
        <svg
          viewBox="0 0 160 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {nodes.map((n) => {
            const p = POS[n.key]
            return (
              <line
                key={n.key}
                x1={(HUB.x / 100) * 160}
                y1={(HUB.y / 100) * 100}
                x2={(p.x / 100) * 160}
                y2={(p.y / 100) * 100}
                stroke={STYLES[n.key].dot}
                strokeWidth={0.7}
                strokeLinecap="round"
                strokeDasharray="0.4 2.4"
                opacity={0.9}
              />
            )
          })}
        </svg>

        {/* Hub */}
        <div
          className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <Hub center={center} />
        </div>

        {/* Nodos */}
        {nodes.map((n) => {
          const p = POS[n.key]
          return (
            <div
              key={n.key}
              className="absolute w-[25%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <NodeCard node={n} onEdit={editOf(n.key)} compact />
            </div>
          )
        })}
      </div>

      {/* ---- Móvil/tablet: apilado con espina vertical ---- */}
      <div className="relative mx-auto max-w-xl lg:hidden">
        <div className="mx-auto max-w-sm">
          <Hub center={center} />
        </div>
        <div className="relative mt-2 space-y-3 pt-2">
          <div className="pointer-events-none absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 bg-ink-200" aria-hidden="true" />
          {nodes.map((n) => (
            <div key={n.key} className="relative">
              <div
                className="pointer-events-none absolute -top-3 left-1/2 h-3 w-0.5 -translate-x-1/2"
                style={{ background: STYLES[n.key].dot }}
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -top-[7px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ring-2 ring-white"
                style={{ background: STYLES[n.key].dot }}
                aria-hidden="true"
              />
              <NodeCard node={n} onEdit={editOf(n.key)} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
