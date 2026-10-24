"use client";

import * as React from "react";
import Image from "next/image";
import { X, Menu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeSection: string;
}

export function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Prevent scrolling when sheet is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-[#F5EDED] transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#E5484D]/40"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Backdrop & Sheet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="ml-auto flex h-full w-[min(340px,85vw)] flex-col border-l border-white/15 bg-[rgba(24,2,2,0.92)] p-6 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside sheet */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 overflow-hidden rounded-full border border-white/20 bg-white/5 p-0.5 shadow-[0_0_10px_rgba(229,72,77,0.3)]">
                  <Image
                    src="/logo.png"
                    alt={`${siteConfig.name} Logo`}
                    width={32}
                    height={32}
                    className="size-full object-contain rounded-full"
                  />
                </div>
                <span className="font-sans text-sm font-semibold tracking-wide text-[#F5EDED]">
                  {siteConfig.name}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/5 text-[#F5EDED] transition hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Navigation links */}
            <nav aria-label="Mobile Primary" className="flex flex-col gap-2 py-6">
              {siteConfig.nav.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={handleLinkClick}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex items-center justify-between rounded-xl px-4 py-3 text-[17px] font-medium transition-colors",
                      isActive
                        ? "bg-[#E5484D]/15 text-[#E5484D]"
                        : "text-[#F5EDED] hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="size-2 rounded-full bg-[#E5484D] shadow-[0_0_8px_#E5484D]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#E5484D] font-medium text-[#F5EDED] shadow-[0_0_20px_rgba(229,72,77,0.4)] transition hover:bg-[#F05D62]"
              >
                Hire Me
              </a>
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-medium text-[#F5EDED] transition hover:bg-white/10"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
