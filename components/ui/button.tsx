"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "ghost" | "glass" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5484D]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050000] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      default:
        "bg-[#E5484D] text-[#F5EDED] hover:bg-[#F05D62] shadow-[0_0_20px_rgba(229,72,77,0.4)] shadow-inner-[inset_0_1px_0_rgba(255,255,255,0.25)] rounded-full",
      primary:
        "bg-[#E5484D] text-[#F5EDED] hover:bg-[#F05D62] shadow-[0_0_20px_rgba(229,72,77,0.4)] shadow-inner-[inset_0_1px_0_rgba(255,255,255,0.25)] rounded-lg hover:shadow-[0_0_30px_rgba(229,72,77,0.6)]",
      secondary:
        "bg-[rgba(255,255,255,0.08)] text-[#F5EDED] hover:bg-[rgba(255,255,255,0.14)] border border-white/10 rounded-lg",
      outline:
        "border border-[#E5484D]/40 text-[#ffdad4] hover:border-[#E5484D] hover:bg-[#E5484D]/10 rounded-lg",
      ghost:
        "text-[#F5EDED] hover:bg-white/10 hover:text-white rounded-lg",
      glass:
        "bg-[rgba(24,2,2,0.75)] border border-white/15 text-[#F5EDED] hover:border-white/30 hover:bg-[rgba(24,2,2,0.9)] backdrop-blur-xl shadow-lg rounded-full",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-13 px-8 text-base",
      icon: "size-11 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
