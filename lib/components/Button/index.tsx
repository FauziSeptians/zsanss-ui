import { ButtonTypes } from "@/types/button";
import classNames from "@/utils/classNames";
import Spinner from "../Spinner";

/**
 * `Button` is a customizable and responsive button component that supports multiple visual variants,
 * text sizes, border radius options, and loading/disabled states. It also integrates a spinner
 * when `isProcessing` is active.
 *
 * @component
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   radius="full"
 *   isProcessing={loading}
 *   onClick={() => handleSubmit()}
 * >
 *   Submit
 * </Button>
 * ```
 *
 * @param props - Props extending `ButtonTypes`.
 * @param props.children - Content to be rendered inside the button.
 * @param props.className - Additional Tailwind CSS classes for styling.
 * @param props.isDisable - If true, disables the button and prevents interaction.
 * @param props.isProcessing - If true, shows a loading spinner and disables the button.
 * @param props.typeText - Controls the font size. Options: `"small"` (default), `"medium"`.
 * @param props.variant - Visual style of the button. Options: `"primary"` (default), `"secondary"`, `"bordered"`.
 * @param props.radius - Border radius style. Options: `"md"` (default), `"full"`, `"2xl"`.
 * @param props.onClick - Callback triggered when the button is clicked.
 *
 * @returns A styled `<button>` element with optional loading and disabled states.
 */
export default function Button({
  children,
  className,
  isDisable,
  isProcessing,
  typeText = "small",
  variant = "primary",
  radius = "md",
  ...props
}: ButtonTypes) {

  
  const getVariant = {
    ["primary"]: "bg-primary text-white",
    ["secondary"]: "bg-neutral text-black",
    ["bordered"]: "border border-primary bg-white",
  };

  const getTypeText = {
    ["small"]: "text-md",
    ["medium"]: "text-lg",
  };

  const getRadius = {
    ["full"]: "rounded-full",
    ["md"]: "rounded-md",
    ["2xl"]: "rounded-xs",
  };

  return (
    <button
      {...props}
      className={classNames(
        "px-3 py-2 flex items-center gap-3 cursor-pointer justify-center",
        getVariant[variant],
        getTypeText[typeText],
        getRadius[radius],
        isDisable ? "!bg-neutral !cursor-not-allowed" : "",
        className
      )}
      disabled={isDisable || isProcessing}
      onClick={(e) => {
        if (isDisable || isProcessing) return;
        props.onClick?.(e);
      }}
    >
      {isProcessing ? <Spinner color="white" /> : null}
      {children}
    </button>
  );
}
