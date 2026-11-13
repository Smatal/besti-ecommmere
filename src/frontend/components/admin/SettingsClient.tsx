"use client";

import { useState, useTransition } from "react";
import { adminUpdateSetting } from "@/backend/actions/admin/settings.actions";
import { Settings, Save, Check } from "lucide-react";

interface SettingItem {
  id: string;
  key: string;
  value: string;
  label: string;
  description: string | null;
  group: string;
  isMultiline: boolean;
}

export function SettingsClient({ settings }: { settings: SettingItem[] }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return map;
  });

  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const handleSave = (key: string) => {
    startTransition(async () => {
      const res = await adminUpdateSetting(key, values[key] || "");
      if (res.success) {
        setSavedKeys((prev) => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setSavedKeys((prev) => ({ ...prev, [key]: false }));
        }, 2500);
      } else {
        alert(res.error || "Failed to update setting");
      }
    });
  };

  // Group settings
  const grouped = settings.reduce((acc, s) => {
    const g = s.group || "general";
    if (!acc[g]) acc[g] = [];
    acc[g].push(s);
    return acc;
  }, {} as Record<string, SettingItem[]>);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Store Configuration & Policies</h1>
          <p className="admin-page-subtitle">
            Manage global operational parameters, shipping thresholds, and customer contact endpoints.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {Object.entries(grouped).map(([groupName, groupSettings]) => (
          <div key={groupName} className="admin-card">
            <div className="admin-card-header">
              <div
                className="admin-card-title"
                style={{ textTransform: "capitalize", display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Settings size={18} color="#0f766e" />
                <span>{groupName} Configuration</span>
              </div>
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {groupSettings.map((s) => (
                <div
                  key={s.key}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #f1f5f9",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>
                        {s.label}
                      </div>
                      {s.description && (
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{s.description}</div>
                      )}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#94a3b8" }}>
                      {s.key}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {s.isMultiline ? (
                      <textarea
                        className="admin-input"
                        style={{ height: "70px", padding: "8px 12px", resize: "vertical" }}
                        value={values[s.key] || ""}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [s.key]: e.target.value }))
                        }
                        disabled={isPending}
                      />
                    ) : (
                      <input
                        type="text"
                        className="admin-input"
                        value={values[s.key] || ""}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [s.key]: e.target.value }))
                        }
                        disabled={isPending}
                      />
                    )}

                    <button
                      type="button"
                      className={`admin-btn ${
                        savedKeys[s.key] ? "admin-btn-primary" : "admin-btn-outline"
                      }`}
                      onClick={() => handleSave(s.key)}
                      disabled={isPending}
                      style={{ flexShrink: 0 }}
                    >
                      {savedKeys[s.key] ? (
                        <>
                          <Check size={14} />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Save size={14} />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
