export enum STATUS {
   BOLD = "font-semibold",
   UNDERLINE = "underline",
   ITALIC = "italic",
}

export const getTypeClass = (
   type?: "success" | "warning" | "danger"
): string => {
   switch (type) {
      case "success":
         return "text-success";
      case "warning":
         return "text-warning";
      case "danger":
         return "text-error";
      default:
         return "";
   }
};