import type { ReactNode } from "react";
import { Drawer as Vaul } from "vaul";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Vaul.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      {children}
    </Vaul.Root>
  );
}

export function DrawerContent({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  return (
    <Vaul.Portal>
      <Vaul.Overlay className="fixed inset-0 z-50 bg-background/70" />
      <Vaul.Content
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-xl border border-border bg-card outline-none",
          className,
        )}
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />
        {title ? (
          <Vaul.Title className="px-5 pt-4 font-display text-xl tracking-wide text-foreground">
            {title}
          </Vaul.Title>
        ) : (
          <Vaul.Title className="sr-only">選單</Vaul.Title>
        )}
        {children}
      </Vaul.Content>
    </Vaul.Portal>
  );
}
