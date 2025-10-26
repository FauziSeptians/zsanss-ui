import { VARIANT } from "@/constants/input";
import { InputTypes } from "@/types/input";
import classNames from "@/utils/classNames";
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
    const baseClass = classNames(
      !readOnly ? "focus:border-primary" : "cursor-not-allowed",
      `rounded-${inputRadius}`,
      "w-full outline-none",
      className
    );

    const variantClass = {
      [VARIANT.FLAT]: "bg-neutral-200 py-2 px-4",
      [VARIANT.BORDERED]: "border border-neutral-200 py-2 px-4",
      [VARIANT.UNDERLINED]: "border-b-[1px] border-neutral-200 py-1",
    }[inputVariant];

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1 text-sm font-medium text-neutral-700"
          >
            <Typography.Text>{label}</Typography.Text>
          </label>
        )}
        <input
          id={inputId}
          className={`${baseClass} ${variantClass}`}
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
        <Typography.Text className="text-red-400">
          {errorWording.message}
        </Typography.Text>
      )}
    </div>
  );
}
