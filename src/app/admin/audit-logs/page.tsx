import { adminGetAuditLogs } from "@/backend/actions/admin/audit.actions";
import { ScrollText, ShieldAlert } from "lucide-react";

export const revalidate = 0;

export default async function AdminAuditLogsPage() {
  const logs = await adminGetAuditLogs(100);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">System Audit & Compliance Log</h1>
          <p className="admin-page-subtitle">
            Immutable transaction record tracking every state mutation, stock adjustment, and catalog edit.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Action Code</th>
                <th>Entity Type</th>
                <th>Target Entity ID</th>
                <th>Activity Summary</th>
                <th>Operator</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No audit logs recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <span className="admin-badge admin-badge-slate" style={{ fontFamily: "monospace" }}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-info">{log.entityType || "System"}</span>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#0f766e" }}>
                      {log.entityId || "N/A"}
                    </td>
                    <td style={{ maxWidth: "400px" }}>{log.summary}</td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {log.adminUser?.name || "System Automated"}
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#64748b", whiteSpace: "nowrap" }}>
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

