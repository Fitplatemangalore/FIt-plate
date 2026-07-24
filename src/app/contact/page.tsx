"use client";

import Link from "next/link";
import { useState } from "react";

import { createClient } from "@/utils/supabase/client";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requestType, setRequestType] = useState("Wholesale / bulk pricing");
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Split name into first and last name for DB schema
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || " ";

    const { error: dbError } = await supabase.from("inquiries").insert([
      {
        first_name: firstName,
        last_name: lastName,
        business_name: business.trim() || null,
        email: email.trim(),
        phone: phone.trim() || null,
        request_type: requestType,
        message: message.trim(),
      },
    ]);

    if (dbError) {
      setError(dbError.message);
    } else {
      setSubmitted(true);
      // Reset form
      setName("");
      setBusiness("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <main>
      <section className="page-hero" style={{ minHeight: "38vh" }}>
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593850684282-82029c1ac6be?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs"><Link href="/">Home</Link> / <span>Contact Us</span></div>
          <div className="eyebrow">Get In Touch</div>
          <h1>Let's grow a healthier tomorrow, together.</h1>
          <p>Questions about varieties, bulk pricing, or delivery? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section alt" style={{ paddingTop: "80px" }}>
        <div className="container">
          <div className="grid-4 reveal stagger">
            <div className="card" style={{ padding: "28px" }}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></div>
              <h3 style={{ fontSize: "15.5px", marginTop: "14px" }}>Visit Us</h3>
              <p style={{ marginTop: "6px", fontSize: "14px" }}>Fitplate Ventures<br />Kodikal, Mangalore</p>
            </div>
            <div className="card" style={{ padding: "28px" }}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
              <h3 style={{ fontSize: "15.5px", marginTop: "14px" }}>Call Us</h3>
              <p style={{ marginTop: "6px", fontSize: "14px" }}><a href="tel:8217304370">+91 82173 04370</a></p>
            </div>
            <div className="card" style={{ padding: "28px" }}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg></div>
              <h3 style={{ fontSize: "15.5px", marginTop: "14px" }}>Email Us</h3>
              <p style={{ marginTop: "6px", fontSize: "14px" }}><a href="mailto:greens@fitplate.in">greens@fitplate.in</a></p>
            </div>
            <div className="card" style={{ padding: "28px" }}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg></div>
              <h3 style={{ fontSize: "15.5px", marginTop: "14px" }}>Business Hours</h3>
              <p style={{ marginTop: "6px", fontSize: "14px" }}>Mon &ndash; Sat, 9am &ndash; 6pm</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: "flex-start", gap: "56px" }}>
          <div className="reveal">
            <div className="eyebrow">Send a Message</div>
            <h2 style={{ marginTop: "12px" }}>Request a quote or ask us anything.</h2>
            <form style={{ marginTop: "32px" }} onSubmit={handleSubmit}>
              {error && (
                <div style={{ color: "#991b1b", background: "#fee2e2", border: "1px solid #fca5a5", padding: "12px 14px", borderRadius: "10px", fontSize: "14px", marginBottom: "16px" }}>
                  Error submitting form: {error}
                </div>
              )}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="business">Business Name</label>
                  <input
                    id="business"
                    type="text"
                    placeholder="Hotel / Restaurant / Catering co."
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="req">What are you looking for?</label>
                <select
                  id="req"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  <option>Wholesale / bulk pricing</option>
                  <option>Sample tray request</option>
                  <option>Custom variety mix</option>
                  <option>General enquiry</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="msg">Message</label>
                <textarea
                  id="msg"
                  placeholder="Tell us about your kitchen and requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: "100%", padding: "15px" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}{" "}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              {submitted && (
                <div className="form-success" style={{ display: "flex", marginTop: "16px", alignItems: "center", gap: "10px", color: "var(--forest-800)", fontWeight: 700, fontSize: "14px", background: "var(--cream-100)", padding: "14px 18px", borderRadius: "12px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> Thanks &mdash; we'll be in touch shortly.
                </div>
              )}
            </form>
          </div>
          <div className="reveal">
            <div className="eyebrow">Find Us</div>
            <h2 style={{ marginTop: "12px" }}>Kodikal, Mangalore</h2>
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginTop: "24px", border: "1px solid var(--line)" }}>
              <iframe
                src="https://www.google.com/maps?q=Kodikal,Mangalore,Karnataka&output=embed"
                width="100%" height="340" style={{ border: 0, display: "block" }} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Fit Plate location map">
              </iframe>
            </div>
            <div className="card" style={{ marginTop: "24px", padding: "26px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12a5 5 0 0 1-5-5c3 0 5 1 5 5Z" /><path d="M12 8a5 5 0 0 1 5-5c0 3-1 5-5 5Z" /></svg></div>
              <div>
                <h3 style={{ fontSize: "16px" }}>Prefer WhatsApp?</h3>
                <p style={{ marginTop: "6px", fontSize: "14px" }}>Message us directly for a quick response on availability and pricing.</p>
                <a href="https://wa.me/918217304370" target="_blank" rel="noopener noreferrer" className="btn btn-forest btn-sm" style={{ marginTop: "14px" }}>Chat on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
