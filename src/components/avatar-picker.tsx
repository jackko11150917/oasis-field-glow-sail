import { UploadIcon } from "@/components/upload-icon";
import { useGymStore } from "@/lib/store";

/** 用家自己上傳頭像，唔再用預設圖示包。 */
export function AvatarPicker({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (url: string | null) => void;
}) {
  const setCustomIcon = useGymStore((s) => s.setCustomIcon);
  const profile = useGymStore((s) => s.profile);
  const stored = useGymStore((s) => s.customIcons.avatar);
  const src = value || profile.avatarUrl || stored;

  return (
    <div className="flex items-center gap-3">
      <UploadIcon
        src={src}
        size={72}
        editable
        rounded="full"
        label="上傳頭像"
        onChange={(next) => {
          setCustomIcon("avatar", null, next);
          onChange(next);
        }}
        fallback={
          <span className="font-display text-lg text-muted-foreground">
            {(profile.name || "?").slice(0, 1)}
          </span>
        }
      />
      <p className="text-xs text-muted-foreground">撳圖上傳自己嘅頭像（JPG / PNG）</p>
    </div>
  );
}
