"use server";

import prisma from "@/lib/prisma";

export async function addClipboardItem(content: string, source?: string) {
  try {
    const item = await prisma.clipboardItem.create({
      data: { content, source },
    });
    return { success: true, data: item };
  } catch (error: any) {
    console.error("addClipboardItem error:", error);
    return { success: false, error: error.message || "Failed to add clipboard item" };
  }
}

export async function fetchClipboardHistory(limit = 20) {
  try {
    const items = await prisma.clipboardItem.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return { success: true, data: items };
  } catch (error: any) {
    console.error("fetchClipboardHistory error:", error);
    return { success: false, error: error.message || "Failed to fetch clipboard history" };
  }
}
