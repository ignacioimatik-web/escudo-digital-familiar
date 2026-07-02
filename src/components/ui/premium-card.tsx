"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PremiumCardProps {
  hover?: boolean
  variant?: "default" | "glass"
  className?: string
  children?: React.ReactNode
  id?: string
  style?: React.CSSProperties
}

export function PremiumCard({
  hover = true,
  variant = "default",
  className,
  children,
  ...props
}: PremiumCardProps) {
  const baseClasses = "group relative rounded-2xl border p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300"
  const variantClasses = variant === "glass"
    ? "border-white/20 bg-white/70 backdrop-blur-md"
    : "border-border/60 bg-card"

  if (!hover) {
    return (
      <div
        className={cn(baseClasses, variantClasses, className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses,
        "hover:shadow-lg hover:shadow-brand-500/10 hover:border-brand-200/80",
        variant === "glass" && "hover:bg-white/80 hover:border-white/30 hover:shadow-xl hover:shadow-brand-500/5",
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
