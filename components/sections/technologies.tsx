"use client";

import * as React from "react";
import {
  SiPython,
  // SiTableau,
  SiPostgresql,
  SiSnowflake,
  // SiDbt,
  SiJira,
  SiConfluence,
  // SiAmazonwebservices,
  SiDocker,
  SiGit,
  SiGooglecloud,
} from "react-icons/si";
import { BarChart3, Database, Workflow, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MARQUEE_ROW_1 = [
  { name: "Power BI", icon: BarChart3, category: "Business Intelligence" },
  // { name: "Tableau", icon: SiTableau, category: "Visual Analytics" },
  { name: "Python", icon: SiPython, category: "Data Science & Automation" },
  { name: "SQL (Postgres/T-SQL)", icon: SiPostgresql, category: "Data Querying" },
  { name: "Snowflake", icon: SiSnowflake, category: "Cloud Data Warehouse" },
  // { name: "dbt", icon: SiDbt, category: "Analytics Engineering" },
  // { name: "AWS Cloud", icon: SiAmazonwebservices, category: "Cloud Ecosystem" },
  { name: "Google BigQuery", icon: SiGooglecloud, category: "Big Data Processing" },
];

const MARQUEE_ROW_2 = [
  { name: "Jira Software", icon: SiJira, category: "Agile Project Tracking" },
  { name: "Confluence", icon: SiConfluence, category: "Requirements & Specs" },
  // { name: "Docker", icon: SiDocker, category: "Containerization" },
  // { name: "Git & Versioning", icon: SiGit, category: "Code Collaboration" },
  { name: "Advanced Excel / DAX", icon: Layers, category: "Financial Modeling" },
  { name: "Process Modeling", icon: Workflow, category: "BPMN 2.0 & Flowcharts" },
  // { name: "Database Schema Design", icon: Database, category: "Relational Modeling" },
  { name: "Statistical Inference", icon: BarChart3, category: "Hypothesis Testing" },
];

const DOMAINS = [
  {
    id: "bi",
    label: "BI & Telemetry",
    icon: BarChart3,
    description:
      "Transforming fragmented tabular data into intuitive executive dashboards and automated KPI surveillance cockpits.",
    capabilities: [
      "Enterprise DAX & Power Query Optimization",
      "Executive Storytelling & Interactive Visuals",
      "Scheduled Data Refresh & Gateway Architecture",
      "Multi-tenant Row-Level Security (RLS)",
    ],
  },
  {
    id: "data-arch",
    label: "Data Architecture & SQL",
    icon: Database,
    description:
      "Architecting clean dimensional schemas (Star & Snowflake) and writing robust analytical queries on modern warehouses.",
    capabilities: [
      "Complex SQL Window Functions & CTEs",
      "Data Normalization & Star Schema Design",
      "ETL / ELT Data Transformation Pipelines",
      "Data Quality Validation & Reconciliation",
    ],
  },
  {
    id: "strategy",
    label: "Business Process & BA",
    icon: Workflow,
    description:
      "Bridging technical development squads and executive leadership through clear, rigorous business analysis and workflow design.",
    capabilities: [
      "BRD, FRD & User Story Writing",
      "AS-IS vs. TO-BE Gap Diagnostics",
      "Lean Six Sigma Process Waste Reduction",
      "Stakeholder Consensus & Change Governance",
    ],
  },
];

export function TechnologiesSection() {
  const [activeDomain, setActiveDomain] = React.useState("bi");
  const selectedDomain = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  return (
    <section id="technologies" className="relative w-full py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Section Title */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
            <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
              Technology & Tooling Ecosystem
            </span>
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EDED]">
            Engineered for Modern Enterprise Analytics
          </h2>
          {/* <p className="mt-4 text-base sm:text-lg text-[#BFA7A7]">
            Leveraging battle-tested data tools, predictive scripting, and structured business
            analysis frameworks to deliver actionable intelligence.
          </p> */}
        </div>
      </div>

      {/* Infinite Marquee Track 1 (Left to Right) */}
      <div className="relative w-full overflow-hidden py-3 mb-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-4">
          {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 rounded-full border border-white/12 bg-[rgba(24,2,2,0.7)] px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#E5484D]/40 hover:bg-[#E5484D]/10"
              >
                <Icon className="size-5 text-[#ffdad4] transition-colors group-hover:text-[#E5484D]" />
                <span className="whitespace-nowrap font-sans text-sm font-medium text-[#F5EDED]">
                  {item.name}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="whitespace-nowrap font-grotesk text-xs text-[#BFA7A7]">
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Marquee Track 2 (Right to Left) */}
      <div className="relative w-full overflow-hidden py-3 mb-16 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee-reverse flex items-center gap-4">
          {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 rounded-full border border-white/12 bg-[rgba(24,2,2,0.7)] px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#E5484D]/40 hover:bg-[#E5484D]/10"
              >
                <Icon className="size-5 text-[#ffdad4] transition-colors group-hover:text-[#E5484D]" />
                <span className="whitespace-nowrap font-sans text-sm font-medium text-[#F5EDED]">
                  {item.name}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="whitespace-nowrap font-grotesk text-xs text-[#BFA7A7]">
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Proficiency Matrix */}
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {/* Domain Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isActive = activeDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomain(domain.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5484D]",
                  isActive
                    ? "border border-[#E5484D] bg-[#E5484D]/20 text-[#ffdad4] shadow-[0_0_20px_rgba(229,72,77,0.35)]"
                    : "border border-white/12 bg-white/5 text-[#F5EDED]/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="size-4 text-[#E5484D]" />
                <span>{domain.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Card */}
        <div className="rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.75)] p-8 md:p-10 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="font-grotesk text-xs uppercase tracking-wider text-[#E5484D]">
                Specialized Competency
              </span>
              <h3 className="font-sans text-2xl font-bold text-[#F5EDED] mt-1">
                {selectedDomain.label}
              </h3>
            </div>
            <p className="max-w-xl text-sm sm:text-base text-[#dac1c1] leading-relaxed">
              {selectedDomain.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedDomain.capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/8"
              >
                <CheckCircle2 className="size-5 shrink-0 text-[#E5484D] mt-0.5" />
                <span className="text-sm font-medium text-[#F5EDED]">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
