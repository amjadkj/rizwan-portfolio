"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[rgba(12,2,2,0.85)] pt-20 pb-12 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Top: Large Typographic Brand Authority */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="size-2 rounded-full bg-[#E5484D] shadow-[0_0_8px_#E5484D]" />
              <span className="font-grotesk text-xs uppercase tracking-[0.12em] text-[#ffdad4]">
                Obsidian Crimson
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-[#F5EDED]">
              {siteConfig.name}
            </h2>
            <p className="font-grotesk text-sm uppercase tracking-[0.1em] text-[#BFA7A7] mt-2">
              {siteConfig.role} — Strategic Analytics & Process Engineering
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-grotesk uppercase tracking-wider text-[#F5EDED] transition-all duration-300 hover:border-[#E5484D] hover:bg-[#E5484D]/15 hover:text-[#E5484D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5484D]"
          >
            <span>Back to Top</span>
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Middle: Links and Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10">
          {/* Navigation Directory */}
          <div className="md:col-span-8">
            <span className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-4 font-semibold">
              Site Navigation
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-sans text-sm text-[#dac1c1] hover:text-[#E5484D] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="md:col-span-4 flex md:justify-end">
            <div>
              <span className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-4 font-semibold md:text-right">
                Connect
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.socials.find((s) => s.id === "linkedin")?.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-[#F5EDED] transition hover:border-[#E5484D] hover:bg-[#E5484D]/10 hover:text-[#E5484D]"
                >
                  <FaLinkedinIn className="size-4" />
                </a>
                <a
                  href={siteConfig.socials.find((s) => s.id === "github")?.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-[#F5EDED] transition hover:border-[#E5484D] hover:bg-[#E5484D]/10 hover:text-[#E5484D]"
                >
                  <FaGithub className="size-4" />
                </a>
                <a
                  href={siteConfig.socials.find((s) => s.id === "instagram")?.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-[#F5EDED] transition hover:border-[#E5484D] hover:bg-[#E5484D]/10 hover:text-[#E5484D]"
                >
                  <FaInstagram className="size-4" />
                </a>
                <a
                  href={siteConfig.socials.find((s) => s.id === "mail")?.href || "#"}
                  aria-label="Email"
                  className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-[#F5EDED] transition hover:border-[#E5484D] hover:bg-[#E5484D]/10 hover:text-[#E5484D]"
                >
                  <Mail className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Architectural Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-grotesk text-[#9B8888]">
          <p>
            ©{siteConfig.name}. All analytical methodologies & rights
            reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed according to the <span className="text-[#ffdad4]">Obsidian Crimson</span> design
            specification.
          </p>
        </div>
      </div>
    </footer>
  );
}
