export type TextTypes = {
      children: React.ReactNode;
      italic?: boolean;
      bold?: boolean;
      underline?: boolean;
      type?: "success" | "warning" | "danger";
      highlighText?: string;
      className?: string;
}