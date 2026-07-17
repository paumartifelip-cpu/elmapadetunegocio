import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type Accent = 'sun' | 'coral' | 'ink' | 'blue'

const accentClasses: Record<Accent, string> = {
  sun: 'bg-sun-200 text-ink-800',
  coral: 'bg-coral-200 text-coral-600',
  ink: 'bg-ink-800 text-white',
  blue: 'bg-ink-100 text-ink-700',
}

interface StepShellProps {
  icon: LucideIcon
  accent: Accent
  title: string
  explanation: string
  children: ReactNode
}

export function StepShell({ icon: Icon, accent, title, explanation, children }: StepShellProps) {
  return (
    <div key={title} className="animate-fade-up">
      <div className="mb-6 flex items-start gap-4">
        <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl shadow-soft ${accentClasses[accent]}`}>
          <Icon className="h-7 w-7" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className="text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{title}</h2>
          <p className="mt-1.5 text-base leading-relaxed text-ink-600">{explanation}</p>
        </div>
      </div>

      <div className="card p-5 sm:p-8">{children}</div>
    </div>
  )
}
