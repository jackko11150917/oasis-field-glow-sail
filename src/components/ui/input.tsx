import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      suppressHydrationWarning
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-elevated px-3 text-base text-foreground",
        "placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-40",
        className,
      )}
    />
  );
}
