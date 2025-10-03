import React from "react";
import { TextTypes } from "@/types/main";
import classNames from "@/utils/classNames";
import {STATUS, getTypeClass} from "@/constants/typograpgy"

interface ExtendedTextTypes extends TextTypes {
   highlightText?: string;
}

const highlightContent = (
   text: React.ReactNode,
   highlight: string
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

export default function Text(props: ExtendedTextTypes) {
   const { highlightText, children, ...restProps } = props;

   const classes = classNames(
      restProps?.bold && STATUS.BOLD,
      restProps?.italic && STATUS.ITALIC,
      restProps?.underline && STATUS.UNDERLINE,
      getTypeClass(restProps?.type),
      "text-sm",
      restProps?.className
   );

   if (highlightText && highlightText.trim()) {
      return (
         <p className={classes}>{highlightContent(children, highlightText)}</p>
      );
   }

   return <p className={classes}>{children}</p>;
}
