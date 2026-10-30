"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { AssessmentData } from "@/types/project";

export default function ProjectAssessment({
  eyebrow = "BUSINESS NEEDS ASSESSMENT",
  heading = "Assessment",
  tagline = "Understand the business problem, establish the project objective, and identify what needs to be investigated",
  description = [],
  image,
}: AssessmentData) {
  const shouldReduceMotion = useReducedMotion();

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

  const leftSlide: Variants = {
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

  const rightSlide: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 32,
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

  const hasDescription = description && description.length > 0;
  const hasImage = Boolean(image?.src);

  return (
    <section
      id="assessment"
      aria-labelledby="assessment-heading"
      className="relative w-full py-20 lg:py-[120px] px-5 md:px-8 lg:px-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ── Centered Heading Block ── */}
        <motion.div
          variants={headingBlockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-[800px] mx-auto"
        >
          {eyebrow !== "" && (
            <motion.div
              variants={textFadeUp}
              className="flex items-center justify-center gap-3 font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#E5484D]"
            >
              <span className="h-[1px] w-6 bg-[#E5484D]/40" aria-hidden="true" />
              <span>{eyebrow}</span>
              <span className="h-[1px] w-6 bg-[#E5484D]/40" aria-hidden="true" />
            </motion.div>
          )}

          <motion.h2
            id="assessment-heading"
            variants={textFadeUp}
            className="mt-3 font-sans font-semibold text-[28px] leading-[36px] md:text-[32px] md:leading-[40px] lg:text-[40px] lg:leading-[48px] tracking-[-0.02em] text-[#F5EDED]"
          >
            {heading}
          </motion.h2>

          {tagline && (
            <motion.p
              variants={textFadeUp}
              className="mt-4 font-sans text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] text-[#BFA7A7] max-w-[640px] mx-auto"
            >
              {tagline}
            </motion.p>
          )}
        </motion.div>

        {/* ── Content Row ── */}
        <div className="mt-16">
          {hasDescription && hasImage ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left: Description */}
              <motion.div
                variants={leftSlide}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-6 space-y-5 max-w-[560px]"
              >
                {description.map((para, index) => (
                  <p
                    key={index}
                    className="font-sans text-[16px] leading-[28px] text-[#BFA7A7]"
                  >
                    {para}
                  </p>
                ))}
              </motion.div>

              {/* Right: Image */}
              <motion.div
                variants={rightSlide}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-6 group"
              >
                <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] bg-white/[0.02]">
                  <Image
                    src={image.src}
                    alt={image.alt || heading}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle bottom scrim to blend */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(24,2,2,0.5)] via-transparent to-transparent pointer-events-none"
                  />
                </div>
              </motion.div>
            </div>
          ) : hasDescription ? (
            // Only Description (Centered)
            <motion.div
              variants={textFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-[720px] mx-auto space-y-5 text-left"
            >
              {description.map((para, index) => (
                <p
                  key={index}
                  className="font-sans text-[16px] leading-[28px] text-[#BFA7A7]"
                >
                  {para}
                </p>
              ))}
            </motion.div>
          ) : hasImage ? (
            // Only Image (Centered)
            <motion.div
              variants={textFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-[720px] mx-auto group"
            >
              <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] bg-white/[0.02]">
                <Image
                  src={image.src}
                  alt={image.alt || heading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(24,2,2,0.5)] via-transparent to-transparent pointer-events-none"
                />
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

