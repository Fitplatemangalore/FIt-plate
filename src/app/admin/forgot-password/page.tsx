"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <img src="/assets/img/logo.png" alt="Fit Plate" />
          <h1>Reset Password</h1>
          <p>Enter your admin email and we'll send a reset link.</p>
        </div>

        {sent ? (
          <div className="admin-login-success">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <p>Reset link sent! Check your inbox at <strong>{email}</strong>.</p>
            <Link href="/admin/login" className="btn btn-forest" style={{ marginTop: "20px", display: "inline-flex" }}>
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="admin-login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}
            <div className="field">
              <label htmlFor="forgot-email">Email Address</label>
              <input
                id="forgot-email"
                type="email"
                placeholder="admin@fitplate.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-gold admin-login-btn" disabled={loading}>
              {loading ? <><span className="admin-spinner" />Sending…</> : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="admin-login-footer">
          <Link href="/admin/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
