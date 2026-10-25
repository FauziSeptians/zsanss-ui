import { forwardRef } from "react";
import { ButtonTypes } from "@/types/button";
import { cn } from "@/utils/cn";
import Spinner from "../Spinner";
import { buttonVariants } from "./variants";


/**
 * `Button` — tombol serbaguna berbasis design token.
 *
 * Mendukung 7 variant, 3 ukuran, 7 radius, `fullWidth`, ikon kiri/kanan,
 * state loading/disabled, dan `ref` forwarding.
 *
 * @example
 * ```tsx
 * <Button variant="danger" size="sm" leftIcon={<Trash2 size={16} />} onClick={remove}>
 *   Hapus
 * </Button>
 *
 * <Button isProcessing={saving} fullWidth>Simpan</Button>
 * ```
 *
 * @param props.variant - `"primary"` (default), `"secondary"`, `"accent"`, `"bordered"`, `"ghost"`, `"danger"`, `"link"`.
 * @param props.size - `"sm"`, `"md"` (default), `"lg"`.
 * @param props.radius - `"none"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`, `"2xl"`, `"full"`.
 * @param props.fullWidth - Lebar 100%.
 * @param props.leftIcon - Ikon sebelum label.
 * @param props.rightIcon - Ikon setelah label.
 * @param props.isDisable - Menonaktifkan tombol.
 * @param props.isProcessing - Menampilkan spinner dan menonaktifkan tombol.
 * @param props.typeText - **Deprecated**, gunakan `size`.
 */
const Button = forwardRef<HTMLButtonElement, ButtonTypes>(function Button(
  {
    children,
    className,
    isDisable,
    isProcessing,
    typeText,
    size,
    variant = "primary",
    radius = "md",
    fullWidth = false,
    leftIcon,
    rightIcon,
    onClick,
    ...props
  },
  ref,
) {
  // `typeText` lama dipetakan ke `size`; `size` eksplisit selalu menang.
  const resolvedSize = size ?? (typeText === "medium" ? "lg" : "md");
  const isInactive = Boolean(isDisable || isProcessing);

  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        buttonVariants({ variant, size: resolvedSize, radius, fullWidth }),
        className,
      )}
      disabled={isInactive}
      aria-busy={isProcessing || undefined}
      onClick={(e) => {
        if (isInactive) return;
        onClick?.(e);
      }}
    >
      {isProcessing ? <Spinner size={16} color="currentColor" /> : leftIcon}
      {children}
      {!isProcessing ? rightIcon : null}
    </button>
  );
});

export default Button;
