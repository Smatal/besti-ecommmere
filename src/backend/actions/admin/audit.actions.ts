"use server";

import { prisma } from "@/backend/db/client";

export async function adminGetAuditLogs(limit = 100) {
  try {
    return await prisma.auditLog.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        adminUser: {
          select: { name: true, email: true },
        },
      },
    });
  } catch (error) {
    console.error("[adminGetAuditLogs] Error:", error);
    return [];
  }
}
