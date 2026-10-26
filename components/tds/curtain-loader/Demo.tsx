"use client";
import { useEffect, useRef } from "react";
import { CurtainLoader, CurtainReveal } from "./CurtainLoader";
import "./demo.css";

const PHOTO = "https://thedesignstack.co.in/demo-assets/timber-hall.webp";

// Sizes the wordmark so it spans the full width of its box, edge to edge.
function useFitWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.parentElement!.clientWidth;
      el.style.fontSize = `${(100 * w) / el.scrollWidth}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, []);
  return ref;
}

// Dummy studio "Halftone". Swap the copy and photo for your own.
export function CurtainLoaderDemo() {
  const mark = useFitWidth<HTMLHeadingElement>();
  return (
    <CurtainLoader>
      <main className="tds-cldemo">
        <header className="tds-cldemo__bar">
          <span>Halftone&nbsp;Studio</span>
          <nav>
            <a href="#work">Work</a>
            <a href="#studio">Studio</a>
            <a href="#contact">Contact</a>
          </nav>
          <button onClick={() => location.reload()}>Replay ↻</button>
        </header>

        <CurtainReveal className="tds-cldemo__mid">
          <p className="tds-cldemo__lede">
            Identity, type and motion for brands that would rather be remembered than liked. Est. 2014<span className="tds-cldemo__dot" />
          </p>
          <figure className="tds-cldemo__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="An empty timber hall lit from above" />
          </figure>
        </CurtainReveal>

        <CurtainReveal delay={0.12} className="tds-cldemo__markbox">
          <h1 ref={mark} className="tds-cldemo__mark">HALFTONE</h1>
        </CurtainReveal>
      </main>
    </CurtainLoader>
  );
}
