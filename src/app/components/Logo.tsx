import { ClipboardCopy } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="ClipManager Pro Logo">
      <ClipboardCopy className="h-7 w-7 text-primary" />
      <h1 className="font-headline text-2xl font-bold tracking-tight">
        ClipManager Pro
      </h1>
    </div>
  );
}
