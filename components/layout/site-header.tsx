"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const SECTION_IDS = siteConfig.nav.map((item) => item.id);

export function SiteHeader() {
  const activeSection = useActiveSection(SECTION_IDS);
  const scrollDir = useScrollDirection();
  const hidden = scrollDir === "down";

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2",
        "transition-[transform,opacity] duration-300 ease-in-out",
        hidden && "-translate-y-[calc(100%+2rem)] opacity-0 pointer-events-none"
      )}
    >
      <div className="flex h-16 items-center justify-between rounded-full border border-white/15 bg-[rgba(24,2,2,0.75)] px-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:px-4">
        {/* Far Left: Identity */}
        <Link
          href="#home"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#E5484D]/40 rounded-full"
        >
          {/* <div className="relative size-9 overflow-hidden rounded-full border border-white/20 bg-white/5 p-0.5 shadow-[0_0_12px_rgba(229,72,77,0.35)] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} Logo`}
              width={36}
              height={36}
              className="size-full object-contain rounded-full"
              priority
            />
          </div> */}
          <div className="flex items-center gap-3">
            <span className="font-sans text-[18px] font-semibold text-[#F5EDED] tracking-tight">
              {siteConfig.name}
            </span>
            <span
              className="hidden lg:block h-5 w-[1px] bg-white/20"
              aria-hidden="true"
            />
            <span className="hidden lg:block font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#BFA7A7]">
              {siteConfig.role}
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[15px] leading-6 font-medium transition-colors duration-200 hover:bg-white/6",
                  isActive
                    ? "text-[#E5484D]"
                    : "text-[#F5EDED] hover:text-white"
                )}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-3 rounded-full bg-[#E5484D]/40 blur-md transition-opacity duration-300"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="flex h-10 items-center justify-center rounded-full bg-[#E5484D] px-5 text-sm font-medium text-[#F5EDED] shadow-[0_0_20px_rgba(229,72,77,0.4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:bg-[#F05D62] hover:shadow-[0_0_28px_rgba(229,72,77,0.6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#E5484D]/40"
          >
            Hire Me
          </a>

          {/* Mobile Sheet Trigger */}
          <MobileNav activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
}
