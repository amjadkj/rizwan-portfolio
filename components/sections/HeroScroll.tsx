"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { HeroSocials } from "@/components/sections/hero-socials";

const FRAME_COUNT = 201;
const BATCH_CONCURRENCY = 6;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/images/person/ezgif-frame-${frameNumber}-no-bg.png`;
}

export function HeroScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const currentFrameRef = useRef<number>(0);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const rafIdRef = useRef<number | null>(null);
  const isLoadedRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  // Scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const frameIndex = useTransform(smoothProgress, (value) => {
    const clamped = Math.max(0, Math.min(1, value));
    return Math.round(clamped * (FRAME_COUNT - 1));
  });

  // Canvas drawing routine: contain fit, centered horizontally, bottom-aligned
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height, dpr } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    // Reset transform to DPR scale
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Keep canvas 100% transparent: clear without painting any background fill
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Maintain native aspect ratio with "contain" fit
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.min(width / imgWidth, height / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    // Horizontally centered, bottom-aligned so torso sits at bottom of screen
    const x = (width - drawWidth) / 2;
    const y = height - drawHeight;

    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  }, []);

  // Update canvas backing resolution based on devicePixelRatio
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasSizeRef.current = {
      width: rect.width,
      height: rect.height,
      dpr,
    };

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }, []);

  // Scroll event subscription: trigger frame rendering only when index changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (prefersReducedMotionRef.current) return;
    if (!isLoadedRef.current) return;

    const targetIndex = Math.max(
      0,
      Math.min(FRAME_COUNT - 1, Math.round(latest))
    );

    if (targetIndex === currentFrameRef.current) return;
    currentFrameRef.current = targetIndex;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(targetIndex);
    });
  });

  // Preload frames in batches and set up ResizeObserver
  useEffect(() => {
    let isCancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout>;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
      if (e.matches) {
        currentFrameRef.current = 0;
        drawFrame(0);
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Initial canvas sizing
    updateCanvasDimensions();

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isCancelled) return;
        updateCanvasDimensions();
        drawFrame(currentFrameRef.current);
      }, 60);
    };

    const canvas = canvasRef.current;
    const observer = new ResizeObserver(handleResize);
    if (canvas) {
      observer.observe(canvas);
    }

    // Step 1: Preload Frame 1 with high priority so hero is immediately rendered
    let loadedCount = 0;
    const firstImg = new Image();
    firstImg.decoding = "async";
    firstImg.src = getFrameUrl(0);

    const onFrame1Ready = async () => {
      if (isCancelled) return;
      if (firstImg.decode) {
        try {
          await firstImg.decode();
        } catch {
          // Ignore decode errors and continue
        }
      }
      imagesRef.current[0] = firstImg;
      loadedCount = 1;
      setLoadedPercent(Math.round((1 / FRAME_COUNT) * 100));

      // Draw initial frame as soon as ready
      updateCanvasDimensions();
      drawFrame(0);

      // If reduced motion is requested, stop here
      if (prefersReducedMotionRef.current) {
        isLoadedRef.current = true;
        setIsLoaded(true);
        return;
      }

      // Step 2: Batch preload remaining frames (1 to 200)
      let nextIndex = 1;
      let activeRequests = 0;

      const loadNext = () => {
        if (isCancelled) return;

        if (nextIndex >= FRAME_COUNT) {
          if (activeRequests === 0) {
            isLoadedRef.current = true;
            setIsLoaded(true);

            // Redraw current scroll position frame once all images are ready
            const target = Math.max(
              0,
              Math.min(FRAME_COUNT - 1, Math.round(frameIndex.get()))
            );
            currentFrameRef.current = target;
            drawFrame(target);
          }
          return;
        }

        const idx = nextIndex++;
        activeRequests++;

        const img = new Image();
        img.decoding = "async";
        img.src = getFrameUrl(idx);

        const handleImageFinish = async () => {
          if (isCancelled) return;
          if (img.decode) {
            try {
              await img.decode();
            } catch {
              // Ignore decode errors
            }
          }
          imagesRef.current[idx] = img;
          loadedCount++;
          setLoadedPercent(Math.round((loadedCount / FRAME_COUNT) * 100));
          activeRequests--;

          loadNext();
        };

        img.onload = handleImageFinish;
        img.onerror = handleImageFinish;
      };

      for (let i = 0; i < BATCH_CONCURRENCY; i++) {
        loadNext();
      }
    };

    firstImg.onload = onFrame1Ready;
    firstImg.onerror = onFrame1Ready;

    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, frameIndex, updateCanvasDimensions]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[300vh] w-full bg-transparent"
    >
      {/* Sticky viewport wrapper: pinned for the duration of the 300vh scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pt-16">
        {/* Layer 0: Crimson radial glow behind the person */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] md:h-[750px] md:w-[750px] rounded-full bg-[radial-gradient(circle,rgba(229,72,77,0.22)_0%,rgba(229,72,77,0.06)_45%,transparent_70%)] blur-3xl z-0"
        />

        {/* Layer 10: Canvas rendering image sequence (fully transparent, contain fit, bottom-aligned) */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Interactive portrait of ${siteConfig.name}`}
          className="absolute inset-0 size-full z-10 pointer-events-none bg-transparent"
        />

        {/* Layer 20: Preloading state (small spinner + percentage in #E5484D palette, fades out) */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="size-6 md:size-8 animate-spin rounded-full border-2 border-[#E5484D]/25 border-t-[#E5484D]" />
            <span className="font-mono text-xs md:text-sm font-medium tracking-widest text-[#E5484D]/90 tabular-nums">
              {loadedPercent}%
            </span>
          </div>
        </div>

        {/* Layer 30: Translucent blended Name (bottom-left) */}
        <h1
          className="pointer-events-none absolute bottom-6 left-5 z-30 select-none font-display uppercase
                     leading-[0.85] tracking-[-0.02em] text-[#F5EDED] mix-blend-difference opacity-95
                     text-[clamp(4rem,14vw,6.5rem)] md:bottom-8 md:left-12"
        >
          <span className="block">{siteConfig.firstName}</span>
          <span className="block">{siteConfig.lastName}</span>
        </h1>

        {/* Layer 30: Job Role (bottom-right) */}
        <div className="pointer-events-none absolute right-5 bottom-28 md:right-12 md:bottom-8 z-30 text-right select-none">
          <p className="font-sans text-[24px] md:text-[35px] lg:text-[50px] font-semibold leading-none tracking-[-0.02em] text-[#F5EDED]">
            <span className="block">Business</span>
            <span className="block">Analyst</span>
          </p>
        </div>

        {/* Layer 40: Floating Social Logos */}
        <HeroSocials />
      </div>
    </section>
  );
}
