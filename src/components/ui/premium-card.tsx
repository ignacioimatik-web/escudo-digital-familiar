"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PremiumCardProps {
  hover?: boolean
  className?: string
  children?: React.ReactNode
  id?: string
  style?: React.CSSProperties
}

export function PremiumCard({
  hover = true,
  className,
  children,
  ...props
}: PremiumCardProps) {
  if (!hover) {
    return (
      <div
        className={cn(
          "group relative rounded-2xl border border-border/60 bg-card p-5 sm:p-6 md:p-8 shadow-sm",
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl border border-border/60 bg-card p-5 sm:p-6 md:p-8 shadow-sm",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-brand-500/5 hover:border-brand-200",
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
