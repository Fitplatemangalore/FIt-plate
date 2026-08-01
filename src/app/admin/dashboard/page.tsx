"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Inquiry {
  id: string;
  created_at: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  business?: string | null;
  business_name?: string | null;
  email: string;
  phone: string | null;
  type?: string | null;
  request_type?: string | null;
  subject?: string | null;
  message: string | null;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;
      setInquiries((data as Inquiry[]) || []);
    } catch (err: any) {
      setError(err.message || "Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string, displayName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the inquiry from "${displayName}"?\n\nThis will permanently remove the record from the database.`
    );
    if (!confirmed) return;

    setMessage(null);
    setDeletingId(id);

    try {
      const { error: deleteError } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      setMessage({ type: "success", text: `Inquiry from "${displayName}" deleted successfully.` });
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete inquiry: ${err.message || err}` });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Inquiries</h1>
          <p>Contact form submissions from your website visitors.</p>
        </div>
        <div className="admin-stat-badge">
          {inquiries.length} total
        </div>
      </div>

      {message && (
        <div className={`admin-alert ${message.type === "success" ? "admin-alert-success" : "admin-alert-error"}`}>
          {message.text}
        </div>
      )}

      {error && (
        <div className="admin-alert admin-alert-error">
          Could not load inquiries: {error}
        </div>
      )}

      {loading && (
        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--ink-500)" }}>
          Loading inquiries...
        </div>
      )}

      {!loading && !error && inquiries.length === 0 && (
        <div className="admin-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>
          </svg>
          <p>No inquiries yet. They'll appear here when visitors contact you.</p>
        </div>
      )}

      {!loading && inquiries.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Business</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Message</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => {
                const name = inq.name || [inq.first_name, inq.last_name].filter(Boolean).join(" ").trim();
                const business = inq.business || inq.business_name;
                const type = inq.type || inq.request_type || inq.subject;
                const displayName = name || inq.email || "this visitor";

                return (
                  <tr key={inq.id}>
                    <td className="admin-td-meta">
                      {new Date(inq.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td><strong>{name || <span className="admin-muted">—</span>}</strong></td>
                    <td>{business ? business : <span className="admin-muted">—</span>}</td>
                    <td>
                      <a href={`mailto:${inq.email}`} className="admin-link">{inq.email}</a>
                    </td>
                    <td>
                      {inq.phone
                        ? <a href={`tel:${inq.phone}`} className="admin-link">{inq.phone}</a>
                        : <span className="admin-muted">—</span>
                      }
                    </td>
                    <td>
                      {type ? (
                        <span className="admin-tag">{type}</span>
                      ) : (
                        <span className="admin-muted">—</span>
                      )}
                    </td>
                    <td className="admin-td-message">
                      <span title={inq.message ?? ""}>{inq.message ?? "—"}</span>
                    </td>
                    <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => handleDelete(inq.id, displayName)}
                        disabled={deletingId === inq.id}
                        className="admin-icon-btn"
                        style={{
                          color: "#dc2626",
                          borderColor: "#fca5a5",
                          backgroundColor: "#fff5f5",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          cursor: deletingId === inq.id ? "not-allowed" : "pointer",
                          opacity: deletingId === inq.id ? 0.6 : 1,
                        }}
                        title="Delete inquiry"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
