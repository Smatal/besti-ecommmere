import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isConfigured } from "../env";
import { env } from "@/backend/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  ...(env.SANITY_API_READ_TOKEN ? { token: env.SANITY_API_READ_TOKEN } : {}),
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "raw",
  ...(env.SANITY_API_WRITE_TOKEN ? { token: env.SANITY_API_WRITE_TOKEN } : {}),
});

