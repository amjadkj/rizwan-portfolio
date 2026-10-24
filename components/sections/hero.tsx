import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { HeroSocials } from "@/components/sections/hero-socials";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-svh w-full overflow-hidden flex items-center justify-center pt-16"
    >
      {/* Layer 10: Soft crimson radial glow behind the person */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] md:h-[750px] md:w-[750px] rounded-full bg-[radial-gradient(circle,rgba(229,72,77,0.22)_0%,rgba(229,72,77,0.06)_45%,transparent_70%)] blur-3xl z-10"
      />

      {/* Layer 20: Person Image (torso up, centered at bottom) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 h-[78svh] md:h-[88svh] w-full max-w-[800px] flex items-end justify-center pointer-events-none select-none">
        <div className="relative h-full w-full [mask-image:linear-gradient(to_top,transparent_0%,black_12%)]">
          <Image
            src="/images/rizwan-front1.png"
            alt={`Portrait of ${siteConfig.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="object-contain object-bottom"
          />
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

      {/* Layer 40: Book a Call CTA (left margin, vertically near 40%) */}
      {/* <div className="absolute left-5 top-[28%] sm:top-[34%] md:left-12 md:top-[40%] z-40">
        <a
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-lg bg-[#E5484D] px-6 py-3.5 text-sm md:text-base font-medium text-[#F5EDED] shadow-[0_0_20px_rgba(229,72,77,0.4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-[#F05D62] hover:shadow-[0_0_35px_rgba(229,72,77,0.65)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#E5484D]/40"
        >
          <CalendarDays className="size-5 transition-transform duration-300 group-hover:scale-110" />
          <span>Book a Call</span>
        </a>
      </div> */}

      {/* Layer 40: Floating Social Logos (right margin) */}
      <HeroSocials />
    </section>
  );
}
