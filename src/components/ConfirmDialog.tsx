import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Sí, borrar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="animate-fade-in absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="animate-pop relative w-full max-w-sm rounded-2xl border border-black/5 bg-white p-6 shadow-lift">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-coral-100 text-coral-500">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 id="confirm-title" className="text-xl font-bold text-ink-900">
          {title}
        </h3>
        <p className="mt-2 text-ink-600">{message}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button onClick={onCancel} className="btn-ghost">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="btn bg-coral-500 text-white shadow-soft hover:bg-coral-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
