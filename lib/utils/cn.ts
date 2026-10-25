import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Gabungkan class secara kondisional lalu selesaikan konflik utility Tailwind,
 * sehingga `className` dari konsumer selalu menang atas class bawaan komponen.
 *
 * @example
 * cn("px-3 py-2 bg-primary", isActive && "bg-primary-700", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export type { ClassValue };
