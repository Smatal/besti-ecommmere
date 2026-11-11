import { PrismaClient } from "@prisma/client";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { env } from "@/backend/env";

// Extend WebSocket to provide 30s timeout for Neon cold-starts
class ExtendedWs extends ws {
  constructor(url: string | URL, protocols?: string | string[], options?: ws.ClientOptions) {
    super(url, protocols, { ...options, handshakeTimeout: 30000 });
  }
}

neonConfig.webSocketConstructor = ExtendedWs;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  dbUrl: string | undefined;
};

function createPrismaClient(): PrismaClient {
  const dbUrl = env.DATABASE_URL;
  const isNeon = dbUrl.includes("neon.tech");

  if (isNeon) {
    const adapter = new PrismaNeon({ connectionString: dbUrl });
    return new PrismaClient({
      adapter,
      log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return new PrismaClient({
    datasources: { db: { url: dbUrl } },
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

if (globalForPrisma.prisma && globalForPrisma.dbUrl !== env.DATABASE_URL) {
  globalForPrisma.prisma = undefined;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.dbUrl = env.DATABASE_URL;
}

export default prisma;
