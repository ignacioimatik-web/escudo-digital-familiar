import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spaced?: boolean
}

export function Section({ spaced = true, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(spaced && "py-12 sm:py-16 md:py-20 lg:py-28", className)}
      {...props}
    >
      {children}
    </section>
  )
}
