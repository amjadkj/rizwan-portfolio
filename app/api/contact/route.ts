import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, scope, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        "RESEND_API_KEY is not defined in environment variables. Please add it to your .env.local file."
      );
      return NextResponse.json(
        {
          error:
            "Email service is not yet configured with a Resend API key. Please check server settings.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const recipientEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || siteConfig.email;
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    // Build stylized HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0202; color: #f5eded; margin: 0; padding: 24px; }
            .card { background-color: #1a0404; border: 1px solid rgba(229, 72, 77, 0.3); border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 24px; }
            .badge { display: inline-block; background-color: rgba(229, 72, 77, 0.2); color: #ffdad4; padding: 4px 12px; border-radius: 9999px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; border: 1px solid rgba(229, 72, 77, 0.4); margin-bottom: 12px; }
            h1 { color: #f5eded; font-size: 22px; margin: 0 0 6px 0; font-weight: 700; }
            .row { margin-bottom: 18px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #ffdad4; margin-bottom: 4px; font-weight: 600; }
            .value { font-size: 15px; color: #f5eded; line-height: 1.5; }
            .value a { color: #E5484D; text-decoration: none; }
            .message-box { background-color: #0f0202; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #dac1c1; white-space: pre-wrap; margin-top: 6px; }
            .footer { border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 28px; padding-top: 16px; font-size: 12px; color: #9b8888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">New Project Inquiry</span>
              <h1>Lead from ${escapeHtml(name)}</h1>
              <div style="font-size: 13px; color: #bfa7a7;">Received via Portfolio Contact System</div>
            </div>

            <div class="row">
              <div class="label">Sender Name</div>
              <div class="value"><strong>${escapeHtml(name)}</strong></div>
            </div>

            <div class="row">
              <div class="label">Work Email</div>
              <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>

            ${
              organization
                ? `
            <div class="row">
              <div class="label">Organization / Company</div>
              <div class="value">${escapeHtml(organization)}</div>
            </div>
            `
                : ""
            }

            <div class="row">
              <div class="label">Engagement Scope</div>
              <div class="value">${escapeHtml(scope || "General Inquiry")}</div>
            </div>

            <div class="row">
              <div class="label">Project Objective / Details</div>
              <div class="message-box">${escapeHtml(message)}</div>
            </div>

            <div class="footer">
              Direct reply enabled: click "Reply" in your email client to respond to ${escapeHtml(email)}
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientEmail],
      replyTo: email,
      subject: `Project Inquiry: ${name} (${scope || "Business Analysis"})`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send message through Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (err: any) {
    console.error("Contact API route exception:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
