import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/besticares"),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default("rzp_test_YourKeyIdHere"),
  RAZORPAY_KEY_SECRET: z.string().default("YourRazorpaySecretKey"),
  RAZORPAY_WEBHOOK_SECRET: z.string().default("YourRazorpayWebhookSecret"),
  RESEND_API_KEY: z.string().default("re_YourResendApiKey"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  
  // Sanity CMS Configuration
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().default("bestie-sample"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default("production"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2024-01-01"),
  SANITY_API_READ_TOKEN: z.string().optional(),
  SANITY_API_WRITE_TOKEN: z.string().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
});
