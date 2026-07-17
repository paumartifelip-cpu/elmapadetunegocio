import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Brand } from './Brand'

interface TopBarProps {
  onBack?: () => void
  backLabel?: string
  actions?: ReactNode
}

export function TopBar({ onBack, backLabel = 'Atrás', actions }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-900/5 bg-cream-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          {onBack && (
            <button onClick={onBack} className="btn-quiet flex-none" aria-label={backLabel}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{backLabel}</span>
            </button>
          )}
          <div className="hidden min-w-0 sm:block">
            <Brand compact />
          </div>
        </div>
        {actions && <div className="flex flex-none items-center gap-1">{actions}</div>}
      </div>
    </header>
  )
}
