"use client";

import * as React from "react";
import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import FlexCarousel, { FlexCarouselItem } from "@/components/ui/FlexCarousel";

interface Certification {
  name: string;
  issuer: string;
  id: string;
  issueDate: string;
  badgeCode: string;
  skills: string[];
  status: "Active & Verified";
  image: string;
}

const CERTS: Certification[] = [
  {
    name: "Accident Reporting",
    issuer: "iHASCO",
    id: "IIBA-CBAP-884920",
    issueDate: "2023",
    badgeCode: "IIBA Level 3",
    skills: ["BABOK v3", "Enterprise Strategy", "Elicitation", "Solution Architecture"],
    status: "Active & Verified",
    image: "/images/certification/cert-1.jpg",
  },
  {
    name: "AWS Certified Data Analytics — Specialty",
    issuer: "Amazon Web Services (AWS)",
    id: "AWS-DAS-774102",
    issueDate: "2023",
    badgeCode: "AWS Specialty",
    skills: ["AWS Redshift", "Glue", "Athena", "Cloud Data Pipelines"],
    status: "Active & Verified",
    image: "/images/certification/cert-2.png",
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft (PL-300 Exam)",
    id: "MS-PL300-992140",
    issueDate: "2022",
    badgeCode: "Microsoft Associate",
    skills: ["DAX Semantic Models", "Power Query M", "Row-Level Security", "Tenant Governance"],
    status: "Active & Verified",
    image: "/images/certification/cert-3.png",
  },
  {
    name: "Tableau Certified Data Analyst",
    issuer: "Tableau / Salesforce",
    id: "TBL-CDA-443912",
    issueDate: "2022",
    badgeCode: "Tableau Certified",
    skills: ["LOD Calculations", "Visual Analytics", "Tableau Server Governance"],
    status: "Active & Verified",
    image: "/images/certification/cert-4.png",
  },
  {
    name: "PMI-PBA® — Professional in Business Analysis",
    issuer: "Project Management Institute (PMI)",
    id: "PMI-PBA-551093",
    issueDate: "2021",
    badgeCode: "PMI Specialist",
    skills: ["Traceability Matrices", "Needs Assessment", "Benefit Realization"],
    status: "Active & Verified",
    image: "/images/certification/cert-5.png",
  },
  {
    name: "CSPO® — Certified Scrum Product Owner",
    issuer: "Scrum Alliance",
    id: "SA-CSPO-332918",
    issueDate: "2021",
    badgeCode: "Scrum Alliance",
    skills: ["Backlog Prioritization", "Agile User Stories", "Sprint Planning"],
    status: "Active & Verified",
    image: "/images/certification/cert-6.png",
  },
  {
    name: "AWS Certified Data Analytics — Specialty",
    issuer: "Amazon Web Services (AWS)",
    id: "AWS-DAS-774102",
    issueDate: "2023",
    badgeCode: "AWS Specialty",
    skills: ["AWS Redshift", "Glue", "Athena", "Cloud Data Pipelines"],
    status: "Active & Verified",
    image: "/images/certification/cert-7.jpg",
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft (PL-300 Exam)",
    id: "MS-PL300-992140",
    issueDate: "2022",
    badgeCode: "Microsoft Associate",
    skills: ["DAX Semantic Models", "Power Query M", "Row-Level Security", "Tenant Governance"],
    status: "Active & Verified",
    image: "/images/certification/cert-8.jpg",
  },
  {
    name: "Tableau Certified Data Analyst",
    issuer: "Tableau / Salesforce",
    id: "TBL-CDA-443912",
    issueDate: "2022",
    badgeCode: "Tableau Certified",
    skills: ["LOD Calculations", "Visual Analytics", "Tableau Server Governance"],
    status: "Active & Verified",
    image: "/images/certification/cert-9.jpg",
  },
  {
    name: "PMI-PBA® — Professional in Business Analysis",
    issuer: "Project Management Institute (PMI)",
    id: "PMI-PBA-551093",
    issueDate: "2021",
    badgeCode: "PMI Specialist",
    skills: ["Traceability Matrices", "Needs Assessment", "Benefit Realization"],
    status: "Active & Verified",
    image: "/images/certification/cert-10.jpg",
  },
  {
    name: "CSPO® — Certified Scrum Product Owner",
    issuer: "Scrum Alliance",
    id: "SA-CSPO-332918",
    issueDate: "2021",
    badgeCode: "Scrum Alliance",
    skills: ["Backlog Prioritization", "Agile User Stories", "Sprint Planning"],
    status: "Active & Verified",
    image: "/images/certification/cert-11.jpg",
  },
  {
    name: "CSPO® — Certified Scrum Product Owner",
    issuer: "Scrum Alliance",
    id: "SA-CSPO-332918",
    issueDate: "2021",
    badgeCode: "Scrum Alliance",
    skills: ["Backlog Prioritization", "Agile User Stories", "Sprint Planning"],
    status: "Active & Verified",
    image: "/images/certification/cert-12.jpg",
  },
];

const CAROUSEL_ITEMS: FlexCarouselItem[] = CERTS.map((cert) => ({
  src: cert.image,
  alt: `${cert.name} - Issued by ${cert.issuer}`,
  title: cert.name,
  subtitle: `${cert.issuer} • ${cert.badgeCode} (${cert.issueDate})`,
}));

export function CertificationsSection() {
  const [activeCertIndex, setActiveCertIndex] = React.useState(0);
  const activeCert = CERTS[activeCertIndex] || CERTS[0];

  const [zoomFactor, setZoomFactor] = React.useState(1);
  const [gap, setGap] = React.useState(14);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 425) {
        // Zoomed out under 425px by 40%
        setZoomFactor(0.6);
        setGap(10);
      } else if (width < 768) {
        // Zoomed out under 768px by 20%
        setZoomFactor(0.8);
        setGap(12);
      } else {
        // Standard full scale (>= 768px)
        setZoomFactor(1);
        setGap(14);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardHeight = Number((0.52 * zoomFactor).toFixed(3));

  return (
    <section id="certifications" className="relative w-full py-28 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
            <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
              Verified Accreditations
            </span>
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EDED] mb-4">
            Professional Certifications
          </h2>
        </div>

        {/* React Bits FlexCarousel WebGL Component */}
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-[580px] rounded-3xl border border-white/15 bg-gradient-to-b from-[rgba(28,4,4,0.7)] to-[rgba(15,2,2,0.9)] p-2 md:p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden mb-12">
          {/* Subtle Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#E5484D]/15 blur-3xl"
            aria-hidden="true"
          />

          <FlexCarousel
            items={CAROUSEL_ITEMS}
            preset="liquid"
            intro="rise"
            cardHeight={cardHeight}
            gap={gap}
            radius={10}
            squeeze={0.2}
            focusOnClick
            captions
            onChange={(index) => setActiveCertIndex(index)}
          />
        </div>

        {/* Active Certificate Details Card */}
        {/* <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.85)] p-6 md:p-8 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 font-grotesk text-[10px] font-semibold uppercase tracking-wider text-[#ffdad4]">
                  <Award className="size-3 text-[#E5484D]" />
                  <span>{activeCert.badgeCode}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-grotesk text-[11px] text-[#ffdad4]/90">
                  <CheckCircle className="size-3.5 text-[#E5484D]" />
                  <span>{activeCert.status}</span>
                </span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#F5EDED]">
                {activeCert.name}
              </h3>
              <p className="font-sans text-sm text-[#BFA7A7] mt-1">{activeCert.issuer}</p>
            </div>

            <div className="flex md:flex-col items-start md:items-end justify-between gap-1 font-grotesk text-xs text-[#dac1c1]">
              <span className="font-mono text-[#ffdad4]">ID: {activeCert.id}</span>
              <span className="text-[#9B8888]">Issued {activeCert.issueDate}</span>
            </div>
          </div>

          <div className="pt-5">
            <span className="font-grotesk text-xs uppercase tracking-wider text-[#9B8888] block mb-2">
              Verified Competencies & Domains
            </span>
            <div className="flex flex-wrap gap-2">
              {activeCert.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[#dac1c1]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
