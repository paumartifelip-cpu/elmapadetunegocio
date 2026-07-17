import { ArrowRight, Compass, Download, ListChecks, Pencil, RotateCcw, Sparkles } from 'lucide-react'
import type { BusinessData } from '../types'
import {
  buildPhrase,
  centerLabel,
  completion,
  computeIndicators,
  mapNodes,
  nextSteps,
  priorityBlock,
} from '../lib/logic'
import { Brand } from './Brand'
import { MindMap } from './MindMap'
import { DiagnosticBar } from './result/DiagnosticBar'
import { PhraseCard } from './result/PhraseCard'

interface ResultProps {
  data: BusinessData
  onChange: (next: BusinessData) => void
  onEditStep: (step: number) => void
  onReset: () => void
  onDownload: () => void
  isExample?: boolean
  onExitExample?: () => void
}

function SectionTitle({ n, title, subtitle }: { n: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink-800 text-sm font-bold text-sun-300">
        {n}
      </span>
      <div>
        <h3 className="text-xl font-bold leading-tight text-ink-900 sm:text-2xl">{title}</h3>
        {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
      </div>
    </div>
  )
}

export function Result({
  data,
  onChange,
  onEditStep,
  onReset,
  onDownload,
  isExample = false,
  onExitExample,
}: ResultProps) {
  const indicators = computeIndicators(data)
  const phrase = buildPhrase(data)
  const priority = priorityBlock(data.startingPoint)
  const steps = nextSteps(data)
  const nodes = mapNodes(data)
  const center = centerLabel(data)
  const pct = completion(data)

  const editStep = isExample ? undefined : onEditStep

  return (
    <div className="min-h-screen">
      {/* Cabecera de acciones (no se imprime) */}
      <header className="no-print sticky top-0 z-30 border-b border-ink-900/5 bg-cream-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Brand compact />
          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isExample && (
              <button onClick={() => onEditStep(0)} className="btn-quiet" title="Editar respuestas">
                <Pencil className="h-4 w-4" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            )}
            <button onClick={onDownload} className="btn-primary px-4 py-2.5 text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">Descargar mapa</span>
              <span className="xs:hidden sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </header>

      {isExample && (
        <div className="no-print bg-coral-100 text-ink-800">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-2.5 text-center text-sm font-bold">
            <span>Estás viendo un ejemplo de un negocio ficticio.</span>
            <button onClick={onExitExample} className="inline-flex items-center gap-1 rounded-lg bg-ink-800 px-4 py-1.5 font-extrabold text-white">
              Crear el mío
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <main className="print-area mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Hero */}
        <div className="animate-fade-up mb-10 text-center">
          <span className="chip mb-3 bg-sun-200 text-ink-800">
            <Sparkles className="h-3.5 w-3.5" />
            Tu mapa está listo
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-5xl">Mi mapa de negocio</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-ink-600">
            Esto es tu negocio de un vistazo. Úsalo para explicarlo, para decidir y para dar el siguiente paso con la
            cabeza más ordenada.
          </p>
          {!isExample && (
            <p className="mt-3 text-sm font-semibold text-ink-400">
              {pct}% completado · Se guarda solo en este dispositivo
            </p>
          )}
        </div>

        {/* 1. Mapa mental */}
        <section className="mb-14">
          <MindMap center={center} nodes={nodes} onEditStep={editStep} />
        </section>

        {/* 2. Frase de negocio */}
        <section className="mb-12">
          <PhraseCard
            phrase={phrase}
            override={data.phraseOverride}
            editable={!isExample}
            onChange={(v) => onChange({ ...data, phraseOverride: v })}
          />
        </section>

        {/* 3. Diagnóstico */}
        <section className="mb-12">
          <SectionTitle n={1} title="Diagnóstico" subtitle="Una foto rápida, no una nota de examen." />
          <div className="grid gap-4 md:grid-cols-3">
            {indicators.map((ind, i) => (
              <DiagnosticBar key={ind.key} indicator={ind} delay={i * 180} />
            ))}
          </div>
        </section>

        {/* 4. Prioridad recomendada */}
        <section className="mb-12">
          <SectionTitle n={2} title="Tu prioridad ahora" />
          <div className="print-card overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
            <div className="flex items-center gap-3 bg-ink-50 px-6 py-4">
              <Compass className="h-6 w-6 flex-none text-ink-700" strokeWidth={2.2} />
              <p className="font-bold text-ink-900">{priority.title}</p>
            </div>
            <div className="px-6 py-5">
              <p className="mb-4 leading-relaxed text-ink-600">{priority.intro}</p>
              <ul className="space-y-2.5">
                {priority.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sun-300 text-[11px] font-bold text-ink-900">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-ink-800">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Tres próximos pasos */}
        <section className="mb-8">
          <SectionTitle n={3} title="Mis tres próximos pasos" subtitle="Concretos y para esta semana." />
          <div className="stagger grid gap-3 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="print-card flex flex-col rounded-2xl border border-coral-100 bg-white p-5 shadow-soft">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-coral-400 text-lg font-bold text-white">
                  {i + 1}
                </span>
                <p className="font-semibold leading-snug text-ink-800">{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-ink-400">
            <ListChecks className="h-4 w-4" />
            Cópialos en una nota del móvil y empieza por el primero.
          </div>
        </section>

        {/* Pie de acciones (no se imprime) */}
        <div className="no-print mt-10 flex flex-col items-center justify-center gap-3 border-t border-ink-900/5 pt-8 sm:flex-row">
          <button onClick={onDownload} className="btn-sun w-full sm:w-auto">
            <Download className="h-5 w-5" />
            Descargar mi mapa (PDF)
          </button>
          {!isExample ? (
            <>
              <button onClick={() => onEditStep(0)} className="btn-ghost w-full sm:w-auto">
                <Pencil className="h-5 w-5" />
                Editar respuestas
              </button>
              <button onClick={onReset} className="btn-quiet">
                <RotateCcw className="h-4 w-4" />
                Empezar de nuevo
              </button>
            </>
          ) : (
            <button onClick={onExitExample} className="btn-primary w-full sm:w-auto">
              Crear mi propio mapa
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <p className="no-print mt-8 text-center text-xs font-semibold text-ink-300">
          El Mapa de tu Negocio · Curso Saber y Cobrar
        </p>
      </main>
    </div>
  )
}
