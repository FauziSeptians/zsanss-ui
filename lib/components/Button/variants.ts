import { cva } from "class-variance-authority";

/**
 * Sumber tunggal gaya Button. Bisa dipakai ulang untuk elemen lain
 * (mis. `<a className={buttonVariants({ variant: "bordered" })}>`).
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap font-medium select-none",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground enabled:hover:bg-primary-700 enabled:active:bg-primary-900 disabled:bg-neutral-300 disabled:text-neutral-500",
        secondary:
          "bg-neutral-100 text-foreground enabled:hover:bg-neutral-200 enabled:active:bg-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-400",
        accent:
          "bg-secondary text-secondary-foreground enabled:hover:bg-secondary-600 enabled:active:bg-secondary-700 disabled:bg-neutral-300 disabled:text-neutral-500",
        bordered:
          "border border-primary bg-surface text-primary enabled:hover:bg-primary-50 enabled:active:bg-primary-100 disabled:border-border-strong disabled:text-neutral-400",
        ghost:
          "bg-transparent text-foreground enabled:hover:bg-surface-subtle enabled:active:bg-neutral-200 disabled:text-neutral-400",
        danger:
          "bg-danger text-danger-foreground enabled:hover:bg-danger-700 enabled:active:bg-danger-800 disabled:bg-neutral-300 disabled:text-neutral-500",
        link: "bg-transparent px-0 text-primary underline-offset-4 enabled:hover:underline disabled:text-neutral-400",
      },
      size: {
        sm: "gap-2 px-3 py-1.5 text-sm",
        md: "gap-3 px-3 py-2 text-base",
        lg: "gap-3 px-4 py-2.5 text-lg",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "md",
      fullWidth: false,
    },
  },
);
