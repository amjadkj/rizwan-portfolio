"use client";

import * as React from "react";
import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  id: string;
  issueDate: string;
  badgeCode: string;
  skills: string[];
  status: "Active & Verified";
}

const CERTS: Certification[] = [
  {
    name: "CBAP® — Certified Business Analysis Professional",
    issuer: "International Institute of Business Analysis (IIBA)",
    id: "IIBA-CBAP-884920",
    issueDate: "2023",
    badgeCode: "IIBA Level 3",
    skills: ["BABOK v3", "Enterprise Strategy", "Elicitation", "Solution Architecture"],
    status: "Active & Verified",
  },
  {
    name: "AWS Certified Data Analytics — Specialty",
    issuer: "Amazon Web Services (AWS)",
    id: "AWS-DAS-774102",
    issueDate: "2023",
    badgeCode: "AWS Specialty",
    skills: ["AWS Redshift", "Glue", "Athena", "Cloud Data Pipelines"],
    status: "Active & Verified",
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft (PL-300 Exam)",
    id: "MS-PL300-992140",
    issueDate: "2022",
    badgeCode: "Microsoft Associate",
    skills: ["DAX Semantic Models", "Power Query M", "Row-Level Security", "Tenant Governance"],
    status: "Active & Verified",
  },
  {
    name: "Tableau Certified Data Analyst",
    issuer: "Tableau / Salesforce",
    id: "TBL-CDA-443912",
    issueDate: "2022",
    badgeCode: "Tableau Certified",
    skills: ["LOD Calculations", "Visual Analytics", "Tableau Server Governance"],
    status: "Active & Verified",
  },
  {
    name: "PMI-PBA® — Professional in Business Analysis",
    issuer: "Project Management Institute (PMI)",
    id: "PMI-PBA-551093",
    issueDate: "2021",
    badgeCode: "PMI Specialist",
    skills: ["Traceability Matrices", "Needs Assessment", "Benefit Realization"],
    status: "Active & Verified",
  },
  {
    name: "CSPO® — Certified Scrum Product Owner",
    issuer: "Scrum Alliance",
    id: "SA-CSPO-332918",
    issueDate: "2021",
    badgeCode: "Scrum Alliance",
    skills: ["Backlog Prioritization", "Agile User Stories", "Sprint Planning"],
    status: "Active & Verified",
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative w-full py-28 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
              <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
                Verified Accreditations
              </span>
              <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EDED]">
              Professional Certifications
            </h2>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((cert) => (
            <div
              key={cert.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.75)] p-6 md:p-8 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-2xl transition-all duration-300 hover:border-[#E5484D]/40 hover:bg-[rgba(24,2,2,0.9)] hover:-translate-y-1"
            >
              <div>
                {/* Header row: badge code & verified indicator */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 font-grotesk text-[10px] font-semibold uppercase tracking-wider text-[#ffdad4]">
                    <Award className="size-3 text-[#E5484D]" />
                    <span>{cert.badgeCode}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 font-grotesk text-[11px] text-[#ffdad4]/90">
                    <CheckCircle className="size-3.5 text-[#E5484D]" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                {/* Certification Title */}
                <h3 className="font-sans text-lg font-bold text-[#F5EDED] group-hover:text-white transition-colors leading-snug mb-2">
                  {cert.name}
                </h3>

                {/* Issuing Body */}
                <p className="font-sans text-xs text-[#BFA7A7] mb-5">{cert.issuer}</p>

                {/* Skills Tested */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[11px] text-[#dac1c1]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Credential ID & Year */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-grotesk text-[11px] text-[#9B8888]">
                <span>ID: {cert.id}</span>
                <span>Issued {cert.issueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
