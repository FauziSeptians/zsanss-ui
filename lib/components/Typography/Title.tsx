import { TextTypes } from "@/types/main";
import classNames from "@/utils/classNames";
import { STATUS, getTypeClass } from "@/constants/typograpgy";

enum SIZE_CLASSES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const getSize: Record<SIZE_CLASSES, string> = {
  [SIZE_CLASSES.SMALL]: "text-lg",
  [SIZE_CLASSES.MEDIUM]: "text-2xl",
  [SIZE_CLASSES.LARGE]: "text-4xl",
};

/**
 * `Title` is a styled heading component that renders an `<h1>` element
 * with customizable typography styles such as bold, italic, underline, and type variants.
 * It also supports responsive sizing via the `size` prop.
 *
 * @component
 * @example
 * ```tsx
 * <Title size="large" bold type="primary">
 *   Welcome to ZSANSS-UI
 * </Title>
 * ```
 *
 * @param props - Props extending `TextTypes` with optional `size`.
 * @param props.size - Controls the font size. Options: `"small"`, `"medium"`, `"large"`. Default is `"medium"`.
 * @param props.bold - Applies bold font weight if true.
 * @param props.italic - Applies italic style if true.
 * @param props.underline - Applies underline style if true.
 * @param props.type - Applies predefined text color variant (e.g., `"primary"`, `"danger"`).
 * @param props.className - Additional Tailwind CSS classes.
 * @param props.children - Content to be rendered inside the heading.
 *
 * @returns A styled `<h1>` element.
 */
export default function Title(
  props: TextTypes & { size?: "small" | "medium" | "large" }
) {
  const size = props.size || "medium";

  const classes = classNames(
    props?.bold && STATUS.BOLD,
    props?.italic && STATUS.ITALIC,
    props?.underline && STATUS.UNDERLINE,
    getTypeClass(props?.type),
    getSize[size],
    "!font-semibold",
    "tracking-wider",
    "leading-relaxed",
    "antialiased",
    props?.className
  );

  return <h1 className={classes}>{props?.children}</h1>;
}
