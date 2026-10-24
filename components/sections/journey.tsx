"use client";

import * as React from "react";
import Timeline, { JourneyItem } from "@/components/ui/timeline";

const RIZWAN_TOP_JOURNEY: JourneyItem[] = [
  {
    id: "2018-june",
    year: "2018",
    month: "June",
    title: "Bachelor of Business Administration (BBA)",
    tag: "Bachelor's Degree",
    content: "Undergraduate degree blending strategic business management, financial analysis, marketing principles, and data-driven decision-making.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2023-august",
    year: "2023",
    month: "August",
    title: "M.S. in International Business Management",
    tag: "Master's Degree",
    content: "Specialized in International Business Management, blending global business strategies, international trade, cross-cultural management, financial analysis, and strategic decision-making in global markets.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2026-january",
    year: "2026",
    month: "January",
    title: "Welfare Officer",
    tag: "SOS Property Management",
    content: "Managed employee welfare and workplace well-being through proactive risk assessments, confidential recordkeeping, GDPR compliance, analytical reporting.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  },
];

const RIZWAN_BOTTOM_JOURNEY: JourneyItem[] = [
  {
    id: "2021-march",
    year: "2021",
    month: "August",
    title: "Manager",
    tag: "OmniLogistics",
    content: "Managed daily business operations, invoice processing, financial recordkeeping, and administrative workflows, ensuring accuracy, operational efficiency, and smooth business management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2025-november",
    year: "2025",
    month: "November",
    title: "Welfare Officer",
    tag: "Sharp Catering Hotels",
    content: "Supported workforce well-being and operational efficiency through workplace risk assessments, employee relations, administrative management, and strategic collaboration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    title: "Freelance Business Analyst",
    tag: "Self Employed",
    content: "Analyzed business operations, identified process inefficiencies, gathered stakeholder requirements, and translated data insights into actionable strategies to optimize workflows, improve operational performance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
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
