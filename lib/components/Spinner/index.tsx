import classNames from "@/utils/classNames";
import { LoaderCircle } from "lucide-react";

export default function Spinner({ size = 32, color = "gray", className = "" }) {
  return (
    <div className={classNames(className, "flex items-center justify-center")}>
      <LoaderCircle
        size={size}
        color={color}
        className="animate-spin"
        strokeWidth={2}
      />
    </div>
  );
}
