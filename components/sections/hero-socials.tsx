"use client";

import * as React from "react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Tooltip } from "@/components/ui/tooltip";

const socialsData = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: siteConfig.socials.find((s) => s.id === "linkedin")?.href || "https://linkedin.com",
    icon: FaLinkedinIn,
    dur: 5.0,
    delay: 0,
  },
  {
    id: "github",
    label: "GitHub",
    href: siteConfig.socials.find((s) => s.id === "github")?.href || "https://github.com",
    icon: FaGithub,
    dur: 6.0,
    delay: -1.2,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: siteConfig.socials.find((s) => s.id === "instagram")?.href || "https://instagram.com",
    icon: FaInstagram,
    dur: 5.5,
    delay: -2.4,
  },
  {
    id: "mail",
    label: "Email",
    href: siteConfig.socials.find((s) => s.id === "mail")?.href || "mailto:you@example.com",
    icon: Mail,
    dur: 6.5,
    delay: -3.6,
  },
];

export function HeroSocials() {
  return (
    <div className="absolute left-5 top-[32%] z-40 flex flex-col gap-4 md:right-12 md:top-[34%] md:gap-5">
      {socialsData.map(({ id, label, href, icon: Icon, dur, delay }) => (
        <Tooltip key={id} content={label} side="left">
          <a
            href={href}
            target={id === "mail" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
            className="group grid size-10 md:size-12 place-items-center rounded-full border border-white/12 bg-white/5 text-[#F5EDED] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md animate-[float_6s_ease-in-out_infinite] transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:text-[#E5484D] hover:shadow-[0_12px_40px_-4px_rgba(229,72,77,0.35)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#E5484D]/40"
          >
            <Icon className="size-4 md:size-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </Tooltip>
      ))}
    </div>
  );
}
