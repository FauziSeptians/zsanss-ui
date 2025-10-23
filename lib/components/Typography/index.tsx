import React, { ReactNode } from 'react';
import Text from './Text';
import Title from './Title';

/**
 * Props for the `Typography` component.
 */
interface TypographyProps {
  /**
   * Content to be rendered inside the typography wrapper.
   */
  children: ReactNode;

  /**
   * Controls the text color variant.
   * - `primary`: dark gray
   * - `secondary`: medium gray
   * - `muted`: light gray
   *
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'muted';

  /**
   * Additional Tailwind CSS classes to apply.
   */
  className?: string;
}

/**
 * `Typography` is a wrapper component that provides consistent text styling
 * based on the selected `variant`. It also exposes `Typography.Text` and `Typography.Title`
 * as subcomponents for semantic and styled text rendering.
 *
 * @component
 * @example
 * ```tsx
 * <Typography variant="secondary">
 *   <Typography.Title size="large">Welcome</Typography.Title>
 *   <Typography.Text>This is a paragraph inside Typography</Typography.Text>
 * </Typography>
 * ```
 *
 * @param props - `TypographyProps` including `variant`, `className`, and `children`.
 * @returns A styled `<div>` element wrapping text content.
 */
const TypographyComponent: React.FC<TypographyProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const getClasses = () => {
    let classes = '';
    switch (variant) {
      case 'primary':
        classes += 'text-gray-900 ';
        break;
      case 'secondary':
        classes += 'text-gray-700 ';
        break;
      case 'muted':
        classes += 'text-gray-500 ';
        break;
    }
    return classes + className;
  };

  return <div className={getClasses()}>{children}</div>;
};

/**
 * Extended `Typography` component with attached subcomponents:
 * - `Typography.Text`: styled paragraph
 * - `Typography.Title`: styled heading
 */
type TypographyType = typeof TypographyComponent & {
  Text: typeof Text;
  Title: typeof Title;
};

const Typography = TypographyComponent as TypographyType;
Typography.Text = Text;
Typography.Title = Title;

export default Typography;

export { Text, Title };
