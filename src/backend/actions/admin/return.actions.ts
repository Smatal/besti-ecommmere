"use server";

import { prisma } from "@/backend/db/client";
import { ReturnStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function adminGetReturns() {
  try {
    return await prisma.return.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        order: {
          include: {
            items: true,
          },
        },
        items: true,
      },
    });
  } catch (error) {
    console.error("[adminGetReturns] Error:", error);
    return [];
  }
}

export async function adminUpdateReturnStatus(returnId: string, status: ReturnStatus) {
  try {
    const updated = await prisma.return.update({
      where: { id: returnId },
      data: { status },
    });

    await prisma.auditLog.create({
      data: {
        action: "RETURN_STATUS_UPDATED",
        entityType: "Return",
        entityId: returnId,
        summary: `Return request ${returnId} set to ${status}`,
      },
    });

    revalidatePath("/admin/returns");
    return { success: true, returnRequest: updated };
  } catch (error: any) {
    console.error("[adminUpdateReturnStatus] Error:", error);
    return { success: false, error: error.message || "Failed to update return status" };
  }
}
