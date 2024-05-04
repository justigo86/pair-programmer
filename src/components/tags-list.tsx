"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          //changed from Badge to button for keyboard functionality
          key={tag}
          className={cn(badgeVariants())}
          //class info borrowed from shadCN /components/ui/badge.tsx
          onClick={() => router.push(`/?search=${tag}`)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
