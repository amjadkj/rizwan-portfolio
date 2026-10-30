"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeftRight } from "lucide-react";
import { ImageCompare } from "@/components/ui/image-compare";
import type { ComparisonData, ComparisonSide } from "@/types/project";

export default function ProjectComparison({
  heading,
  tagline,
  old: oldSide,
  new: newSide,
  labels = ["Old", "New"],
  sliderLabel = "Old and new comparison",
  aspectRatio = "16 / 9",
  defaultPosition = 50,
}: ComparisonData) {
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = React.useState(defaultPosition);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const side: "old" | "new" | null =
    position > 50 ? "old" : position < 50 ? "new" : null;

  const handlePositionChange = (pos: number) => {
    setPosition(pos);
    if (!hasInteracted && pos !== 50) {
      setHasInteracted(true);
    }
  };

  const oldPoints = oldSide.points.slice(0, 6);
  const newPoints = newSide.points.slice(0, 6);

  const sectionFadeUp: Variants = {
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

  const frameScaleUp: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 32,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: "easeOut",
      },
    },
  };

  const renderSidePanel = (data: ComparisonSide, isOld: boolean) => {
    const points = isOld ? oldPoints : newPoints;
    const accentColor = isOld ? "#9B8888" : "#E5484D";

    return (
      <motion.div
        key={isOld ? "old-panel" : "new-panel"}
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
              opacity: 0,
              x: isOld ? -16 : 16,
            }
        }
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: shouldReduceMotion ? 0 : 0.35,
            ease: "easeOut",
          },
        }}
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
              opacity: 0,
              x: isOld ? -16 : 16,
              transition: { duration: 0.2, ease: "easeIn" },
            }
        }
        className={`absolute bottom-6 z-20 w-[min(340px,42%)] md:w-[min(300px,42%)] lg:w-[min(340px,42%)] max-h-[calc(100%-48px)] overflow-y-auto p-5 lg:p-6 rounded-[24px] bg-[rgba(24,2,2,0.75)] backdrop-blur-[24px] border border-white/[0.15] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] pointer-events-none ${isOld ? "left-6 text-left" : "right-6 text-left"
          }`}
      >
        {/* Accent Line */}
        <div
          className="h-[3px] w-8 rounded-full mb-3"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        {/* Heading */}
        {data.heading && (
          <h3 className="font-sans font-semibold text-[20px] lg:text-[22px] leading-[28px] text-[#F5EDED]">
            {data.heading}
          </h3>
        )}

        {/* Hairline Divider */}
        {points.length > 0 && (
          <div className="my-3 border-t border-white/10" aria-hidden="true" />
        )}

        {/* Descriptions */}
        {points.length > 0 && (
          <motion.ul
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {points.map((point, idx) => (
              <motion.li
                key={idx}
                variants={listItemVariants}
                className="flex items-start gap-2.5"
              >
                <span
                  className="size-1.5 rounded-full shrink-0 mt-2"
                  style={{ backgroundColor: accentColor }}
                  aria-hidden="true"
                />
                <span className="font-sans text-[13px] lg:text-[14px] leading-[20px] lg:leading-[22px] text-[#F5EDED]/90">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    );
  };

  return (
    <section
      id="comparison"
      aria-labelledby={heading ? "comparison-heading" : undefined}
      className="relative w-full py-20 lg:py-[120px] px-5 md:px-8 lg:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ── Optional Section Heading & Tagline ── */}
        {(heading || tagline) && (
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-[800px] mx-auto mb-12"
          >
            {heading && (
              <h2
                id="comparison-heading"
                className="font-sans font-semibold text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.02em] text-[#F5EDED]"
              >
                {heading}
              </h2>
            )}
            {tagline && (
              <p className="mt-4 font-sans text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#BFA7A7] max-w-[640px] mx-auto">
                {tagline}
              </p>
            )}
          </motion.div>
        )}

        {/* ── Comparison Frame ── */}
        <motion.div
          variants={frameScaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-[24px] overflow-hidden border border-white/10 shadow-[0_12px_40px_-4px_rgba(229,72,77,0.15)] bg-[#180202]"
        >
          <ImageCompare
            before={
              <img
                src={oldSide.image.src}
                alt={oldSide.image.alt || "Previous implementation"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            }
            after={
              <img
                src={newSide.image.src}
                alt={newSide.image.alt || "Modernized implementation"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            }
            defaultPosition={defaultPosition}
            onPositionChange={handlePositionChange}
            labels={labels}
            label={sliderLabel}
            aspectRatio={aspectRatio}
          >
            {/* ── Scrim Background Overlays (Desktop & Tablet) ── */}
            <AnimatePresence>
              {side === "old" && (
                <motion.div
                  key="old-scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                  aria-hidden="true"
                  className="hidden md:block absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(90deg,rgba(24,2,2,0.78)_0%,rgba(24,2,2,0.35)_45%,transparent_70%)]"
                />
              )}
              {side === "new" && (
                <motion.div
                  key="new-scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                  aria-hidden="true"
                  className="hidden md:block absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(270deg,rgba(24,2,2,0.78)_0%,rgba(24,2,2,0.35)_45%,transparent_70%)]"
                />
              )}
            </AnimatePresence>

            {/* ── Floating Side Panel (Desktop & Tablet) ── */}
            <div aria-live="polite" className="hidden md:block">
              <AnimatePresence mode="wait">
                {side === "old" && renderSidePanel(oldSide, true)}
                {side === "new" && renderSidePanel(newSide, false)}
              </AnimatePresence>
            </div>

            {/* ── Hint Pill (shown only at 50% before first interaction) ── */}
            <AnimatePresence>
              {side === null && !hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none inline-flex items-center gap-2 rounded-full px-4 py-2 border border-[#E5484D]/50 backdrop-blur-[16px] shadow-[0_8px_32px_rgba(229,72,77,0.35)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #E5484D 0%, #B3282F 50%, #6B1218 100%)",
                  }}
                >
                  <ArrowLeftRight className="size-3.5 text-[#F5EDED]" />
                  <span className="font-grotesk text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F5EDED]">
                    Drag to compare
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </ImageCompare>
        </motion.div>

        {/* ── Mobile Stack Card (below 768px) ── */}
        <div className="block md:hidden mt-6">
          <div className="rounded-[24px] p-6 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-left">
            {/* Grid cell holding both sides to prevent layout shift */}
            <div className="grid grid-cols-1">
              {/* Neutral State */}
              <div
                className={`col-start-1 row-start-1 flex items-center justify-center py-6 text-center transition-opacity duration-300 ${side === null ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                aria-hidden={side !== null}
              >
                <div className="flex flex-col items-center gap-2">
                  <ArrowLeftRight className="size-5 text-[#E5484D]" />
                  <p className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.08em] text-[#BFA7A7]">
                    Drag the handle to compare old and new
                  </p>
                </div>
              </div>

              {/* Old Side Content */}
              <div
                className={`col-start-1 row-start-1 transition-opacity duration-300 ${side === "old" ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                aria-hidden={side !== "old"}
              >
                <div
                  className="h-[3px] w-8 rounded-full mb-3 bg-[#9B8888]"
                  aria-hidden="true"
                />
                {oldSide.heading && (
                  <h3 className="font-sans font-semibold text-[18px] leading-[24px] text-[#F5EDED]">
                    {oldSide.heading}
                  </h3>
                )}
                {oldPoints.length > 0 && (
                  <div className="my-3 border-t border-white/10" aria-hidden="true" />
                )}
                <ul className="space-y-2.5">
                  {oldPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="size-1.5 rounded-full shrink-0 mt-2 bg-[#9B8888]" />
                      <span className="font-sans text-[13px] leading-[20px] text-[#F5EDED]/90">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* New Side Content */}
              <div
                className={`col-start-1 row-start-1 transition-opacity duration-300 ${side === "new" ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                aria-hidden={side !== "new"}
              >
                <div
                  className="h-[3px] w-8 rounded-full mb-3 bg-[#E5484D]"
                  aria-hidden="true"
                />
                {newSide.heading && (
                  <h3 className="font-sans font-semibold text-[18px] leading-[24px] text-[#F5EDED]">
                    {newSide.heading}
                  </h3>
                )}
                {newPoints.length > 0 && (
                  <div className="my-3 border-t border-white/10" aria-hidden="true" />
                )}
                <ul className="space-y-2.5">
                  {newPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="size-1.5 rounded-full shrink-0 mt-2 bg-[#E5484D]" />
                      <span className="font-sans text-[13px] leading-[20px] text-[#F5EDED]/90">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

