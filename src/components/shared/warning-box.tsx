import { AlertTriangle } from "lucide-react"

interface WarningBoxProps {
  titulo: string
  descripcion: string
}

export function WarningBox({ titulo, descripcion }: WarningBoxProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-accent-50 border border-accent-100">
      <AlertTriangle className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-slate-900 mb-1">{titulo}</p>
        <p className="text-sm text-slate-600 leading-relaxed">{descripcion}</p>
      </div>
    </div>
  )
}
