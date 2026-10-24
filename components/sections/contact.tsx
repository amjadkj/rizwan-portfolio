"use client";

import * as React from "react";
import {
  Send,
  Calendar,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    organization: "",
    scope: "BI & Dashboard Architecture",
    timeline: "Within 1 - 2 months",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to dispatch message. Please check the details and try again."
        );
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 px-4 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
            <span className="font-grotesk text-xs uppercase tracking-[0.1em] text-[#ffdad4]">
              Start a Conversation
            </span>
            <span className="h-1.5 w-6 rounded-full bg-[#E5484D]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EDED]">
            Let&apos;s Build Data Authority Together
          </h2>
          {/* <p className="mt-4 text-base sm:text-lg text-[#BFA7A7]">
            Available for select strategic business analysis, enterprise BI migrations, process
            re-engineering, and executive advisory engagements.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl md:rounded-3xl border border-white/15 bg-[rgba(24,2,2,0.75)] p-6 md:p-10 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center animate-in fade-in zoom-in-95 duration-400">
                  <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full border border-[#E5484D]/40 bg-[#E5484D]/20 text-[#E5484D] shadow-[0_0_30px_rgba(229,72,77,0.4)]">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-[#F5EDED] mb-2">
                    Message Dispatched Successfully
                  </h3>
                  <p className="max-w-md mx-auto text-sm sm:text-base text-[#dac1c1] leading-relaxed mb-8">
                    Thank you, {formState.name || "Colleague"}. Your project brief has been received.
                    I will review your requirements and respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setErrorMessage(null);
                      setFormState({
                        name: "",
                        email: "",
                        organization: "",
                        scope: "BI & Dashboard Architecture",
                        timeline: "Within 1 - 2 months",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-grotesk uppercase tracking-wider text-[#F5EDED] transition hover:bg-white/10"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="rounded-xl border border-[#E5484D]/40 bg-[#E5484D]/15 p-4 text-xs sm:text-sm text-[#ffdad4] flex items-start gap-3 animate-in fade-in duration-200">
                      <AlertCircle className="size-5 text-[#E5484D] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block text-[#F5EDED] mb-0.5">
                          Unable to Send Message
                        </span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-2">
                        Your Full Name <span className="text-[#E5484D]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-[#F5EDED] placeholder:text-[#9B8888] focus:border-[#E5484D] focus:outline-none focus:ring-2 focus:ring-[#E5484D]/30 transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-2">
                        Work Email <span className="text-[#E5484D]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="s.jenkins@enterprise.com"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-[#F5EDED] placeholder:text-[#9B8888] focus:border-[#E5484D] focus:outline-none focus:ring-2 focus:ring-[#E5484D]/30 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Organization */}
                    <div>
                      <label className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-2">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formState.organization}
                        onChange={(e) =>
                          setFormState({ ...formState, organization: e.target.value })
                        }
                        placeholder="e.g. Horizon Health Systems"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-[#F5EDED] placeholder:text-[#9B8888] focus:border-[#E5484D] focus:outline-none focus:ring-2 focus:ring-[#E5484D]/30 transition"
                      />
                    </div>

                    {/* Scope Category */}
                    <div>
                      <label className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-2">
                        Engagement Scope
                      </label>
                      <select
                        value={formState.scope}
                        onChange={(e) =>
                          setFormState({ ...formState, scope: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/15 bg-[#180202] px-4 py-3 text-sm text-[#F5EDED] focus:border-[#E5484D] focus:outline-none focus:ring-2 focus:ring-[#E5484D]/30 transition"
                      >
                        <option value="BI & Dashboard Architecture">
                          BI & Telemetry Cockpit Design
                        </option>
                        <option value="ERP / Core Systems Migration">
                          ERP / Core Systems Migration
                        </option>
                        <option value="Business Process Optimization">
                          Business Process Optimization
                        </option>
                        <option value="Fractional Senior Business Analyst">
                          Fractional Senior Business Analyst
                        </option>
                        <option value="Other Analytical Advisory">
                          Other Analytical Advisory
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-2">
                      Project Objective / Key Bottlenecks{" "}
                      <span className="text-[#E5484D]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Share details on your current data infrastructure, timeline, or key decisions needing analytical rigor..."
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-[#F5EDED] placeholder:text-[#9B8888] focus:border-[#E5484D] focus:outline-none focus:ring-2 focus:ring-[#E5484D]/30 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#E5484D] py-4 text-sm font-semibold text-[#F5EDED] shadow-[0_0_20px_rgba(229,72,77,0.4)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-[#F05D62] hover:shadow-[0_0_30px_rgba(229,72,77,0.65)] disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Transmitting Brief...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>Dispatch Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Connect & Availability */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Status & Availability Card */}
            <div className="rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.75)] p-6 md:p-8 backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-grotesk text-xs uppercase tracking-wider text-emerald-300 font-medium">
                  Current Availability
                </span>
              </div>
              {/* <h3 className="font-sans text-xl font-bold text-[#F5EDED] mb-2">
                Accepting Strategic Advisory & Q4 Retainers
              </h3> */}
              <p className="text-sm text-[#dac1c1] leading-relaxed mb-6">
                Currently open for BI migrations, and high-stakes data
                requirements engagements worldwide.
              </p>

              {/* Instant Calendar Scheduler Link */}
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#E5484D]/40 bg-[#E5484D]/10 p-4 transition-all duration-300 hover:border-[#E5484D] hover:bg-[#E5484D]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-[#E5484D] text-[#F5EDED] shadow-[0_0_15px_rgba(229,72,77,0.5)]">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-[#F5EDED]">
                      Book a Strategy Session
                    </span>
                    <span className="block text-xs text-[#ffdad4]">
                      Select a 30-minute direct consultation
                    </span>
                  </div>
                </div>
                <span className="text-sm text-[#E5484D] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* Direct Coordinates Card */}
            <div className="rounded-2xl border border-white/15 bg-[rgba(24,2,2,0.75)] p-6 md:p-8 backdrop-blur-2xl">
              <h4 className="font-grotesk text-xs uppercase tracking-wider text-[#ffdad4] mb-5 font-semibold">
                Direct Contact Coordinates
              </h4>
              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3.5 text-sm text-[#dac1c1] hover:text-[#F5EDED] transition"
                >
                  <div className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#E5484D]">
                    <Mail className="size-4" />
                  </div>
                  <span>{siteConfig.email}</span>
                </a>

                <div className="flex items-center gap-3.5 text-sm text-[#dac1c1]">
                  <div className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#E5484D]">
                    <MapPin className="size-4" />
                  </div>
                  <span>{siteConfig.location}</span>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-[#dac1c1]">
                  <div className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#E5484D]">
                    <Clock className="size-4" />
                  </div>
                  <span>Typical Response Time: &lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
