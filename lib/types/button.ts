export type ButtonTypes = {
  children: React.ReactNode;
  className?: string;
  isDisable?: boolean;
  isProcessing?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "bordered";
  typeText?: "small" | "medium";
  radius?: "full" | "2xl" | "md";
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
