"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  impactMetrics: {
    primary: string;
    primaryLabel: string;
    secondary: string;
    secondaryLabel: string;
  };
  summary: string;
  deliverables: string[];
  techStack: string[];
}

const PROJECTS: Project[] = [
  {
    id: "supply-chain",
    title: "BUSINESS ANALYSIS & BI PROJECT",
    category: "Operations & BI",
    client: "OLIST E-COMMERCE",
    impactMetrics: {
      primary: "14.69%",
      primaryLabel: "Low Customer Satisfaction Rate",
      secondary: "6.66%",
      secondaryLabel: "Late Delivery Rate",
    },
    summary:
      "Analysed customer review data from the Olist Brazilian e-commerce marketplace using Power BI and Power Query to investigate low customer satisfaction, assess delivery performance, compare product category trends, and identify opportunities for data-driven business improvements.",
    deliverables: [
      "Delivery Performance & Low-Rating Analysis",
      "Seller Performance Monitoring",
      "Product Category Satisfaction Analysis",
      "Customer Feedback & Data Quality Reporting",
    ],
    techStack: ["Power BI", "PowerQuery", "Excel"],
  },
  // {
  //   id: "fintech-erp",
  //   title: "Enterprise Core Banking Migration & Revenue Reconciliation",
  //   category: "Financial Systems",
  //   client: "Tier-1 FinTech Platform",
  //   impactMetrics: {
  //     primary: "15x",
  //     primaryLabel: "Reporting Velocity",
  //     secondary: "99.99%",
  //     secondaryLabel: "Audit Reconciliation Rate",
  //   },
  //   summary:
  //     "Led technical requirement mapping and stakeholder consensus for migration of core transaction ledgers processing over 2.4 million daily events.",
  //   deliverables: [
  //     "BRD & Comprehensive Functional Specification",
  //     "Automated transaction exception matching engine",
  //     "SOX compliance verification protocols",
  //   ],
  //   techStack: ["Tableau", "PostgreSQL", "AWS Redshift", "Jira", "Confluence"],
  // },
  // {
  //   id: "saas-churn",
  //   title: "Predictive Churn Mitigation & Contract Renewal Intelligence",
  //   category: "Predictive Modeling",
  //   client: "Global Enterprise SaaS Provider",
  //   impactMetrics: {
  //     primary: "-28%",
  //     primaryLabel: "Annual Churn Rate",
  //     secondary: "+$4.2M",
  //     secondaryLabel: "Retained ARR",
  //   },
  //   summary:
  //     "Formulated multivariate customer health scoring combining telemetry signals, support ticket sentiment, and contract utilization curves.",
  //   deliverables: [
  //     "Customer health quadrant visualization",
  //     "Automated early warning trigger system",
  //     "Executive account renewal playbook",
  //   ],
  //   techStack: ["Python", "Scikit-Learn", "Tableau", "SQL", "Excel VBA"],
  // },
  // {
  //   id: "healthcare-ops",
  //   title: "Clinical Workflow Optimization & Resource Allocation Framework",
  //   category: "Process Engineering",
  //   client: "Metropolitan Healthcare Consortium",
  //   impactMetrics: {
  //     primary: "-42 min",
  //     primaryLabel: "Patient Intake Cycle",
  //     secondary: "+22%",
  //     secondaryLabel: "Bed Capacity Utilization",
  //   },
  //   summary:
  //     "Redesigned multi-facility clinical intake throughput using Lean Six Sigma methodologies, eliminating administrative bottlenecks across acute care centers.",
  //   deliverables: [
  //     "End-to-end value stream mapping",
  //     "Dynamic nurse staffing projection model",
  //     "Emergency room live throughput dashboard",
  //   ],
  //   techStack: ["Power BI", "Visio Process Maps", "SQL", "Agile Kanban"],
  // },
];

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentProject = PROJECTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section id="projects" className="relative w-full py-28 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
              <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
                Strategic Case Studies
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EDED]">
              Featured Analytics Projects
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-grotesk text-sm text-[#BFA7A7] mr-2">
              0{currentIndex + 1} / 0{PROJECTS.length}
            </span>
            {/* <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-[#F5EDED] transition hover:border-white/30 hover:bg-white/10 hover:text-[#E5484D] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[#E5484D]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-[#F5EDED] transition hover:border-white/30 hover:bg-white/10 hover:text-[#E5484D] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[#E5484D]"
            >
              <ChevronRight className="size-5" />
            </button> */}
          </div>
        </div>

        {/* Featured Project Showcase Card (Atmospheric Glassmorphism) */}
        <div className="relative rounded-2xl md:rounded-3xl border border-white/15 bg-[rgba(24,2,2,0.75)] p-6 md:p-10 lg:p-12 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden transition-all duration-500">
          {/* Subtle Ambient Radial Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(229,72,77,0.18)_0%,transparent_70%)] blur-3xl"
          />

          <div
            key={currentProject.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 animate-project-fade"
          >
              {/* Left Column: Scope & Metrics */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="rounded-full border border-[#E5484D]/30 bg-[#E5484D]/15 px-3 py-1 font-grotesk text-xs font-semibold text-[#ffdad4] uppercase tracking-wider">
                      {currentProject.category}
                    </span>
                    <span className="font-grotesk text-xs text-[#BFA7A7] uppercase tracking-wider">
                      Client: {currentProject.client}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F5EDED] leading-tight mb-6">
                    {currentProject.title}
                  </h3>

                  <p className="font-sans text-base sm:text-lg text-[#dac1c1] leading-relaxed mb-8">
                    {currentProject.summary}
                  </p>

                  {/* Key Deliverables */}
                  <div className="mb-8">
                    <h4 className="font-grotesk text-xs font-semibold text-[#ffb3b0] uppercase tracking-[0.08em] mb-3">
                      Core Solutions & Deliverables
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentProject.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm text-[#F5EDED]">
                          <span className="size-1.5 rounded-full bg-[#E5484D]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                  {currentProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[#F5EDED]/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Quantitative Impact Metrics Card */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-grotesk uppercase tracking-wider text-[#ffdad4] mb-6">
                    <TrendingUp className="size-4 text-[#E5484D]" />
                    <span>Key Project Findings</span>
                  </div>

                  {/* Primary Metric */}
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <span className="block font-grotesk text-5xl md:text-6xl font-bold tracking-tight text-[#E5484D] drop-shadow-[0_0_24px_rgba(229,72,77,0.4)]">
                      {currentProject.impactMetrics.primary}
                    </span>
                    <span className="block font-sans text-sm text-[#BFA7A7] mt-1">
                      {currentProject.impactMetrics.primaryLabel}
                    </span>
                  </div>

                  {/* Secondary Metric */}
                  <div>
                    <span className="block font-grotesk text-4xl md:text-5xl font-bold tracking-tight text-[#F5EDED]">
                      {currentProject.impactMetrics.secondary}
                    </span>
                    <span className="block font-sans text-sm text-[#BFA7A7] mt-1">
                      {currentProject.impactMetrics.secondaryLabel}
                    </span>
                  </div>
                </div>

                {/* Slider Dots Navigator */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    {PROJECTS.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          currentIndex === idx
                            ? "w-8 bg-[#E5484D] shadow-[0_0_12px_#E5484D]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        )}
                      />
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-grotesk uppercase tracking-widest text-[#ffdad4] hover:text-[#E5484D] transition-colors"
                  >
                    <span>View Full Case Study</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
