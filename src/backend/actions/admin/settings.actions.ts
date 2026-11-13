"use server";

import { prisma } from "@/backend/db/client";
import { revalidatePath } from "next/cache";

export async function adminGetSettings() {
  try {
    return await prisma.storeSetting.findMany({
      orderBy: [{ group: "asc" }, { key: "asc" }],
    });
  } catch (error) {
    console.error("[adminGetSettings] Error:", error);
    return [];
  }
}

export async function adminUpdateSetting(key: string, value: string) {
  try {
    const updated = await prisma.storeSetting.update({
      where: { key },
      data: { value, updatedAt: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        action: "STORE_SETTING_UPDATED",
        entityType: "Setting",
        entityId: key,
        summary: `Store setting "${key}" updated`,
        details: { key, value },
      },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true, setting: updated };
  } catch (error: any) {
    console.error("[adminUpdateSetting] Error:", error);
    return { success: false, error: error.message || "Failed to update setting" };
  }
}

