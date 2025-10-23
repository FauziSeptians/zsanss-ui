import classNames from "@/utils/classNames";
import { LoaderCircle } from "lucide-react";

/**
 * `Spinner` is a simple loading indicator component that displays a spinning icon.
 * It uses the `LoaderCircle` icon from Lucide and supports customizable size, color, and styling.
 *
 * @component
 * @example
 * ```tsx
 * <Spinner size={40} color="blue" className="my-4" />
 * ```
 *
 * @param props - Props for customizing the spinner.
 * @param props.size - The size of the spinner icon in pixels. Default is `32`.
 * @param props.color - The color of the spinner stroke. Accepts any valid CSS color. Default is `"gray"`.
 * @param props.className - Additional Tailwind CSS classes to apply to the wrapper container.
 *
 * @returns A spinning loader icon centered within a flex container.
 */
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
