import { useCallback, useState } from 'react'
import type { BusinessData, Screen, StartingPoint } from './types'
import { EXAMPLE_DATA, emptyBusinessData } from './content'
import { completion } from './lib/logic'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Welcome } from './components/Welcome'
import { Situation } from './components/Situation'
import { StepFlow } from './components/StepFlow'
import { Result } from './components/Result'
import { ConfirmDialog } from './components/ConfirmDialog'

const STORAGE_KEY = 'mapa-negocio:v1'

const TOTAL_STEPS = 5

/** Primer paso sin completar, para poder retomar donde se dejó */
function firstIncompleteStep(d: BusinessData): number {
  const filled = (o: object) => Object.values(o).some((v) => typeof v === 'string' && v.trim().length > 0)
  const done = [
    filled(d.sell),
    filled(d.audience),
    filled(d.delivery),
    d.ai.selected.length > 0 || d.ai.custom.some((c) => c.trim().length > 0),
    filled(d.human),
  ]
  const idx = done.findIndex((x) => !x)
  return idx === -1 ? TOTAL_STEPS - 1 : idx
}

export default function App() {
  const [data, setData, clearData] = useLocalStorage<BusinessData>(STORAGE_KEY, emptyBusinessData())
  const [screen, setScreen] = useState<Screen>('welcome')
  const [step, setStep] = useState(0)
  const [exampleMode, setExampleMode] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const pct = completion(data)
  const hasProgress = pct > 0

  const go = useCallback((next: Screen) => {
    setScreen(next)
    window.scrollTo({ top: 0 })
  }, [])

  // --- Navegación principal ---
  const startFresh = () => {
    setExampleMode(false)
    go('situation')
  }

  const handleCreate = () => {
    // "Crear mi mapa": si ya hay datos, pedimos confirmación antes de reiniciar
    if (hasProgress) setConfirmReset(true)
    else startFresh()
  }

  const handleResume = () => {
    setExampleMode(false)
    if (!data.startingPoint) {
      go('situation')
    } else {
      setStep(firstIncompleteStep(data))
      go('steps')
    }
  }

  const selectSituation = (sp: StartingPoint) => setData({ ...data, startingPoint: sp })

  const beginSteps = () => {
    setStep(0)
    go('steps')
  }

  const finishSteps = () => {
    setExampleMode(false)
    go('result')
  }

  const editStep = (n: number) => {
    setExampleMode(false)
    setStep(Math.max(0, Math.min(TOTAL_STEPS - 1, n)))
    go('steps')
  }

  // --- Ejemplo ---
  const viewExample = () => {
    setExampleMode(true)
    go('result')
  }
  const exitExample = () => {
    setExampleMode(false)
    handleCreate()
  }
  const loadExampleIntoForm = () => {
    setData({ ...EXAMPLE_DATA })
    setExampleMode(false)
    go('result')
  }

  // --- Reinicio ---
  const doReset = () => {
    clearData()
    setData(emptyBusinessData())
    setStep(0)
    setConfirmReset(false)
    setExampleMode(false)
    go('situation')
  }

  // --- Descargar / imprimir ---
  const download = () => {
    window.print()
  }

  return (
    <div className="min-h-screen">
      {screen === 'welcome' && (
        <Welcome
          onStart={handleCreate}
          onExample={viewExample}
          onLoadExample={loadExampleIntoForm}
          hasProgress={hasProgress}
          completionPct={pct}
          onResume={handleResume}
        />
      )}

      {screen === 'situation' && (
        <Situation
          value={data.startingPoint}
          onSelect={selectSituation}
          onNext={beginSteps}
          onBack={() => go('welcome')}
        />
      )}

      {screen === 'steps' && (
        <StepFlow
          data={data}
          onChange={setData}
          step={step}
          onStepChange={setStep}
          onExitToSituation={() => go('situation')}
          onFinish={finishSteps}
          onReset={() => setConfirmReset(true)}
        />
      )}

      {screen === 'result' && (
        <Result
          data={exampleMode ? EXAMPLE_DATA : data}
          onChange={setData}
          onEditStep={editStep}
          onReset={() => setConfirmReset(true)}
          onDownload={download}
          isExample={exampleMode}
          onExitExample={exitExample}
        />
      )}

      <ConfirmDialog
        open={confirmReset}
        title="¿Empezar de nuevo?"
        message="Se borrarán todas tus respuestas guardadas en este dispositivo. Esta acción no se puede deshacer."
        confirmLabel="Sí, empezar de nuevo"
        cancelLabel="Cancelar"
        onConfirm={doReset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  )
}
