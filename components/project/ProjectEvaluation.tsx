"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { getIcon } from "./iconMap";
import type { EvaluationData, EvaluationPoint } from "@/types/project";

const DEFAULT_EVALUATION_ICONS = [
  "Scale",
  "AlertTriangle",
  "TrendingUp",
  "Lightbulb",
  "Target",
  "CheckCircle2",
];

export default function ProjectEvaluation({
  eyebrow = "KEY FINDINGS",
  heading = "Solution Evaluation & Recommendations",
  image,
  imageStyle = "free",
  points = [],
}: EvaluationData) {
  const shouldReduceMotion = useReducedMotion();
  const validPoints = points.slice(0, 6);

  const halfIndex = Math.ceil(validPoints.length / 2);
  const leftPoints = validPoints.slice(0, halfIndex);
  const rightPoints = validPoints.slice(halfIndex);

  const headingBlockVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const textFadeUp: Variants = {
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

  const imageVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.92,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.9,
        ease: "easeOut",
      },
    },
  };

  const leftCardSlide: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const rightCardSlide: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const renderCard = (point: EvaluationPoint, overallIndex: number, variant: Variants) => {
    const IconComponent = getIcon(
      point.icon || DEFAULT_EVALUATION_ICONS[overallIndex % DEFAULT_EVALUATION_ICONS.length]
    );

    return (
      <motion.li
        key={overallIndex}
        variants={variant}
        className="group relative rounded-[24px] p-6 pt-10 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] hover:-translate-y-1 text-left"
      >
        {/* Overlapping Icon Chip */}
        <div className="absolute -top-3 left-4 size-11 rounded-[14px] bg-[#E5484D]/[0.12] border border-[#E5484D]/[0.30] flex items-center justify-center transition-colors duration-300 group-hover:border-[#E5484D]/60 group-hover:bg-[#E5484D]/20 shadow-md">
          <IconComponent className="size-5 text-[#E5484D] transition-colors duration-200 group-hover:text-[#F05D62]" />
        </div>

        {/* Title */}
        {point.title && (
          <h3 className="mt-1 font-sans font-semibold text-[18px] leading-[26px] text-[#F5EDED]">
            {point.title}
          </h3>
        )}

        {/* Text */}
        <p
          className={`${
            point.title ? "mt-2" : "mt-1"
          } font-sans text-[14px] leading-[22px] text-[#BFA7A7] max-w-[32ch]`}
        >
          {point.text}
        </p>
      </motion.li>
    );
  };

  return (
    <section
      id="evaluation"
      aria-labelledby="evaluation-heading"
      className="relative w-full py-20 lg:py-[120px] px-5 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ── Heading Block ── */}
        <motion.div
          variants={headingBlockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center max-w-[1000px] mx-auto"
        >
          {eyebrow !== "" && (
            <motion.div
              variants={textFadeUp}
              className="inline-flex items-center gap-2 font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F5EDED] mb-4"
            >
              <span className="size-1.5 rounded-full bg-[#E5484D]" />
              <span>{eyebrow}</span>
            </motion.div>
          )}

          <motion.h2
            id="evaluation-heading"
            variants={textFadeUp}
            className="font-sans font-bold text-[clamp(36px,6vw,88px)] leading-[1.02] tracking-[-0.04em] text-[#F5EDED]"
          >
            {heading}
          </motion.h2>
        </motion.div>

        {/* ── Desktop Stage (3-Column Grid) ── */}
        <div className="mt-16 hidden lg:grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] gap-8 items-center min-h-[580px]">
          {/* Left Column Cards */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.1 }}
            className="flex flex-col justify-between gap-6 h-full py-4"
            aria-label="Evaluation points (first group)"
          >
            {leftPoints.map((pt, idx) => renderCard(pt, idx, leftCardSlide))}
          </motion.ul>

          {/* Center Image & Animated Rings */}
          <div className="relative flex items-center justify-center min-h-[460px] h-full">
            {/* Concentric Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Ring 1 (~60%) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.03, 1],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
                className="absolute w-[60%] aspect-square rounded-full border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(229,72,77,0.10)_0%,transparent_70%)]"
              />

              {/* Ring 2 (~85%) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.03, 1],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.5,
                }}
                className="absolute w-[85%] aspect-square rounded-full border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(229,72,77,0.08)_0%,transparent_70%)]"
              />

              {/* Ring 3 (~115%) */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.03, 1],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 5,
                }}
                className="absolute w-[115%] aspect-square rounded-full border border-white/[0.05] bg-[radial-gradient(ellipse_at_center,rgba(229,72,77,0.05)_0%,transparent_70%)]"
              />
            </div>

            {/* Center Image */}
            {image?.src && (
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className={`relative z-10 w-full ${
                  imageStyle === "framed"
                    ? "aspect-[3/6] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)]"
                    : "aspect-[3/6] flex items-center justify-center"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || heading}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={
                    imageStyle === "framed"
                      ? "object-cover"
                      : "object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
                  }
                />
              </motion.div>
            )}
          </div>

          {/* Right Column Cards (shifted down 48px) */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: shouldReduceMotion ? 0 : 0.1 }}
            className="flex flex-col justify-between gap-6 h-full py-4 translate-y-12"
            aria-label="Evaluation points (second group)"
          >
            {rightPoints.map((pt, idx) =>
              renderCard(pt, halfIndex + idx, rightCardSlide)
            )}
          </motion.ul>
        </div>

        {/* ── Tablet & Mobile Layout (< 1024px) ── */}
        <div className="mt-12 block lg:hidden space-y-10">
          {/* Image with rings */}
          {image?.src && (
            <div className="relative max-w-[520px] mx-auto flex items-center justify-center py-6">
              {/* Rings on Mobile/Tablet */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] aspect-square rounded-full border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(229,72,77,0.10)_0%,transparent_70%)]" />
                <div className="w-[115%] aspect-square rounded-full border border-white/[0.05]" />
              </div>

              <div
                className={`relative z-10 w-full ${
                  imageStyle === "framed"
                    ? "aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)]"
                    : "aspect-[4/3] flex items-center justify-center"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || heading}
                  fill
                  sizes="90vw"
                  className={
                    imageStyle === "framed"
                      ? "object-cover"
                      : "object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
                  }
                />
              </div>
            </div>
          )}

          {/* Cards: 2 cols on tablet, 1 col on mobile */}
          {validPoints.length === 1 ? (
            <ul className="max-w-[360px] mx-auto">
              {renderCard(validPoints[0], 0, textFadeUp)}
            </ul>
          ) : (
            <ul
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
              aria-label="Evaluation points"
            >
              {validPoints.map((pt, idx) => renderCard(pt, idx, textFadeUp))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

