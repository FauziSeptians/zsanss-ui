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
