"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export function About() {
  const shouldReduceMotion = useReducedMotion();

  // Stagger container for the text block (0.1s stagger between items)
  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Text block items fade and slide from the left (x: -40 to 0)
  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full py-[120px] px-4 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* ── Eyebrow + Heading (full-width, above the grid) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-col gap-6"
        >
          {/* Section Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
            <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
              About Me
            </span>
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            id="about-heading"
            variants={itemVariants}
            className="font-sans text-3xl sm:text-4xl lg:text-3xl font-bold tracking-tight text-[#F5EDED]"
          >
            Turning structured analysis into clear decisions.
          </motion.h2>
        </motion.div>

        {/* ── Two-column grid (description + image) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-end">
          {/* LEFT: DESCRIPTION */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 md:order-1 flex flex-col justify-end gap-6 text-left md:col-span-7"
          >
            {/* Body Copy */}
            <motion.p
              variants={itemVariants}
              className="max-w-[560px] font-sans text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#BFA7A7]"
            >
              MSc International Business Management graduate with experience in
              operational processes, record management, data accuracy and stakeholder
              coordination. Developing practical business analysis skills through
              structured case studies focused on problem definition, requirements
              elicitation, process improvement and data-informed decision-making.
              Experienced in using{" "}
              <span className="font-medium text-[#F5EDED]">Excel</span>,{" "}
              <span className="font-medium text-[#F5EDED]">Power BI</span> and{" "}
              <span className="font-medium text-[#F5EDED]">Power Query</span> to
              organise information, investigate patterns and communicate findings.
            </motion.p>


            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full"
            >
              {/* <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-[16px] bg-[#E5484D] px-7 font-sans text-[15px] font-medium text-[#F5EDED] shadow-[0_0_20px_rgba(229,72,77,0.4)] transition-all duration-300 hover:bg-[#F05D62] hover:shadow-[0_0_28px_rgba(229,72,77,0.6)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#E5484D]/40"
              >
                Book a Call
              </a> */}
              <a
                href="/Rizwan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-[16px] border border-white/[0.12] bg-white/5 px-7 font-sans text-[15px] font-medium text-[#F5EDED] transition-all duration-300 hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/20"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: IMAGE (Cols 8 to 12) */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: "easeOut",
            }}
            className="order-1 md:order-2 w-full md:col-span-5"
          >
            <div className="group relative w-full aspect-[3/4] max-h-[480px]">
              {/* Inner Portrait Image */}
              <Image
                src="/images/riz-abt.png"
                alt={`Portrait of ${siteConfig.name}`}
                fill
                priority={false}
                sizes="(min-width: 1280px) 512px, (min-width: 768px) 42vw, 100vw"
                className="object-contain transition-transform duration-700 ease-out"
              />

              {/* Floating Pill Chips — absolutely positioned around the image */}
              {[
                { label: "PROBLEM DEFINITION", pos: "top-[8%] -left-[10%]" },
                { label: "REQUIREMENTS ELICITATION", pos: "top-[30%] -right-[8%]" },
                { label: "PROCESS IMPROVEMENT", pos: "bottom-[28%] -left-[12%]" },
                { label: "DATA-INFORMED DECISIONS", pos: "bottom-[8%] -right-[6%]" },
              ].map((chip, i) => (
                <motion.span
                  key={chip.label}
                  initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.3 + i * 0.12,
                    ease: "easeOut",
                  }}
                  className={`absolute ${chip.pos} z-10 hidden md:inline-flex rounded-full border border-[#E5484D]/30 bg-[#0a0000]/80 backdrop-blur-sm px-3.5 py-1.5 font-grotesk text-[11px] font-medium tracking-[0.05em] text-[#ffdad4] shadow-[0_0_12px_rgba(229,72,77,0.15)]`}
                >
                  {chip.label}
                </motion.span>
              ))}

              {/* Mobile-only: chips in a row below image */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5 md:hidden">
                {[
                  "PROBLEM DEFINITION",
                  "REQUIREMENTS ELICITATION",
                  "PROCESS IMPROVEMENT",
                  "DATA-INFORMED DECISIONS",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#E5484D]/30 bg-[#E5484D]/12 px-3.5 py-1.5 font-grotesk text-[12px] font-medium tracking-[0.05em] text-[#ffdad4]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
