import { ArrowRight, Eye, Play, ShoppingBag, Users, PackageCheck, Bot, HandHeart } from 'lucide-react'
import { Brand } from './Brand'
import { MapIllustration } from './MapIllustration'

interface WelcomeProps {
  onStart: () => void
  onExample: () => void
  onLoadExample: () => void
  hasProgress: boolean
  completionPct: number
  onResume: () => void
}

const pieces = [
  { icon: ShoppingBag, label: 'Lo que vendes', color: 'text-sun-500' },
  { icon: Users, label: 'A quién ayudas', color: 'text-coral-500' },
  { icon: PackageCheck, label: 'Cómo lo entregas', color: 'text-ink-500' },
  { icon: Bot, label: 'Qué hace la IA', color: 'text-coral-500' },
  { icon: HandHeart, label: 'Lo que haces tú', color: 'text-sun-500' },
]

export function Welcome({
  onStart,
  onExample,
  onLoadExample,
  hasProgress,
  completionPct,
  onResume,
}: WelcomeProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-10 flex items-center justify-between sm:mb-14">
        <Brand />
        <button onClick={onExample} className="btn-quiet hidden sm:inline-flex">
          <Eye className="h-4 w-4" />
          Ver un ejemplo
        </button>
      </header>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Texto */}
        <div className="animate-fade-up order-2 lg:order-1">
          <span className="chip mb-5 bg-coral-100 text-coral-600">Pon orden a tu idea en 10 minutos</span>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
            Tu negocio no está desordenado.{' '}
            <span className="relative whitespace-nowrap text-ink-700">
              <span className="relative z-10">Solo le falta un plano.</span>
              <svg
                className="absolute -bottom-1 left-0 z-0 h-3 w-full text-sun-300"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 8 C 80 2, 220 2, 298 7" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            En menos de 10 minutos vas a poner en orden qué vendes, a quién ayudas, cómo lo entregas, qué puede hacer la
            IA por ti y qué solo puedes hacer tú.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {hasProgress ? (
              <>
                <button onClick={onResume} className="btn-primary text-lg">
                  Seguir donde lo dejé
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={onStart} className="btn-ghost text-lg">
                  <Play className="h-4 w-4" />
                  Empezar de nuevo
                </button>
              </>
            ) : (
              <>
                <button onClick={onStart} className="btn-primary text-lg">
                  Crear mi mapa
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={onExample} className="btn-ghost text-lg">
                  <Eye className="h-5 w-5" />
                  Ver un ejemplo
                </button>
              </>
            )}
          </div>

          {hasProgress ? (
            <p className="mt-4 text-sm font-semibold text-ink-500">
              Tienes un mapa a medias ({completionPct}% completado). Se ha guardado solo en este dispositivo.
            </p>
          ) : (
            <button onClick={onLoadExample} className="btn-quiet mt-4 -ml-1">
              O carga un ejemplo completo y edítalo a tu gusto
            </button>
          )}
        </div>

        {/* Ilustración */}
        <div className="animate-pop order-1 flex justify-center lg:order-2">
          <div className="relative w-full max-w-md">
            <div className="card p-6 sm:p-8">
              <MapIllustration className="w-full" />
            </div>
            <div className="absolute -right-3 -top-3 rotate-6 rounded-2xl bg-sun-400 px-4 py-2 text-sm font-bold text-ink-900 shadow-soft">
              ¡Tu plano!
            </div>
          </div>
        </div>
      </div>

      {/* Las cinco piezas */}
      <div className="stagger mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {pieces.map((p) => (
          <div key={p.label} className="card flex items-center gap-3 p-4">
            <p.icon className={`h-6 w-6 flex-none ${p.color}`} strokeWidth={2.2} />
            <span className="text-sm font-bold text-ink-700">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
