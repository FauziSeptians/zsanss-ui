import { VARIANT } from "@/constants/input";
import { InputTypes } from "@/types/input";
import { cn } from "@/utils/cn";
import { useId, useState, useEffect } from "react";
import Typography from "../Typography";

export default function InputWrapper({
  type,
  className,
  inputVariant = VARIANT.FLAT,
  inputRadius = "md",
  placeHolder,
  label,
  value,
  error,
  onChange,
  readOnly,
  ...props
}: InputTypes) {
  const inputId = useId();

  const [errorWording, setErrorWording] = useState({
    isError: Boolean(error),
    message: error || "",
  });

  useEffect(() => {
    setErrorWording({
      isError: Boolean(error),
      message: error || "",
    });
  }, [error]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorWording((prev) => ({
      ...prev,
      isError: false,
    }));
    onChange?.(e);
  }

  function renderInput() {
    const radiusClass = {
      md: "rounded-md",
      xl: "rounded-xl",
      full: "rounded-full",
    }[inputRadius];

    const baseClass = cn(
      !readOnly ? "focus:border-primary" : "cursor-not-allowed",
      radiusClass,
      "w-full outline-none",
      errorWording.isError ? "border-danger" : "",
      className
    );

    const variantClass = {
      [VARIANT.FLAT]: "bg-neutral-200 py-2 px-4",
      [VARIANT.BORDERED]: "border border-border py-2 px-4",
      [VARIANT.UNDERLINED]: "border-b border-border py-1",
    }[inputVariant];

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1 text-sm font-medium text-foreground-secondary"
          >
            <Typography.Text>{label}</Typography.Text>
          </label>
        )}
        <input
          id={inputId}
          className={cn(variantClass, baseClass)}
          type={type}
          placeholder={placeHolder}
          onChange={handleInputChange}
          value={value}
          readOnly={readOnly}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {renderInput()}
      {errorWording.isError && (
        <Typography.Text className="text-danger">
          {errorWording.message}
        </Typography.Text>
      )}
    </div>
  );
}
