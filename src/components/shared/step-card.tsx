import { CheckCircle2 } from "lucide-react"

interface StepCardProps {
  numero: number
  titulo: string
  descripcion: string
  nota?: string
}

export function StepCard({ numero, titulo, descripcion, nota }: StepCardProps) {
  return (
    <div className="flex gap-4 p-6 rounded-xl bg-white border border-border/60 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white font-semibold text-sm shrink-0">
        {numero}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-4 w-4 text-success-500" />
          <h3 className="text-base font-semibold text-slate-900">{titulo}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-2">{descripcion}</p>
        {nota && (
          <p className="text-xs text-slate-500 italic mt-3 pt-3 border-t border-border/40">
            {nota}
          </p>
        )}
      </div>
    </div>
  )
}
