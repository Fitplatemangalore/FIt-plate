import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Inquiries | Fit Plate Admin" };

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

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Inquiries</h1>
          <p>Contact form submissions from your website visitors.</p>
        </div>
        <div className="admin-stat-badge">
          {inquiries?.length ?? 0} total
        </div>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error">
          Could not load inquiries: {error.message}
        </div>
      )}

      {!error && (!inquiries || inquiries.length === 0) && (
        <div className="admin-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>
          </svg>
          <p>No inquiries yet. They'll appear here when visitors contact you.</p>
        </div>
      )}

      {inquiries && inquiries.length > 0 && (
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
              </tr>
            </thead>
            <tbody>
              {(inquiries as Inquiry[]).map((inq) => {
                const name = inq.name || [inq.first_name, inq.last_name].filter(Boolean).join(" ").trim();
                const business = inq.business || inq.business_name;
                const type = inq.type || inq.request_type || inq.subject;

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
