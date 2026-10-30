"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { getIcon } from "./iconMap";
import type { StakeholdersData } from "@/types/project";

const DEFAULT_STAKEHOLDER_ICONS = [
  "Hash",
  "ShieldCheck",
  "Compass",
  "Route",
  "ClipboardList",
  "BarChart3",
];

export default function ProjectStakeholders({
  heading = "Stakeholder Engagement & Requirements Elicitation",
  tag,
  panelTitle,
  panelTagline,
  image,
  points = [],
}: StakeholdersData) {
  const shouldReduceMotion = useReducedMotion();
  const validPoints = points.slice(0, 6);
  const hasImage = Boolean(image?.src);

  const cardSlideLeft: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -32,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardsContainer: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardItem: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="stakeholders"
      aria-labelledby="stakeholders-heading"
      className="relative w-full py-20 lg:py-[120px] px-5 md:px-8 lg:px-12"
    >
      <div className="max-w-[1280px] mx-auto">
        <div
          className={
            hasImage
              ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start"
              : "w-full"
          }
        >
          {/* ── Left: Image Card (sticky on desktop) ── */}
          {hasImage && (
            <motion.div
              variants={cardSlideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="lg:col-span-5 w-full lg:sticky lg:top-[120px]"
            >
              <div className="relative aspect-[3/4] min-h-[460px] md:min-h-[520px] lg:min-h-[640px] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] bg-[#180202]">
                {/* Background Image anchored to bottom */}
                <motion.div
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    scale: shouldReduceMotion ? 1 : 1.06,
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1.2,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || panelTitle || "Stakeholders panel"}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-bottom"
                  />
                </motion.div>

                {/* Scrim Gradient */}
                <div
                  aria-hidden="true"
                  className={
                    panelTitle || panelTagline
                      ? "absolute inset-0 bg-[linear-gradient(180deg,#180202_0%,rgba(24,2,2,0.9)_35%,rgba(24,2,2,0.4)_60%,transparent_100%)] pointer-events-none"
                      : "absolute inset-0 bg-[linear-gradient(180deg,rgba(24,2,2,0.7)_0%,rgba(24,2,2,0.3)_40%,transparent_100%)] pointer-events-none"
                  }
                />

                {/* Top-Right Tag Chip */}
                {tag && (
                  <div className="absolute top-6 right-6 z-10 inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-white/[0.04] border border-white/[0.12] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <span className="size-1.5 rounded-full bg-[#E5484D]" />
                    <span className="font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F5EDED]">
                      {tag}
                    </span>
                  </div>
                )}

                {/* Panel Title & Tagline */}
                {(panelTitle || panelTagline) && (
                  <div className="absolute top-10 left-8 right-8 z-10 text-left">
                    {panelTitle && (
                      <h3 className="font-sans font-bold text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-[-0.03em] text-[#F5EDED]">
                        {panelTitle}
                      </h3>
                    )}
                    {panelTagline && (
                      <p className="mt-3 font-sans text-[15px] leading-[24px] text-[#BFA7A7] max-w-[340px]">
                        {panelTagline}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Right Column: Heading and Point Cards ── */}
          <div className={hasImage ? "lg:col-span-7 flex flex-col" : "w-full"}>
            {/* Heading */}
            <motion.h2
              id="stakeholders-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="font-sans font-semibold text-[clamp(28px,3.2vw,40px)] leading-[1.15] tracking-[-0.02em] text-[#F5EDED] text-left max-w-[640px] mb-12"
            >
              {heading}
            </motion.h2>

            {/* Point Cards Grid */}
            <motion.ul
              variants={cardsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className={
                hasImage
                  ? "grid grid-cols-2 sm:grid-cols-2 gap-4 lg:gap-6"
                  : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              }
              aria-label="Stakeholder engagement points"
            >
              {validPoints.map((point, index) => {
                const IconComponent = getIcon(
                  point.icon || DEFAULT_STAKEHOLDER_ICONS[index % DEFAULT_STAKEHOLDER_ICONS.length]
                );
                const isOddLast =
                  validPoints.length % 2 !== 0 && index === validPoints.length - 1;

                return (
                  <motion.li
                    key={index}
                    variants={cardItem}
                    className={`group relative min-h-[200px] rounded-[24px] p-6 lg:p-7 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] hover:-translate-y-1 flex flex-col justify-between ${
                      hasImage
                        ? isOddLast
                          ? "sm:col-span-2 sm:translate-y-0"
                          : index % 2 === 1
                          ? "sm:translate-y-10"
                          : ""
                        : ""
                    }`}
                  >
                    <div>
                      {/* Icon */}
                      <div className="size-10 rounded-xl bg-[#E5484D]/[0.12] border border-[#E5484D]/[0.30] flex items-center justify-center transition-colors duration-300 group-hover:border-[#E5484D]/60 group-hover:bg-[#E5484D]/20">
                        <IconComponent className="size-5 text-[#E5484D] transition-colors duration-200 group-hover:text-[#F05D62]" />
                      </div>

                      {/* Text */}
                      <p className="mt-6 font-sans text-[10px] md:text-[15px] leading-[24px] text-[#BFA7A7] max-w-[28ch] text-left">
                        {point.text}
                      </p>
                    </div>
                  </motion.li>
                );
              })} 
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

