import classNames from "@/utils/classNames";
import React from "react";
import Description from "./Description";
import Image from "@/components/Image/index";
import { CardTypes } from "@/types/main";


/**
 * `Card` is a flexible container component used to display grouped content such as images,
 * descriptions, and custom children. It supports slot-based rendering for `Card.Image` and `Card.Description`,
 * and applies conditional padding based on whether an image is present.
 *
 * This component exposes two subcomponents:
 * - `Card.Image`: renders a styled image inside the card.
 * - `Card.Description`: renders a styled description block.
 *
 * @component
 * @example
 * ```tsx
 * <Card className="shadow-md">
 *   <Card.Image src="/images/sample.jpg" alt="Sample" />
 *   <Card.Description>This is a description</Card.Description>
 *   <div>Additional content here</div>
 * </Card>
 * ```
 *
 * @param props - Props extending `CardTypes`.
 * @param props.children - Content to be rendered inside the card, including `Card.Image`, `Card.Description`, or custom elements.
 * @param props.className - Additional Tailwind CSS classes for styling the card container.
 *
 * @returns A styled card container with optional image and description slots.
 */
function CardComponent({ children, className, ...props }: CardTypes) {
  let isImageExists = false;
  const imageSlot: React.ReactNode[] = [];
  const contentSlot: React.ReactNode[] = [];
  const descSlot: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Card.Image) {
      imageSlot.push(child);
      isImageExists = true;
    } else if (React.isValidElement(child) && child.type === Card.Description) {
      descSlot.push(child);
    } else {
      contentSlot.push(child);
    }
  });

  return (
    <div
      className={classNames(
        isImageExists ? "p-0" : "p-4",
        "border-[1px] border-neutral rounded-md max-h-fit min-h-64 max-w-md w-full h-full",
        className
      )}
      {...props}
    >
      {imageSlot}
      {descSlot}
      {contentSlot}
    </div>
  );
}

type CardType = typeof CardComponent & {
  Image: typeof Image;
  Description: typeof Description;
};

const Card = CardComponent as CardType;
Card.Image = Image;
Card.Description = Description;

export default Card;
export { Image, Description };
