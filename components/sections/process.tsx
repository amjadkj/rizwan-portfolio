"use client";

import * as React from "react";
import Image from "next/image";
import { Search, Database, LineChart, Cpu, Award } from "lucide-react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

const STEPS = [
  {
    step: "01",
    title: "Business Needs Assessment",
    icon: Search,
    timeframe: "Week 1 - 2",
    summary:
      "Identify business problems, define objectives, assess root causes and establish success criteria.",
    // deliverable: "Baseline KPI Blueprint & Stakeholder Alignment Matrix",
  },
  {
    step: "02",
    title: "Stakeholder Engagement & Requirements Elicitation",
    icon: Database,
    timeframe: "Week 3 - 4",
    summary:
      "Identify stakeholders, gather business requirements, analyse user needs and document expectations.",
    // deliverable: "Data Hygiene Scorecard & Dimensional Schema Plan",
  },
  {
    step: "03",
    title: "Business Process Modelling & Gap Analysis",
    icon: LineChart,
    timeframe: "Week 5 - 6",
    summary:
      "Analyse AS-IS and TO-BE processes, identify inefficiencies, assess gaps and define improvement opportunities.",
    // deliverable: "Interactive Sandbox Dashboard & Acceptance Criteria",
  },
  {
    step: "04",
    title: "Requirements Analysis & Data-Driven Insights",
    icon: Cpu,
    timeframe: "Week 7 - 8",
    summary:
      "Analyse and prioritise requirements, validate business needs, examine data and identify actionable insights.",
    // deliverable: "Production Telemetry Cockpit & Validated ETL Pipelines",
  },
  {
    step: "05",
    title: "Solution Evaluation & Recommendations",
    icon: Award,
    timeframe: "Post-Launch",
    summary:
      "Evaluate solution options, assess feasibility, analyse risks and benefits, and recommend improvements aligned with business objectives.",
    // deliverable: "Change Management SOP & Executive ROI Report",
  },
  {
    step: "06",
    title: "Solution Validation & Continuous Improvement",
    icon: Award,
    timeframe: "Post-Launch",
    summary:
      "Support User Acceptance Testing (UAT), verify requirements against acceptance criteria, evaluate business outcomes and identify opportunities for optimisation.",
    // deliverable: "Change Management SOP & Executive ROI Report",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative w-full py-28 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* Left Column: Sticky Header */}
          <div className="left-0 top-0 md:sticky md:h-svh md:py-12 flex flex-col justify-center mb-12 md:mb-0">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
              <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
                Structured Framework
              </span>
              <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EDED] mb-5">
              The Strategic Execution{" "}
              <span className="text-[#E5484D]">Roadmap</span>
            </h2>
            {/* <p className="max-w-prose text-sm sm:text-base text-[#BFA7A7] leading-relaxed">
              A rigorous, 6-phase delivery methodology designed to eliminate
              ambiguity, align stakeholders, and extract high-certainty business
              value from enterprise data.
            </p> */}
            <div className="relative mt-6 w-full aspect-[4/3] max-w-[480px]">
              <Image
                src="/images/riz-process.png"
                alt="Process illustration"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column: Sticky Stacking Cards */}
          <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
            {STEPS.map((s, index) => {
              const Icon = s.icon;
              return (
                <CardSticky
                  key={s.step}
                  index={index + 2}
                  incrementY={12}
                  incrementZ={10}
                  className="rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.88)] p-6 md:p-8 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
                >
                  {/* Card Header: Step Number, Icon, and Timeframe */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-lg border border-[#E5484D]/30 bg-[#E5484D]/10 text-[#E5484D]">
                        <Icon className="size-4" />
                      </div>
                      <span className="font-grotesk text-[11px] font-semibold uppercase tracking-wider text-[#ffdad4]/80">
                        {s.timeframe}
                      </span>
                    </div>
                    <span className="font-grotesk text-2xl font-bold tracking-wider text-[#E5484D]">
                      {s.step}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-[#F5EDED] mb-3">
                    {s.title}
                  </h3>

                  {/* Card Body */}
                  <p className="font-sans text-sm text-[#BFA7A7] leading-relaxed mb-6">
                    {s.summary}
                  </p>

                  {/* Deliverable Footer */}
                  {/* <div className="pt-4 border-t border-white/10">
                    <span className="block font-grotesk text-[10px] uppercase tracking-wider text-[#ffb3b0]">
                      Primary Deliverable:
                    </span>
                    <span className="block font-sans text-xs text-[#F5EDED] font-medium mt-1">
                      {s.deliverable}
                    </span>
                  </div> */}
                </CardSticky>
              );
            })}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
