import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import type { BusinessData } from '../types'
import { ProgressBar } from './ProgressBar'
import { TopBar } from './TopBar'
import { SellStep } from './steps/SellStep'
import { AudienceStep } from './steps/AudienceStep'
import { DeliveryStep } from './steps/DeliveryStep'
import { AiStep } from './steps/AiStep'
import { HumanStep } from './steps/HumanStep'

const STEP_LABELS = ['Lo que vendes', 'A quién ayudas', 'Cómo lo entregas', 'La IA', 'Lo que haces tú']
const TOTAL = 5

interface StepFlowProps {
  data: BusinessData
  onChange: (next: BusinessData) => void
  step: number
  onStepChange: (step: number) => void
  onExitToSituation: () => void
  onFinish: () => void
  onReset: () => void
}

/** ¿Tiene el paso algún contenido? Para pintar el progreso y la nota suave. */
function stepHasContent(d: BusinessData, i: number): boolean {
  const filled = (o: object) => Object.values(o).some((v) => typeof v === 'string' && v.trim().length > 0)
  switch (i) {
    case 0:
      return filled(d.sell)
    case 1:
      return filled(d.audience)
    case 2:
      return filled(d.delivery)
    case 3:
      return d.ai.selected.length > 0 || d.ai.custom.some((c) => c.trim().length > 0)
    case 4:
      return filled(d.human)
    default:
      return false
  }
}

export function StepFlow({
  data,
  onChange,
  step,
  onStepChange,
  onExitToSituation,
  onFinish,
  onReset,
}: StepFlowProps) {
  // Al cambiar de paso, subir al inicio del contenido
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const completed = Array.from({ length: TOTAL }, (_, i) => stepHasContent(data, i))
  const isLast = step === TOTAL - 1

  const goBack = () => {
    if (step === 0) onExitToSituation()
    else onStepChange(step - 1)
  }
  const goNext = () => {
    if (isLast) onFinish()
    else onStepChange(step + 1)
  }

  const currentStep = () => {
    switch (step) {
      case 0:
        return <SellStep value={data.sell} onChange={(p) => onChange({ ...data, sell: { ...data.sell, ...p } })} />
      case 1:
        return (
          <AudienceStep
            value={data.audience}
            onChange={(p) => onChange({ ...data, audience: { ...data.audience, ...p } })}
          />
        )
      case 2:
        return (
          <DeliveryStep
            value={data.delivery}
            onChange={(p) => onChange({ ...data, delivery: { ...data.delivery, ...p } })}
          />
        )
      case 3:
        return <AiStep value={data.ai} onChange={(p) => onChange({ ...data, ai: { ...data.ai, ...p } })} />
      case 4:
        return <HumanStep value={data.human} onChange={(p) => onChange({ ...data, human: { ...data.human, ...p } })} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-28">
      <TopBar
        onBack={goBack}
        backLabel={step === 0 ? 'Volver' : 'Atrás'}
        actions={
          <button onClick={onReset} className="btn-quiet" title="Empezar de nuevo">
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Empezar de nuevo</span>
          </button>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <ProgressBar current={step} total={TOTAL} labels={STEP_LABELS} completed={completed} onJump={onStepChange} />

        <div className="mt-8">{currentStep()}</div>

        {!completed[step] && (
          <p className="animate-fade-in mt-5 text-center text-sm font-semibold text-ink-400">
            Puedes continuar aunque lo dejes en blanco, pero cuanto más completes, mejor será tu mapa.
          </p>
        )}
      </div>

      {/* Barra de navegación fija */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button onClick={goBack} className="btn-ghost">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Atrás</span>
          </button>

          <span className="text-sm font-bold text-ink-400">
            {step + 1} / {TOTAL}
          </span>

          {isLast ? (
            <button onClick={goNext} className="btn-sun">
              <Sparkles className="h-5 w-5" />
              Ver mi mapa
            </button>
          ) : (
            <button onClick={goNext} className="btn-primary">
              Siguiente
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
