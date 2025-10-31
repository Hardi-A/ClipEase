"use server";

import {
  suggestRelevantSnippets,
  type SuggestRelevantSnippetsInput,
} from "@/ai/flows/suggest-relevant-snippets";
import prisma from "@/lib/prisma";

export async function getSuggestions(input: SuggestRelevantSnippetsInput) {
  try {
    // Fetch persisted snippets from DB as canonical source.
    // If you still want to let the client send updated snippets, you can merge them here.
    const saved = await prisma.snippet.findMany({
      orderBy: { updatedAt: "desc" },
    });

    const savedSnippets = saved.map(s => `Name: ${s.name}, Content: ${s.content}`);

    const mergedInput: SuggestRelevantSnippetsInput = {
      ...input,
      // prefer DB-sourced snippets for consistency
      savedSnippets,
    };

    const result = await suggestRelevantSnippets(mergedInput);
    return { success: true, data: result.suggestedSnippets };
  } catch (error: any) {
    console.error("Error getting AI suggestions:", error);
    return { success: false, error: error.message || "Failed to get suggestions." };
  }
}
