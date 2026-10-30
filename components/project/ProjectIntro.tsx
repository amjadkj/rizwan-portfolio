"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { IntroData } from "@/types/project";

export default function ProjectIntro({
  title,
  description,
  tools,
  image,
  imagePosition = "center",
  backHref = "/#projects",
}: IntroData) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
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

  const pillContainerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const pillVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden flex items-center">
      {/* ── Background Image (z-0) ── */}
      {image?.src && (
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Image
            src={image.src}
            alt={image.alt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </motion.div>
      )}

      {/* ── Scrims (z-1) ── */}
      {/* Desktop/Tablet Horizontal Scrim */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(90deg,rgba(24,2,2,0.92)_0%,rgba(24,2,2,0.70)_40%,rgba(24,2,2,0.15)_75%,transparent_100%)]"
      />

      {/* Mobile Scrim */}
      <div
        aria-hidden="true"
        className="block md:hidden absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(24,2,2,0.30)_0%,rgba(24,2,2,0.85)_70%,#180202_100%)]"
      />

      {/* Vertical Bottom Scrim (blends into next section) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(5,0,0,0.45)_0%,transparent_25%,transparent_70%,#050000_100%)]"
      />

      {/* ── Content (z-2) ── */}
      <div className="relative z-[2] max-w-[1280px] w-full mx-auto px-5 md:px-8 lg:px-12 pt-32 pb-24 md:py-32 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[640px] md:max-w-[560px] lg:max-w-[640px] text-left"
        >
          {/* Back Link */}
          {backHref && (
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-grotesk text-[12px] font-medium uppercase tracking-[0.08em] text-[#BFA7A7] bg-white/[0.05] border border-white/[0.12] backdrop-blur-md transition-all duration-200 hover:text-[#E5484D] hover:border-[#E5484D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5484D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#180202]"
              >
                <span>← Back to Projects</span>
              </Link>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-sans font-bold text-[clamp(36px,6vw,72px)] leading-[1.08] tracking-[-0.03em] text-[#F5EDED]"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={itemVariants}
              className="mt-5 font-sans font-normal text-[18px] leading-[28px] text-[#BFA7A7] max-w-[560px]"
            >
              {description}
            </motion.p>
          )}

          {/* Tools */}
          {tools && tools.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <span className="block font-grotesk text-[11px] font-semibold uppercase tracking-[0.06em] text-[#9B8888]">
                Tools Used
              </span>
              <motion.ul
                variants={pillContainerVariants}
                className="mt-3 flex flex-wrap items-center gap-2"
                aria-label="Technologies and tools used"
              >
                {tools.map((tool) => (
                  <motion.li
                    key={tool}
                    variants={pillVariants}
                    className="rounded-full px-3 py-1 bg-[#E5484D]/[0.12] border border-[#E5484D]/[0.30] backdrop-blur-[8px] font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F5EDED] transition-all duration-200 hover:border-[#E5484D]/60 hover:bg-[#E5484D]/20 hover:-translate-y-0.5"
                  >
                    {tool}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Optional Scroll Cue */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 1 : scrollCueOpacity }}
        className="hidden md:flex absolute bottom-8 left-8 lg:left-12 z-[2] items-center gap-2 font-grotesk text-[11px] uppercase tracking-[0.1em] text-[#9B8888] pointer-events-none"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="size-3.5 text-[#E5484D] animate-bounce" />
      </motion.div>
    </section>
  );
}

