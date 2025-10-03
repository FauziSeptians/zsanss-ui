import React, { ReactNode } from "react";
import Text from "./Text";
import Title from "./Title";

interface TypographyProps {
   children: ReactNode;
   variant?: "primary" | "secondary" | "muted";
   className?: string;
}

const TypographyComponent: React.FC<TypographyProps> = ({
   children,
   variant = "primary",
   className = "",
}) => {
   const getClasses = () => {
      let classes = "";
      switch (variant) {
         case "primary":
            classes += "text-gray-900 ";
            break;
         case "secondary":
            classes += "text-gray-700 ";
            break;
         case "muted":
            classes += "text-gray-500 ";
            break;
      }
      return classes + className;
   };

   return <div className={getClasses()}>{children}</div>;
};

type TypographyType = typeof TypographyComponent & {
   Text: typeof Text;
   Title: typeof Title;
};

const Typography = TypographyComponent as TypographyType;
Typography.Text = Text;
Typography.Title = Title;

export default Typography;

export { Text, Title };
