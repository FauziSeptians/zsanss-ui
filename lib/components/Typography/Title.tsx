import { TextTypes } from "@/types/main";
import classNames from "@/utils/classNames";
import {STATUS, getTypeClass} from "@/constants/typograpgy"

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
      props?.className
   );

   return <h1 className={classes}>{props?.children}</h1>;
}
