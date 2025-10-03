import { InputDropdownTypes } from "@/types/dropdown";
import Dropdown from "./Dropdown";
import { cloneElement, isValidElement, ReactElement, useState } from "react";
import classNames from "@/utils/classNames";
import { ChevronDown, ChevronUp } from "lucide-react";

function InputDropdown({
  children,
  label = "input-dropdown",
  value,
  item,
  ...props
}: InputDropdownTypes) {
  const [isDropdownOpen, setIsOpenDropdown] = useState(false);
  const [valueLabel, setValueLabel] = useState<{
    key: string;
    value: string;
  } | null>(value || null);

  const sharedProps = {
    item,
    setIsOpenDropdown,
    setValueLabel,
    valueLabel,
  };

  return (
    <>
      <button
        {...props}
        aria-label={label}
        className={classNames(
          isDropdownOpen ? "border-primary" : "border-neutral-200",
          "border-b-[1px] py-3 cursor-pointer w-full flex justify-between items-center"
        )}
        onClick={() => setIsOpenDropdown((prev) => !prev)}
      >
        {valueLabel?.value || label}
        {!isDropdownOpen ? <ChevronDown /> : <ChevronUp />}
      </button>

      {isDropdownOpen && isValidElement(children)
        ? cloneElement(
            children as ReactElement<typeof sharedProps>,
            sharedProps
          )
        : null}
    </>
  );
}

type InputType = typeof InputDropdown & {
  Dropdown: typeof Dropdown;
};

const Input = InputDropdown as InputType;
Input.Dropdown = Dropdown;

export default Input;
export { Dropdown };
