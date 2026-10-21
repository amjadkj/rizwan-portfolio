// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

export type Month = keyof typeof monthOrder;

export type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  title?: string;
  content: string;
  tag?: string;
  image?: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  topData?: JourneyItem[];
  bottomData?: JourneyItem[];
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "2020-march",
    year: "2020",
    month: "March",
    title: "Thesis & Foundation",
    tag: "Discovery",
    content: "Signal research turns scattered market data into a clear analytical thesis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    title: "Product Launch",
    tag: "Milestone",
    content: "Founding release ships with the first live customer journey models and telemetry.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    title: "Intelligence Layer",
    tag: "Automation",
    content: "Automation layer connects business insight, executive BI dashboards, and pipeline velocity.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    title: "Global Scale",
    tag: "Expansion",
    content: "New enterprise verticals scale with localized BI rollouts and self-service reporting.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
];

export const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    title: "Prototype Validation",
    tag: "Validation",
    content: "Rapid prototype sprint validates analytical models directly with real enterprise operators.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    title: "Architecture Sprint",
    tag: "Refinement",
    content: "Stakeholder feedback reshapes the platform roadmap into modular high-throughput sprints.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    title: "Executive Workflows",
    tag: "Ecosystem",
    content: "Unified cloud workflows bring interactive analytics and predictive forecasting everywhere.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Timeline({
  title = "Product Storyline",
  periodLabel = "2020-2026",
  textColor = "var(--color-foreground, #F5EDED)",
  mutedTextColor = "var(--color-muted-foreground, #9B8888)",
  activeColor = "#E5484D",
  backgroundColor = "transparent",
  imageUrl = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "Executive Advisory & Strategy",
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

  const allItems: JourneyItem[] = [...topData, ...bottomData].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return monthOrder[a.month] - monthOrder[b.month];
  });

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const activeBorderStyle: CSSProperties = {
    borderColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 600;
      const slidePercent = isMobile ? -58 : -66;
      const lineWidth = isMobile ? "68%" : "98%";
      const lineStart = isMobile ? "top 30%" : "top 25%";
      const slideEnd = isMobile ? "85% 50%" : "92% bottom";
      const lineEnd = isMobile ? "82% 50%" : "92% bottom";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: slideEnd,
          scrub: true,
        },
        defaults: {
          ease: "none",
        },
      });

      tl.fromTo(
        wholeSliderRef.current,
        { xPercent: 0 },
        { xPercent: slidePercent }
      );

      if (reducedMotion) {
        gsap.set(".journey-line", { width: lineWidth });
        return;
      }

      gsap.to(".journey-line", {
        width: lineWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: lineStart,
          end: lineEnd,
          scrub: true,
        },
      });
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = allItems;

      if (reducedMotion) {
        items.forEach((item) => {
          gsap.set(`.jl-${item.id}`, { scaleY: 1 });
          gsap.set(`.jd-${item.id}`, { scale: 1 });
          gsap.set(`.card-${item.id}`, { opacity: 1, y: 0 });
          gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
          gsap.set(`.description-${item.id}`, {
            opacity: 1,
            clearProps: "transform",
          });
        });
        return;
      }

      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, {
          scaleY: 0,
          transformOrigin: "bottom bottom",
        });
        gsap.set(`.jd-${item.id}`, { scale: 0 });
        gsap.set(`.card-${item.id}`, { opacity: 0.2, scale: 0.94 });
        gsap.set(`.title-${item.id}`, { opacity: 1 });
        gsap.set(`.description-${item.id}`, { opacity: 1 });
      });

      const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
      const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

      items.forEach((item) => {
        try {
          titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
            type: "chars, words, lines",
            mask: "lines",
          });

          descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
            type: "chars, words, lines",
            mask: "lines",
          });
        } catch {
          // Graceful fallback if SplitText fails
        }
      });

      const createItemTimeline = (
        item: JourneyItem,
        startPos: number,
        endPos: number
      ) => {
        const lineSelector = `.jl-${item.id}`;
        const dotSelector = `.jd-${item.id}`;
        const cardSelector = `.card-${item.id}`;
        const titleLines = titleSplits[item.id]?.lines || [];
        const descriptionLines = descriptionSplits[item.id]?.lines || [];

        const isTop = topData.some((topItem) => topItem.id === item.id);

        if (!isTop) {
          gsap.set(lineSelector, { transformOrigin: "top top" });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: `${startPos}% 30%`,
            end: `${endPos}% 50%`,
            scrub: true,
          },
        });

        timeline
          .to(lineSelector, {
            scaleY: 1,
            duration: normalizedDuration * 0.4,
          })
          .to(
            dotSelector,
            {
              scale: 1,
              duration: normalizedDuration * 0.4,
            },
            "<"
          )
          .to(
            cardSelector,
            {
              opacity: 1,
              scale: 1,
              duration: normalizedDuration * 0.5,
              ease: "power2.out",
            },
            "<"
          );

        if (titleLines.length > 0) {
          timeline.fromTo(
            titleLines,
            { y: 60 },
            {
              y: 0,
              delay: -0.6 * normalizedDuration,
              duration: normalizedDuration * 0.8,
              stagger: 0.02,
              ease: "power2.out",
            }
          );
        }

        if (descriptionLines.length > 0) {
          timeline.fromTo(
            descriptionLines,
            { y: 40 },
            {
              y: 0,
              duration: normalizedDuration * 0.8,
              stagger: 0.02,
              ease: "power2.out",
            },
            "<"
          );
        }

        return timeline;
      };

      const positions: ReadonlyArray<readonly [number, number]> =
        window.innerWidth < 600
          ? [
              [18, 28],
              [26, 36],
              [34, 44],
              [42, 52],
              [50, 60],
              [58, 68],
              [66, 76],
            ]
          : [
              [6, 26],
              [16, 36],
              [26, 46],
              [35, 55],
              [45, 65],
              [55, 75],
              [65, 85],
            ];

      items.forEach((item, index) => {
        const [startPos, endPos] = positions[index] || [10 + index * 10, 30 + index * 10];
        createItemTimeline(item, startPos, endPos);
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        Object.values(titleSplits).forEach((split) => split?.revert?.());
        Object.values(descriptionSplits).forEach((split) => split?.revert?.());
        window.removeEventListener("resize", handleResize);
      };
    },
    { dependencies: [normalizedDuration, reducedMotion, allItems.length], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[220vw] max-[600px]:h-[420vh] w-full relative"
      style={sectionStyle}
    >
      <div className="h-screen w-screen sticky top-0 pt-[4vh] sm:pt-[6vh] overflow-hidden">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[42vw] w-[270vw] items-center gap-[4vw] px-[4vw] max-[600px]:h-[85vh] max-[600px]:w-[800vw] max-[600px]:px-[6vw]"
        >
          {/* Featured Visual Anchor */}
          <div className="group relative h-[36vw] w-[26vw] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.85)] p-2 shadow-2xl backdrop-blur-2xl max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-2xl">
            <div className="h-full w-full overflow-hidden rounded-xl relative">
              <img
                src={imageUrl}
                alt={imageAlt}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050000] via-[#050000]/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block rounded-full bg-[#E5484D]/20 px-3 py-1 font-grotesk text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#ffdad4] border border-[#E5484D]/40 backdrop-blur-md mb-2">
                  Track Overview
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#dac1c1] leading-relaxed">
                  Interactive career roadmap detailing verified client advisory, system transformation, and high-impact analytics initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Track & Milestones */}
          <div className="relative h-full w-full">
            {/* Center Track Axis */}
            <div className="w-full absolute left-0 top-[50%] -translate-y-1/2 flex items-center h-fit z-20 pointer-events-none">
              <div
                className="h-[0.7vw] w-[0.7vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] rounded-full shadow-[0_0_12px_rgba(229,72,77,0.8)]"
                style={activeStyle}
              />
              <div
                className="h-[2px] w-0 rounded-full journey-line shadow-[0_0_10px_rgba(229,72,77,0.6)]"
                style={activeStyle}
              />
              <div
                className="h-[0.7vw] w-[0.7vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] rounded-full shadow-[0_0_12px_rgba(229,72,77,0.8)]"
                style={activeStyle}
              />
            </div>

            {/* TOP ROW MILESTONES (Cards situated above center line) */}
            <div className="flex h-1/2 w-full items-end pb-[1.5vw] justify-start gap-[1vw]">
              {/* Section Headline Block */}
              <div className="h-full w-[18%] flex flex-col justify-end pb-[2vw] max-[600px]:h-fit max-[600px]:pb-[3vw]">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-5 rounded-full bg-[#E5484D]" />
                  <span className="font-grotesk text-[10px] sm:text-xs uppercase tracking-wider text-[#ffdad4]">
                    Milestones
                  </span>
                </div>
                <h2 className="text-[2.2vw] font-bold tracking-tight text-[#F5EDED] leading-[1.05] max-[600px]:text-[7vw]">
                  {title}
                </h2>
              </div>

              {/* Top Cards Array */}
              <div className="w-full flex h-full items-end gap-x-[12vw] max-[600px]:gap-x-[36vw]">
                {topData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative w-[28vw] shrink-0 max-[600px]:w-[68vw]"
                  >
                    {/* Vertical Connector Stem & Central Dot */}
                    <div className="w-full absolute left-0 bottom-[-1.5vw] h-[3vw] max-[600px]:h-[5vw] pointer-events-none z-10">
                      <div
                        className={`h-full w-[2px] mx-auto origin-bottom rounded-full shadow-[0_0_8px_rgba(229,72,77,0.5)] jl-${item.id}`}
                        style={activeStyle}
                      />
                      <div
                        className={`size-[0.8vw] max-[600px]:size-[2.2vw] mx-auto -mt-[0.4vw] rounded-full shadow-[0_0_12px_rgba(229,72,77,0.9)] jd-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    {/* Milestone Card with Image Tile */}
                    <div
                      className={`card-${item.id} relative rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.88)] p-3 md:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-white/35 hover:shadow-[0_20px_40px_rgba(229,72,77,0.25)]`}
                    >
                      {/* Image Tile */}
                      {item.image && (
                        <div className="relative h-[8vw] w-full max-[600px]:h-[26vw] overflow-hidden rounded-xl mb-3 border border-white/10">
                          <img
                            src={item.image}
                            alt={item.title || item.year}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#180202]/90 via-transparent to-transparent" />
                          {item.tag && (
                            <span className="absolute top-2 left-2 rounded-md bg-[#050000]/80 px-2 py-0.5 font-grotesk text-[9px] md:text-[11px] font-semibold uppercase tracking-wider text-[#ffdad4] border border-white/15 backdrop-blur-sm">
                              {item.tag}
                            </span>
                          )}
                          <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between">
                            <span className="font-grotesk text-[11px] md:text-[13px] font-bold text-[#F5EDED]">
                              {item.year}
                            </span>
                            <span className="font-grotesk text-[10px] md:text-[12px] text-[#ffb3b0]">
                              {item.month}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content Area */}
                      <div>
                        {item.title && (
                          <h4
                            className={`title-${item.id} font-sans text-[1.15vw] font-bold leading-snug text-[#F5EDED] mb-1 max-[600px]:text-[4.2vw]`}
                          >
                            {item.title}
                          </h4>
                        )}
                        <p
                          className={`description-${item.id} font-sans text-[0.85vw] leading-relaxed text-[#dac1c1] max-[600px]:text-[3.2vw] line-clamp-3`}
                          style={mutedTextStyle}
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW MILESTONES (Cards situated below center line) */}
            <div className="h-1/2 flex items-start pt-[1.5vw] justify-start w-full">
              {/* Period Label Block */}
              <div className="w-[18%] pt-[1.5vw] max-[600px]:w-[24%] max-[600px]:pt-[3vw]">
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
                  <p
                    className="font-grotesk text-[1.1vw] font-semibold text-[#ffdad4] max-[600px]:text-[3.4vw]"
                    style={mutedTextStyle}
                  >
                    {periodLabel}
                  </p>
                </div>
              </div>

              {/* Bottom Cards Array */}
              <div className="w-full flex h-full items-start gap-x-[14vw] ml-[4vw] max-[600px]:gap-x-[36vw] max-[600px]:ml-[4vw]">
                {bottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative w-[28vw] shrink-0 max-[600px]:w-[68vw]"
                  >
                    {/* Vertical Connector Stem & Central Dot */}
                    <div className="w-full absolute left-0 top-[-1.5vw] h-[3vw] max-[600px]:h-[5vw] pointer-events-none z-10">
                      <div
                        className={`size-[0.8vw] max-[600px]:size-[2.2vw] mx-auto -mb-[0.4vw] rounded-full shadow-[0_0_12px_rgba(229,72,77,0.9)] jd-${item.id}`}
                        style={activeStyle}
                      />
                      <div
                        className={`h-full w-[2px] mx-auto origin-top rounded-full shadow-[0_0_8px_rgba(229,72,77,0.5)] jl-${item.id}`}
                        style={activeStyle}
                      />
                    </div>

                    {/* Milestone Card with Image Tile */}
                    <div
                      className={`card-${item.id} relative rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.88)] p-3 md:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-white/35 hover:shadow-[0_20px_40px_rgba(229,72,77,0.25)]`}
                    >
                      {/* Image Tile */}
                      {item.image && (
                        <div className="relative h-[8vw] w-full max-[600px]:h-[26vw] overflow-hidden rounded-xl mb-3 border border-white/10">
                          <img
                            src={item.image}
                            alt={item.title || item.year}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#180202]/90 via-transparent to-transparent" />
                          {item.tag && (
                            <span className="absolute top-2 left-2 rounded-md bg-[#050000]/80 px-2 py-0.5 font-grotesk text-[9px] md:text-[11px] font-semibold uppercase tracking-wider text-[#ffdad4] border border-white/15 backdrop-blur-sm">
                              {item.tag}
                            </span>
                          )}
                          <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between">
                            <span className="font-grotesk text-[11px] md:text-[13px] font-bold text-[#F5EDED]">
                              {item.year}
                            </span>
                            <span className="font-grotesk text-[10px] md:text-[12px] text-[#ffb3b0]">
                              {item.month}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content Area */}
                      <div>
                        {item.title && (
                          <h4
                            className={`title-${item.id} font-sans text-[1.15vw] font-bold leading-snug text-[#F5EDED] mb-1 max-[600px]:text-[4.2vw]`}
                          >
                            {item.title}
                          </h4>
                        )}
                        <p
                          className={`description-${item.id} font-sans text-[0.85vw] leading-relaxed text-[#dac1c1] max-[600px]:text-[3.2vw] line-clamp-3`}
                          style={mutedTextStyle}
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
