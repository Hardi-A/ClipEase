"use server";

import prisma from "@/lib/prisma";

export async function fetchSavedSnippets() {
  try {
    const snippets = await prisma.snippet.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: snippets };
  } catch (error: any) {
    console.error("fetchSavedSnippets error:", error);
    return { success: false, error: error.message || "Failed to fetch snippets" };
  }
}

export async function createSnippet(data: { name: string; content: string }) {
  try {
    const snippet = await prisma.snippet.create({ data });
    return { success: true, data: snippet };
  } catch (error: any) {
    console.error("createSnippet error:", error);
    return { success: false, error: error.message || "Failed to create snippet" };
  }
}

export async function deleteSnippet(id: string) {
  try {
    await prisma.snippet.delete({ where: { id } });
    return { success: true };
  } catch (error: any) {
    console.error("deleteSnippet error:", error);
    return { success: false, error: error.message || "Failed to delete snippet" };
  }
}
