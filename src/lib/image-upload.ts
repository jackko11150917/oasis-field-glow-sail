const MAX_EDGE = 320;
const MAX_BYTES = 6 * 1024 * 1024;

export async function fileToIconDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("請揀圖片檔");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("圖片太大，試下細過 6MB");
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("無法處理圖片");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.84);
}
