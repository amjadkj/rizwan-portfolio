"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "left",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const sidePositions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-white/15 bg-[rgba(24,2,2,0.92)] px-2.5 py-1 text-xs font-medium text-[#F5EDED] shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 animate-in fade-in zoom-in-95",
            sidePositions[side],
            className
          )}
        >
          {content}
          <div
            className={cn(
              "absolute size-1.5 rotate-45 border-white/15 bg-[rgba(24,2,2,0.92)]",
              side === "left" && "-right-1 top-1/2 -translate-y-1/2 border-t border-r",
              side === "right" && "-left-1 top-1/2 -translate-y-1/2 border-b border-l",
              side === "top" && "-bottom-1 left-1/2 -translate-x-1/2 border-b border-r",
              side === "bottom" && "-top-1 left-1/2 -translate-x-1/2 border-t border-l"
            )}
          />
        </div>
      )}
    </div>
  );
}
