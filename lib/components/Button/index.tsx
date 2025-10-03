import { ButtonTypes } from "@/types/button";
import classNames from "@/utils/classNames";
import Spinner from "../Spinner";

export default function Button({
  children,
  className,
  isDisable,
  isProcessing,
  typeText = "small",
  variant = "primary",
  radius = "md",
  ...props
}: ButtonTypes) {

  
  const getVariant = {
    ["primary"]: "bg-primary text-white",
    ["secondary"]: "bg-neutral text-black",
    ["bordered"]: "border border-primary bg-white",
  };

  const getTypeText = {
    ["small"]: "text-md",
    ["medium"]: "text-lg",
  };

  const getRadius = {
    ["full"]: "rounded-full",
    ["md"]: "rounded-md",
    ["2xl"]: "rounded-xs",
  };

  return (
    <button
      {...props}
      className={classNames(
        "px-3 py-2 flex items-center gap-3 cursor-pointer justify-center",
        getVariant[variant],
        getTypeText[typeText],
        getRadius[radius],
        isDisable ? "!bg-neutral !cursor-not-allowed" : "",
        className
      )}
      disabled={isDisable || isProcessing}
      onClick={(e) => {
        if (isDisable || isProcessing) return;
        props.onClick?.(e);
      }}
    >
      {isProcessing ? <Spinner color="white" /> : null}
      {children}
    </button>
  );
}
