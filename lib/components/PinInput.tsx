import classNames from "lib/utils/classNames";
import { useEffect, useRef, useState } from "react";

export const SizeMapper: Record<"sm" | "md" | "lg", string> = {
  sm: "ui-h-3 ui-w-3",
  md: "ui-h-4 ui-w-4",
  lg: "ui-h-6 ui-w-6",
};

export interface PinInputProps {
  onChange?: (value: string) => void;
  length?: number;
  className?: string;
  showNumeric?: boolean;
  size?: "sm" | "md" | "lg";
  id?: string;
  value?: string;
  readonly?: boolean;
}

export default function PinInput({
  onChange = () => {},
  length = 6,
  showNumeric = false,
  className = "",
  size = "sm",
  id = "pin-input",
  value,
  readonly = false,
}: Readonly<PinInputProps>) {
  const [pinValues, setPinValues] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;
    const inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue.length === 1) {
      const newPinValues = [...pinValues];
      newPinValues[activeIndex] = inputValue;
      setPinValues(newPinValues);
      onChange(newPinValues.join(""));
      if (activeIndex < length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (inputValue.length > 1) {
      const digits = inputValue.slice(0, length).split("");
      const newPinValues = Array(length).fill("");
      for (let i = 0; i < digits.length; i++) {
        newPinValues[i] = digits[i];
      }
      setPinValues(newPinValues);
      onChange(newPinValues.join(""));
      setActiveIndex(Math.min(digits.length, length - 1));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readonly) return;
    if (e.key === "Backspace") {
      const newPinValues = [...pinValues];
      if (pinValues[activeIndex] !== "") {
        newPinValues[activeIndex] = "";
      } else if (activeIndex > 0) {
        newPinValues[activeIndex - 1] = "";
        setActiveIndex(activeIndex - 1);
      }
      setPinValues(newPinValues);
      onChange(newPinValues.join(""));
    }
  };

  const handleContainerClick = () => {
    if (!readonly && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
      const emptyIndex = pinValues.findIndex((val) => val === "");
      setActiveIndex(emptyIndex !== -1 ? emptyIndex : length - 1);
    }
  };

  useEffect(() => {
    if (!value) {
      setActiveIndex(0);
      setPinValues(Array(length).fill(""));
    } else {
      const splittedValue = value.split("").slice(0, length);
      const paddedValue = [
        ...splittedValue,
        ...Array(length - splittedValue.length).fill(""),
      ];
      setPinValues(paddedValue);
      const emptyIndex = paddedValue.findIndex((val) => val === "");
      setActiveIndex(emptyIndex !== -1 ? emptyIndex : length - 1);
    }
  }, [value, length]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!readonly && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [readonly]);

  useEffect(() => {
    if (readonly) return;

    const handleClickOutside = (event: MouseEvent) => {
      const container = containerRef.current;
      const input = hiddenInputRef.current;
      if (!container || !input) return;

      const clickedOutside = !container.contains(event.target as Node);
      if (!clickedOutside) return;

      const target = event.target as HTMLElement;
      const tag = target?.tagName?.toLowerCase();
      const isOtherTextInput =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;

      if (!isOtherTextInput) {
        setTimeout(() => {
          input.focus();
        }, 0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [readonly]);

  return (
    <div
      className={classNames(className, "ui-w-full ui-max-w-md")}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <input
        className="ui-absolute ui-left-[-9999px] ui-w-[1px] ui-h-[1px] ui-opacity-0 ui-pointer-events-none"
        ref={hiddenInputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={length}
        value=""
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        disabled={readonly}
        autoComplete="one-time-code"
        tabIndex={0}
      />
      <div
        className="ui-flex ui-items-center ui-justify-center ui-space-x-4"
        role="group"
        aria-label="Enter PIN code"
      >
        {pinValues.map((value, index) => {
          if (value && showNumeric)
            return (
              <div
                id={`${id}-${index}`}
                data-testid={`${id}-${index}`}
                key={`${value}-${index}`}
                className={classNames(
                  SizeMapper[size],
                  "ui-flex ui-items-center ui-justify-center ui-text-center ui-text-lg ui-font-semibold ui-cursor-pointer",
                )}
                onClick={handleContainerClick}
              >
                {value}
              </div>
            );
          return (
            <button
              key={`${value}-${index}`}
              className={classNames(
                value ? "ui-bg-secondary" : "ui-bg-gray-200",
                activeIndex === index ? "ui-ring-2 ui-ring-primary-200" : "",
                SizeMapper[size],
                "ui-cursor-pointer ui-rounded-full ui-transition-all ui-duration-200 hover:ui-bg-gray-300 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-primary-500",
              )}
              id={`${id}-${index}`}
              data-testid={`${id}-${index}`}
              onClick={handleContainerClick}
              aria-label={`PIN digit ${index + 1}${
                value ? `: ${value}` : ": empty"
              }`}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}