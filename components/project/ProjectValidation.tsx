"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { getIcon } from "./iconMap";
import type { ValidationData, ImageData } from "@/types/project";

export default function ProjectValidation({
  heading = "Solution Validation & Continuous Improvement",
  listLabel = "VALIDATION & IMPROVEMENTS",
  images = [],
  points = [],
}: ValidationData) {
  const shouldReduceMotion = useReducedMotion();
  const validImages = images.slice(0, 4);
  const validPoints = points.slice(0, 6);

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

  const collageContainerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const collageTileVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const cardsContainerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
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

  const renderTile = (img: ImageData, index: number, customClass: string) => {
    return (
      <motion.div
        key={index}
        variants={collageTileVariants}
        className={`group relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-500 hover:border-white/20 bg-white/[0.02] ${customClass}`}
      >
        <Image
          src={img.src}
          alt={img.alt || `Validation showcase image ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </motion.div>
    );
  };

  return (
    <section
      id="validation"
      aria-labelledby="validation-heading"
      className="relative w-full py-20 lg:py-[120px] px-5 md:px-8 lg:px-12"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ── Heading ── */}
        <motion.h2
          id="validation-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="font-sans font-semibold text-[clamp(32px,4.5vw,56px)] leading-[1.1] tracking-[-0.03em] text-[#F5EDED] max-w-[900px] mx-auto text-center mb-14"
        >
          {heading}
        </motion.h2>

        {/* ── Collage ── */}
        {validImages.length > 0 && (
          <div className="max-w-[1100px] mx-auto">
            {/* Desktop / Tablet Collage */}
            <motion.div
              variants={collageContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="hidden md:block h-[clamp(320px,38vw,520px)] w-full"
            >
              {validImages.length === 4 ? (
                <div className="grid grid-cols-[1.1fr_1fr_1.1fr] grid-rows-2 gap-2 h-full w-full">
                  {renderTile(validImages[0], 0, "col-start-1 row-span-2 h-full")}
                  {renderTile(validImages[1], 1, "col-start-2 row-start-1 h-full")}
                  {renderTile(validImages[2], 2, "col-start-2 row-start-2 h-full")}
                  {renderTile(validImages[3], 3, "col-start-3 row-span-2 h-full")}
                </div>
              ) : validImages.length === 3 ? (
                <div className="grid grid-cols-[1.2fr_1fr] grid-rows-2 gap-2 h-full w-full">
                  {renderTile(validImages[0], 0, "col-start-1 row-span-2 h-full")}
                  {renderTile(validImages[1], 1, "col-start-2 row-start-1 h-full")}
                  {renderTile(validImages[2], 2, "col-start-2 row-start-2 h-full")}
                </div>
              ) : validImages.length === 2 ? (
                <div className="grid grid-cols-2 gap-2 h-full w-full">
                  {renderTile(validImages[0], 0, "h-full")}
                  {renderTile(validImages[1], 1, "h-full")}
                </div>
              ) : (
                <div className="w-full h-full">
                  {renderTile(validImages[0], 0, "h-full aspect-video")}
                </div>
              )}
            </motion.div>

            {/* Mobile Collage */}
            <motion.div
              variants={collageContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="block md:hidden w-full"
            >
              {validImages.length === 1 ? (
                renderTile(validImages[0], 0, "w-full aspect-video")
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  {validImages.map((img, idx) => {
                    const isThreeFirst = validImages.length === 3 && idx === 0;
                    return renderTile(
                      img,
                      idx,
                      isThreeFirst
                        ? "col-span-2 aspect-[4/3]"
                        : "aspect-square"
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ── List Label ── */}
        {listLabel !== "" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center justify-center gap-2 mt-10 mb-6"
          >
            <span className="size-1.5 rounded-full bg-[#E5484D]" />
            <span className="font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F5EDED]">
              {listLabel}
            </span>
          </motion.div>
        )}

        {/* ── Point Cards ── */}
        {validPoints.length > 0 && (
          <motion.ul
            variants={cardsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            aria-label="Validation points"
          >
            {validPoints.map((point, index) => {
              const IconComponent = getIcon(point.icon || "CheckCircle2");

              return (
                <motion.li
                  key={index}
                  variants={cardVariants}
                  className="group rounded-[24px] p-5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.20] hover:shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center gap-3.5">
                      {/* Icon chip */}
                      <div className="size-10 shrink-0 rounded-xl bg-[#E5484D]/[0.12] border border-[#E5484D]/[0.30] flex items-center justify-center transition-colors duration-300 group-hover:border-[#E5484D]/60 group-hover:bg-[#E5484D]/20">
                        <IconComponent className="size-[18px] text-[#E5484D] transition-colors duration-200 group-hover:text-[#F05D62]" />
                      </div>

                      {/* Title */}
                      <h3 className="font-sans font-semibold text-[15px] leading-[22px] text-[#F5EDED] text-left">
                        {point.title}
                      </h3>
                    </div>

                    {/* Description Block */}
                    {point.text && (
                      <div className="mt-4 rounded-2xl bg-black/25 border border-white/[0.05] py-3 px-4 text-left">
                        <p className="font-sans text-[13px] leading-[20px] text-[#BFA7A7]">
                          {point.text}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

