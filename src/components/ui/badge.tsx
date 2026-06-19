import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-100 text-brand-700",
        cyan: "bg-cyan-100 text-cyan-500",
        accent: "bg-accent-100 text-accent-500",
        success: "bg-success-100 text-success-500",
        outline: "border border-border text-slate-600",
        muted: "bg-slate-100 text-slate-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ variant, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant })} {...props} />
  )
}
