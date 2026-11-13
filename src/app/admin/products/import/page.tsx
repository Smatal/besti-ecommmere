"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

export default function AdminProductImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "previewing" | "confirming" | "executing" | "success" | "error">("idle");
  const [previewData, setPreviewData] = useState<any>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadTemplate = () => {
    window.location.href = "/api/admin/imports/template";
  };

  const handlePreview = async () => {
    if (!file) return;
    setStatus("previewing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("excel", file);

      const res = await fetch("/api/admin/imports/preview", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process preview");

      setPreviewData(data);
      setStatus("confirming");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to analyze spreadsheet");
      setStatus("error");
    }
  };

  const handleExecute = async () => {
    if (!file) return;
    setStatus("executing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("excel", file);

      const res = await fetch("/api/admin/imports/execute", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to execute bulk import");

      setResultData(data);
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to execute import");
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewData(null);
    setResultData(null);
    setErrorMessage("");
    setStatus("idle");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <Link
              href="/admin/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.82rem",
                color: "#0f766e",
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to Products</span>
            </Link>
          </div>
          <h1 className="admin-page-title">Excel Catalog Import Pipeline</h1>
          <p className="admin-page-subtitle">
            Bulk-create or update Sanity CMS formulations and Neon DB stock levels via spreadsheet.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="admin-btn admin-btn-outline"
        >
          <Download size={16} />
          <span>Download Template (.xlsx)</span>
        </button>
      </div>

      {/* Error Alert */}
      {status === "error" && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            padding: "16px",
            borderRadius: "10px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <div style={{ fontWeight: 700 }}>Import Operation Failed</div>
            <div style={{ fontSize: "0.85rem", marginTop: "2px" }}>{errorMessage}</div>
            <button
              type="button"
              onClick={reset}
              className="admin-btn admin-btn-outline admin-btn-sm"
              style={{ marginTop: "10px" }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Success View */}
      {status === "success" && resultData && (
        <div className="admin-card" style={{ marginBottom: "20px" }}>
          <div
            className="admin-card-header"
            style={{
              backgroundColor: resultData.errors?.length > 0 ? "#fef3c7" : "#dcfce7",
              color: resultData.errors?.length > 0 ? "#92400e" : "#14532d",
            }}
          >
            <div className="admin-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} />
              <span>Import Execution Completed</span>
            </div>
          </div>

          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #bbf7d0",
                  backgroundColor: "#f0fdf4",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 600 }}>
                  Successfully Processed
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#15803d" }}>
                  {resultData.successCount}
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #fecaca",
                  backgroundColor: "#fef2f2",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "#991b1b", fontWeight: 600 }}>
                  Failed / Skipped
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#b91c1c" }}>
                  {resultData.errors?.length || 0}
                </div>
              </div>
            </div>

            {resultData.errors?.length > 0 && (
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  padding: "14px",
                  marginBottom: "20px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: "8px" }}>
                  Error Specifics:
                </div>
                <ul style={{ fontSize: "0.8rem", paddingLeft: "20px", color: "#b91c1c" }}>
                  {resultData.errors.map((err: any, idx: number) => (
                    <li key={idx}>
                      <strong>{err.sku}</strong>: {err.reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <Link href="/admin/products" className="admin-btn admin-btn-primary" style={{ flex: 1 }}>
                View Catalog Formulations
              </Link>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                onClick={reset}
                style={{ flex: 1 }}
              >
                Import Another File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Box (Idle / Previewing) */}
      {(status === "idle" || status === "previewing") && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Select Spreadsheet File</div>
          </div>

          <div style={{ padding: "24px" }}>
            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "12px",
                padding: "36px 20px",
                textAlign: "center",
                backgroundColor: "#f8fafc",
                marginBottom: "20px",
              }}
            >
              <FileSpreadsheet size={40} color="#0f766e" style={{ margin: "0 auto 12px" }} />
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "4px" }}>
                Choose an Excel (.xlsx) or CSV file
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "16px" }}>
                Ensure your file matches the official template schema.
              </div>

              <input
                type="file"
                id="file-upload"
                accept=".xlsx,.csv"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="file-upload"
                className="admin-btn admin-btn-outline"
                style={{ display: "inline-flex", cursor: "pointer" }}
              >
                <Upload size={16} />
                <span>{file ? file.name : "Browse File on Device"}</span>
              </label>
            </div>

            {file && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#f1f5f9",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <FileSpreadsheet size={20} color="#0f766e" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{file.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFile(null)}
                  style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}
                >
                  Remove
                </button>
              </div>
            )}

            <button
              type="button"
              className="admin-btn admin-btn-primary"
              style={{ width: "100%", height: "42px" }}
              onClick={handlePreview}
              disabled={!file || status === "previewing"}
            >
              {status === "previewing" ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Validating File Against Sanity & Neon DB...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Generate Pre-Flight Verification</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Preview Confirmation View */}
      {status === "confirming" && previewData && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Pre-Flight Validation Preview</div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Review parsed counts before writing
            </span>
          </div>

          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #bbf7d0",
                  backgroundColor: "#f0fdf4",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.78rem", color: "#166534", fontWeight: 700 }}>
                  WILL CREATE
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#15803d" }}>
                  {previewData.willCreate}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>New formulations</div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #bfdbfe",
                  backgroundColor: "#eff6ff",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.78rem", color: "#1e40af", fontWeight: 700 }}>
                  WILL UPDATE
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1d4ed8" }}>
                  {previewData.willUpdate}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Existing SKUs</div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #fecaca",
                  backgroundColor: "#fef2f2",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.78rem", color: "#991b1b", fontWeight: 700 }}>
                  WILL FAIL
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#b91c1c" }}>
                  {previewData.willFail}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Invalid rows</div>
              </div>
            </div>

            {previewData.failures?.length > 0 && (
              <div
                style={{
                  backgroundColor: "#fff1f2",
                  border: "1px solid #fecdd3",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#be123c", marginBottom: "8px" }}>
                  Validation Errors in Uploaded Sheet:
                </div>
                <table className="admin-table" style={{ backgroundColor: "#ffffff" }}>
                  <thead>
                    <tr>
                      <th>Excel Row</th>
                      <th>SKU</th>
                      <th>Failure Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.failures.map((f: any, idx: number) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>#{f.row}</td>
                        <td style={{ fontWeight: 600, color: "#be123c" }}>{f.sku}</td>
                        <td style={{ color: "#881337" }}>{f.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                style={{ flex: 1 }}
                onClick={() => setStatus("idle")}
              >
                Cancel & Choose Different File
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                style={{ flex: 1 }}
                onClick={handleExecute}
                disabled={previewData.validRows?.length === 0}
              >
                <CheckCircle2 size={16} />
                <span>Execute Batch Import ({previewData.validRows?.length || 0} Products)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Executing Spinner */}
      {status === "executing" && (
        <div className="admin-card" style={{ padding: "48px 24px", textAlign: "center" }}>
          <RefreshCw size={36} color="#0f766e" className="animate-spin" style={{ margin: "0 auto 16px" }} />
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
            Synchronizing with Sanity CMS & Neon DB...
          </div>
          <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Please keep this tab open while documents and inventory rows are committed.
          </div>
        </div>
      )}
    </div>
  );
}
