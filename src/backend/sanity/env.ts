import { env } from "@/backend/env";

export const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bestie-sample";
export const isConfigured = Boolean(
  env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "bestie-sample" &&
  env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "dummy-project-id"
);
