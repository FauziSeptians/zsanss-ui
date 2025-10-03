import { COLOR, SIZE, VARIANT_TAB } from "@/constants/tab";
import { TabTypes } from "@/types/tab";
import classNames from "@/utils/classNames";
import { useState } from "react";
import Typography from "../Typography";

export default function TabWrapper({
  item,
  variant = VARIANT_TAB.DEFAULT,
  radius = SIZE.LG,
  highlightColor = COLOR.PRIMARY,
  children,
  ...props
}: TabTypes) {
  const [selectedTab, setSelectedTab] = useState(item[0]);

  const getRadius = {
    [SIZE.FULL]: "rounded-full",
    [SIZE.MD]: "rounded-md",
    [SIZE.LG]: "rounded-lg",
    [SIZE.SM]: "rounded-sm",
  };

  const getVariant = {
    [VARIANT_TAB.UNDERLINE]: "bg-white",
    [VARIANT_TAB.DEFAULT]: "bg-neutral/50",
    [VARIANT_TAB.BORDERED]: "bg-white border-[1px]",
  };

  const getHighlightColor = {
    [COLOR.PRIMARY]: "!bg-primary text-white font-semibold",
    [COLOR.SECONDARY]: "!bg-secondary font-semibold",
    [COLOR.NEUTRAL]: "!bg-neutral font-semibold",
  };

  const getHighlightColorUnderline = {
    [COLOR.PRIMARY]: "!text-primary font-semibold",
    [COLOR.SECONDARY]: "!text-secondary font-semibold",
    [COLOR.NEUTRAL]: "!text-neutral font-semibold",
  };

  const getHighlightColorBorderUnderline = {
    [COLOR.PRIMARY]: "!border-primary font-semibold",
    [COLOR.SECONDARY]: "!border-secondary font-semibold",
    [COLOR.NEUTRAL]: "!border-neutral font-semibold",
  };

  const isEnumColor = Object.values(COLOR).includes(highlightColor as COLOR);

  return (
    <>
      <div
        {...props}
        className={classNames(
          variant !== VARIANT_TAB.UNDERLINE && getRadius[radius as SIZE],
          getVariant[variant as VARIANT_TAB],
          variant !== VARIANT_TAB.UNDERLINE ? "p-1" : "",
          "flex"
        )}
      >
        {item?.map((tab) => {
          const isSelected = tab?.key === selectedTab?.key;

          return (
            <button
              key={tab?.key}
              className={classNames(
                variant !== VARIANT_TAB.UNDERLINE && getRadius[radius as SIZE],
                variant !== VARIANT_TAB.UNDERLINE && isEnumColor && isSelected
                  ? getHighlightColor[highlightColor as COLOR]
                  : `bg-[${highlightColor}]`,
                variant === VARIANT_TAB.UNDERLINE && isSelected
                  ? getHighlightColorUnderline[highlightColor as COLOR]
                  : "",
                variant === VARIANT_TAB.UNDERLINE && isSelected
                  ? `border-b-[1px] ${
                      getHighlightColorBorderUnderline[highlightColor as COLOR]
                    }`
                  : "",
                variant === VARIANT_TAB.UNDERLINE && !isSelected
                  ? "border-b-[1px] border-neutral"
                  : "",
                "px-3 py-2 flex flex-row w-full cursor-pointer text-center justify-center items-center hover:bg-primary transition-all duration-300 ease-in-out"
              )}
              onClick={() => setSelectedTab(tab)}
            >
              <Typography.Text> {tab?.value}</Typography.Text>
            </button>
          );
        })}
      </div>
      {children}
    </>
  );
}
