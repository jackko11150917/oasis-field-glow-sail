import { ImagePlus, X } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { fileToIconDataUrl } from "@/lib/image-upload";
import { cn } from "@/lib/utils";

export function UploadIcon({
  src,
  size,
  fallback,
  onChange,
  editable = false,
  className,
  rounded = "full",
  label = "上傳圖示",
}: {
  src?: string;
  size: number;
  fallback: ReactNode;
  onChange?: (next: string | null) => void;
  editable?: boolean;
  className?: string;
  rounded?: "full" | "lg";
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const radius = rounded === "full" ? "rounded-full" : "rounded-lg";

  async function onFile(file: File | undefined) {
    if (!file || !onChange) return;
    try {
      onChange(await fileToIconDataUrl(file));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "上傳失敗");
    }
  }

  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      <button
        type="button"
        disabled={!editable}
        onClick={() => editable && inputRef.current?.click()}
        className={cn(
          "flex size-full items-center justify-center overflow-hidden border border-border bg-elevated",
          radius,
          editable && "cursor-pointer",
        )}
        aria-label={editable ? label : undefined}
      >
        {src ? (
          <img src={src} alt="" className="size-full object-cover" />
        ) : (
          fallback
        )}
        {editable && !src ? (
          <span className="absolute inset-0 flex items-center justify-center bg-background/40">
            <ImagePlus className="size-4 text-muted-foreground" />
          </span>
        ) : null}
      </button>
      {editable && src && onChange ? (
        <button
          type="button"
          className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
          aria-label="移除圖示"
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
          }}
        >
          <X className="size-3" />
        </button>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          void onFile(file);
        }}
      />
    </span>
  );
}
