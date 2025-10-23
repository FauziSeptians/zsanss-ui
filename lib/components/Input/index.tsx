import { VARIANT } from "@/constants/input";
import { InputAction, InputState, InputTypes } from "@/types/input";
import classNames from "@/utils/classNames";
import { useId, useReducer, useState } from "react";
import Typography from "../Typography";

/**
 * `InputWrapper` is a flexible and styled input component that supports multiple visual variants,
 * error messaging, and internal state management via reducer. It can be used for various input types
 * and integrates with custom typography components for labels and error text.
 *
 * @component
 * @example
 * ```tsx
 * <InputWrapper
 *   type="text"
 *   label="Username"
 *   placeHolder="Enter your username"
 *   value={username}
 *   error={formError}
 *   inputVariant="bordered"
 *   inputRadius="lg"
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 * ```
 *
 * @param props - Props extending `InputTypes`.
 * @param props.type - HTML input type (e.g. `"text"`, `"email"`, `"password"`).
 * @param props.className - Additional Tailwind CSS classes for the input element.
 * @param props.inputVariant - Visual style of the input. Options: `"flat"`, `"bordered"`, `"underlined"`. Default is `"flat"`.
 * @param props.inputRadius - Border radius size. Accepts Tailwind values like `"md"`, `"lg"`, etc.
 * @param props.placeHolder - Placeholder text for the input field.
 * @param props.label - Optional label displayed above the input.
 * @param props.value - Initial value of the input field.
 * @param props.error - Error message to display below the input.
 * @param props.readOnly - If true, disables input interaction.
 * @param props.onChange - Callback triggered when input value changes.
 *
 * @returns A styled input field with optional label and error message.
 */
export default function InputWrapper({
  type,
  className,
  inputVariant = VARIANT.FLAT,
  inputRadius = "md",
  placeHolder,
  label,
  value,
  error,
  ...props
}: InputTypes) {
  const inputId = useId();
  const [errorWording, setErrorWording] = useState<{
    isError: boolean;
    message: string;
  }>({
    isError: Boolean(error),
    message: error || "",
  });

  function inputReducer(state: InputState, action: InputAction): InputState {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          value: action.payload,
        };

      case "REMOVE":
        return {
          ...state,
          value: "",
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(inputReducer, { value: value || "" });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorWording((prev) => ({
      isError: false,
      message: prev.message,
    }));
    dispatch({ type: "ADD", payload: e.target.value });
  }

  function render(variant: VARIANT) {
    switch (variant) {
      case VARIANT.FLAT: {
        return (
          <div className="w-full">
            {label && (
              <label
                htmlFor={inputId}
                className="block mb-1 text-sm font-medium text-neutral-700"
              >
                <Typography.Text> {label}</Typography.Text>
              </label>
            )}
            <input
              id={inputId}
              className={classNames(
                !props.readOnly
                  ? "focus:border focus:border-primary"
                  : "cursor-not-allowed",
                `rounded-${inputRadius}`,
                "bg-neutral-200",
                "w-full py-2 px-4 outline-none",
                className
              )}
              type={type}
              placeholder={placeHolder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              value={state.value}
              {...props}
            />
          </div>
        );
      }
      case VARIANT.BORDERED: {
        return (
          <div className="w-full">
            {label && (
              <label
                htmlFor={inputId}
                className="block mb-1 text-sm font-medium text-neutral-700"
              >
                <Typography.Text> {label}</Typography.Text>
              </label>
            )}
            <input
              className={classNames(
                !props.readOnly ? "focus:border-primary" : "cursor-not-allowed",
                `rounded-${inputRadius}`,
                "border border-neutral-200",
                "w-full py-2 px-4 outline-none",
                className
              )}
              type={type}
              placeholder={placeHolder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              value={state.value}
              {...props}
            />
          </div>
        );
      }
      case VARIANT.UNDERLINED: {
        return (
          <div className="w-full">
            {label && (
              <label
                htmlFor={inputId}
                className="block mb-1 text-sm font-medium text-neutral-700"
              >
                <Typography.Text> {label}</Typography.Text>
              </label>
            )}
            <input
              className={classNames(
                !props.readOnly ? "focus:border-primary" : "cursor-not-allowed",
                "border-b-[1px] border-neutral-200",
                "w-full py-1 outline-none",
                className
              )}
              type={type}
              placeholder={placeHolder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              value={state.value}
              {...props}
            />
          </div>
        );
      }

      default:
        break;
    }
  }
  return (
    <div className="flex flex-col gap-1 w-full">
      {render(inputVariant)}
      {errorWording?.isError ? (
        <Typography.Text className="text-red-400">
          {errorWording?.message}
        </Typography.Text>
      ) : null}
    </div>
  );
}
