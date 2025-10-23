import Typography from "@/components/Typography";

export type DescriptionProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  titleSize?: "small" | "medium" | "large";
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;


/**
 * `Description` is a flexible content block component used to display a title and description
 * with optional typography styling. It also supports rendering custom children, which will override
 * the default title/description layout if provided.
 *
 * Commonly used inside components like `Card` to display structured content.
 *
 * @component
 * @example
 * ```tsx
 * <Description
 *   title="Project Title"
 *   description="This is a short description of the project."
 *   bold
 *   titleSize="large"
 * />
 * ```
 *
 * @param props - Props for configuring the description block.
 * @param props.title - Optional title text to display.
 * @param props.description - Optional description text to display below the title.
 * @param props.children - Optional custom content. If provided, it overrides the default title/description layout.
 * @param props.titleSize - Size of the title text. Options: `"small"`, `"medium"`, `"large"`.
 * @param props.bold - Applies bold styling to the title if true.
 * @param props.italic - Applies italic styling to the title if true.
 * @param props.underline - Applies underline styling to the title if true.
 * @param props.className - Additional Tailwind CSS classes for the container.
 *
 * @returns A styled content block with optional title, description, or custom children.
 */
export default function Description({
  title,
  description,
  children,
  titleSize,
  underline,
  bold,
  italic,
  ...props
}: DescriptionProps) {
  return (
    <div className="py-2 px-4 flex flex-col gap-3" {...props}>
      {!children && (title || description) ? (
        <>
          {title && (
            <Typography.Title
              size={titleSize}
              italic={italic}
              underline={underline}
              bold={bold}
            >
              {title}
            </Typography.Title>
          )}
          {description && (
            <Typography.Text className="opacity-70 text-justify">
              {description}
            </Typography.Text>
          )}
        </>
      ) : null}
      {children}
    </div>
  );
}
