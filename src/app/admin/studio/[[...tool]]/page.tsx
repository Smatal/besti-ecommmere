"use client";

import { NextStudio } from "next-sanity/studio";
import baseConfig from "../../../../../sanity.config";
import { useMemo } from "react";

export default function AdminStudioPage() {
  const adminStudioConfig = useMemo(() => {
    return {
      ...baseConfig,
      basePath: "/admin/studio",
    };
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 112px)",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      <NextStudio config={adminStudioConfig} />
    </div>
  );
}
