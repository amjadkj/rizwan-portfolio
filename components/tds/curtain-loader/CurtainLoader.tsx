"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./curtain-loader.css";

type Phase = "loading" | "revealing" | "idle";

const ReadyCtx = createContext(true);
/** false while the curtain is down, true once it starts lifting — key entrance animations off it. */
export const useCurtainReady = () => useContext(ReadyCtx);

// Two solid sheets moved with translateY: dark in front, red behind. On reveal the red trails,
// so a red edge highlights the motion.
const ease = [0.76, 0, 0.24, 1] as const;
const LAG = 0.1;
const DURATION = 0.8;

export function CurtainLoader({ children, countMs = 1400 }: { children: ReactNode; countMs?: number }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const skip = reduce === true;
  const ready = skip || phase !== "loading";
  const y = phase === "loading" ? "0%" : "-100%";

  // Safety net: if the tab is in the background rAF stalls — never leave the page covered.
  useEffect(() => {
    if (phase !== "revealing") return;
    const t = window.setTimeout(() => setPhase("idle"), (DURATION + LAG) * 1000 + 700);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <ReadyCtx.Provider value={ready}>
      {children}
      {!skip && phase !== "idle" && (
        <>
          <motion.div
            aria-hidden
            className={`tds-curtain tds-curtain--back ${ready ? "tds-curtain--done" : ""}`}
            initial={{ y: "0%" }}
            animate={{ y }}
            transition={{ duration: DURATION, ease, delay: LAG }}
          />
          <motion.div
            role={phase === "loading" ? "status" : undefined}
            aria-label={phase === "loading" ? "Loading" : undefined}
            aria-hidden={ready || undefined}
            className={`tds-curtain tds-curtain--front ${ready ? "tds-curtain--done" : ""}`}
            initial={{ y: "0%" }}
            animate={{ y }}
            transition={{ duration: DURATION, ease }}
            onAnimationComplete={() => phase === "revealing" && setPhase("idle")}
          >
            {/* the counter rides the sheet out at 100 */}
            <Counter durationMs={countMs} onDone={() => setPhase("revealing")} />
          </motion.div>
        </>
      )}
    </ReadyCtx.Provider>
  );
}

// 0 → 100, eased. Isolated so its 60 updates/s never re-render the page tree.
function Counter({ durationMs, onDone }: { durationMs: number; onDone: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <p className="tds-curtain__count">{count}</p>;
}

// Fade-up that waits for the curtain, then for the element to scroll into view.
export function CurtainReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ready = useCurtainReady();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
