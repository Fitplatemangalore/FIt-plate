import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, business, requestType, message, submittedAt } = body;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Resend Warning] RESEND_API_KEY is not configured in process.env.");
      return NextResponse.json(
        { error: "RESEND_API_KEY not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const dateFormatted = submittedAt
      ? new Date(submittedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "medium",
        })
      : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f2; margin: 0; padding: 20px; color: #1c2e1f; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e9de; }
            .header { background-color: #1e3a29; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #d4e3d6; }
            .body-content { padding: 28px; }
            .field-group { margin-bottom: 18px; }
            .field-label { font-size: 12px; text-transform: uppercase; color: #617765; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #1c2e1f; font-weight: 500; }
            .message-box { background-color: #f8faf7; border-left: 4px solid #3e6b48; padding: 14px 18px; border-radius: 4px; margin-top: 8px; font-size: 15px; line-height: 1.6; color: #2d3e30; white-space: pre-wrap; }
            .footer { background-color: #f8faf7; padding: 16px; text-align: center; font-size: 12px; color: #768a7a; border-top: 1px solid #e8eee6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 New Website Enquiry</h1>
              <p>Fit Plate Microgreens Contact Form</p>
            </div>
            <div class="body-content">
              <div class="field-group">
                <div class="field-label">Full Name</div>
                <div class="field-value">${name || "N/A"}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Email Address</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #2e6039; text-decoration: none; font-weight: 600;">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Phone Number</div>
                <div class="field-value">${phone ? `<a href="tel:${phone}" style="color: #2e6039; text-decoration: none;">${phone}</a>` : "Not provided"}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Business Name</div>
                <div class="field-value">${business || "Not provided"}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Request Type</div>
                <div class="field-value">${requestType || "General enquiry"}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Date & Time</div>
                <div class="field-value">${dateFormatted} (IST)</div>
              </div>
              <div class="field-group" style="margin-top: 24px;">
                <div class="field-label">Message</div>
                <div class="message-box">${message || "No message content"}</div>
              </div>
            </div>
            <div class="footer">
              This enquiry was submitted automatically via fitplate.in contact form.
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "greens@fitplate.in",
      subject: `New Contact Enquiry: ${name} (${requestType || "General"})`,
      html: htmlContent,
      text: `New Website Enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nBusiness: ${business || "N/A"}\nRequest Type: ${requestType}\nDate: ${dateFormatted}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      console.error("[Resend Error] Failed to send email notification:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (err) {
    console.error("[Resend Error] Exception sending enquiry email:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
