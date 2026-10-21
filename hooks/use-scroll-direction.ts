"use client";
import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold = 8): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const nearTop = currentY < 80; // always show near the top of the page
      const delta = currentY - lastY;

      if (Math.abs(delta) < threshold) return; // ignore micro-jitter

      if (nearTop || delta < 0) {
        setDirection("up"); // scrolling up → show navbar
      } else {
        setDirection("down"); // scrolling down → hide navbar
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
