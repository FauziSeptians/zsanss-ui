import classNames from "@/utils/classNames";
import React from "react";
import Description from "./Description";
import Image from "@/components/Image/index"
import { CardTypes } from "@/types/main";


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
        "border-[1px] border-neutral-400 rounded-md max-h-fit min-h-64 max-w-md w-full h-full",
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
