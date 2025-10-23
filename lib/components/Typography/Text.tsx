import React from "react";
import { TextTypes } from "@/types/main";
import classNames from "@/utils/classNames";
import { STATUS, getTypeClass } from "@/constants/typograpgy";

interface ExtendedTextTypes extends TextTypes {
  highlightText?: string;
}

const highlightContent = (
  text: React.ReactNode,
  highlight: string,
): React.ReactNode => {
  if (!highlight || typeof text !== "string") {
    return text;
  }

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark key={index} className="rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

/**
 * `Text` is a styled paragraph component that renders a `<p>` element
 * with customizable typography styles such as bold, italic, underline, and type variants.
 * It also supports automatic highlighting of specific words or phrases via the `highlightText` prop.
 *
 * @component
 * @example
 * ```tsx
 * <Text bold italic type="primary" highlightText="React">
 *   I love working with React and TypeScript.
 * </Text>
 * ```
 *
 * @param props - Props extending `TextTypes` with optional `highlightText`.
 * @param props.bold - Applies bold font weight if true.
 * @param props.italic - Applies italic style if true.
 * @param props.underline - Applies underline style if true.
 * @param props.type - Applies predefined text color variant (e.g., `"primary"`, `"danger"`).
 * @param props.className - Additional Tailwind CSS classes.
 * @param props.highlightText - A string to be highlighted inside the text. Case-insensitive.
 * @param props.children - The content to be rendered inside the paragraph.
 *
 * @returns A styled `<p>` element with optional highlighted content.
 */
export default function Text(props: ExtendedTextTypes) {
  const { highlightText, children, ...restProps } = props;

  const classes = classNames(
    restProps?.bold && STATUS.BOLD,
    restProps?.italic && STATUS.ITALIC,
    restProps?.underline && STATUS.UNDERLINE,
    getTypeClass(restProps?.type),
    "text-sm ",
    "tracking-wider",
    "leading-relaxed",
    "antialiased",
    restProps?.className
  );

  if (highlightText && highlightText.trim()) {
    return (
      <p className={classes}>{highlightContent(children, highlightText)}</p>
    );
  }

  return <p className={classes}>{children}</p>;
}
