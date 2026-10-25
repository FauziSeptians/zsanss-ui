import { cn } from "./cn";

/**
 * @deprecated Gunakan `cn` dari `@/utils/cn`. Dipertahankan agar kode lama tetap jalan;
 * sekarang sudah ikut menyelesaikan konflik class Tailwind (tailwind-merge).
 */
export default function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return cn(classes);
}
