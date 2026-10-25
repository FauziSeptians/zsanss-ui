import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/Button/variants";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonTypes = {
  children: React.ReactNode;
  className?: string;
  /** Menonaktifkan tombol. */
  isDisable?: boolean;
  /** Menampilkan spinner dan menonaktifkan tombol (async action). */
  isProcessing?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Gaya visual tombol. */
  variant?: NonNullable<ButtonVariantProps["variant"]>;
  /** Ukuran tombol (padding + font). Menggantikan `typeText`. */
  size?: NonNullable<ButtonVariantProps["size"]>;
  /** @deprecated Gunakan `size`. `small` = `md`, `medium` = `lg`. */
  typeText?: "small" | "medium";
  /** Radius sudut. */
  radius?: NonNullable<ButtonVariantProps["radius"]>;
  /** Lebar 100% dari container. */
  fullWidth?: boolean;
  /** Ikon di sebelah kiri label. */
  leftIcon?: React.ReactNode;
  /** Ikon di sebelah kanan label. */
  rightIcon?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
