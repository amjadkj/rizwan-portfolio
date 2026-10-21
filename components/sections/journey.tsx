"use client";

import * as React from "react";
import Timeline, { JourneyItem } from "@/components/ui/timeline";

const RIZWAN_TOP_JOURNEY: JourneyItem[] = [
  {
    id: "2017-june",
    year: "2017",
    month: "June",
    title: "B.S. in Computer Science & Econ",
    tag: "Education",
    content: "Undergraduate degree blending algorithmic problem solving, discrete math, and quantitative econometrics.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2021-august",
    year: "2021",
    month: "August",
    title: "M.S. in Business Analytics",
    tag: "Master's Degree",
    content: "Graduated with High Honors (GPA: 3.92/4.0). Capstone research on predictive churn modeling.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2023-january",
    year: "2023",
    month: "January",
    title: "Lead Business Analyst & Strategy",
    tag: "Apex Advisory",
    content: "Directing enterprise client advisory, BI reporting engines, and standardizing agile BA frameworks.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2026-december",
    year: "2026",
    month: "December",
    title: "Autonomous Decision Systems",
    tag: "Next Frontier",
    content: "Architecting real-time executive decision intelligence and predictive operational workflows.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
];

const RIZWAN_BOTTOM_JOURNEY: JourneyItem[] = [
  {
    id: "2018-march",
    year: "2018",
    month: "March",
    title: "Operations & BI Analyst",
    tag: "OmniLogistics",
    content: "Automated 20+ weekly reporting hours via SQL scripts and built foundational logistics KPI suites.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2021-november",
    year: "2021",
    month: "November",
    title: "Senior Business Systems Analyst",
    tag: "Global FinTech",
    content: "Modernized transaction ledgers with 99.99% reconciliation and zero SOX compliance audit findings.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2024-june",
    year: "2024",
    month: "June",
    title: "Enterprise BI Modernization",
    tag: "Milestone",
    content: "Reduced executive reporting cycle times by 45% through automated warehouse pipeline governance.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
];

export function JourneySection() {
  return (
    <div className="relative w-full">
      {/* Pinned Horizontal GSAP Timeline */}
      <Timeline
        title="Career Trajectory"
        periodLabel="2017 — 2026"
        textColor="#F5EDED"
        mutedTextColor="#dac1c1"
        activeColor="#E5484D"
        backgroundColor="transparent"
        imageUrl="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Rizwan Shaji Professional Advisory"
        topData={RIZWAN_TOP_JOURNEY}
        bottomData={RIZWAN_BOTTOM_JOURNEY}
        scrollDuration={1.3}
      />
    </div>
  );
}
