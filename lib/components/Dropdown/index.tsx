import { InputDropdownTypes, SharedDropdownProps } from "@/types/dropdown";
import Dropdown from "./Dropdown";
import { cloneElement, isValidElement, useMemo, useState } from "react";
import classNames from "@/utils/classNames";
import { ChevronDown, ChevronUp } from "lucide-react";
import Search from "../Input/Search";
import React from "react";

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
  const [searchValue, setSearchValue] = useState("");

  const hasSearchChild = React.Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === DropdownWrapper.Search
  );

  const itemVal = useMemo(() => {
    return item?.filter((item) => item?.key?.includes(searchValue));
  }, [searchValue, item]);

  const sharedProps: SharedDropdownProps = {
    item: itemVal,
    setIsOpenDropdown,
    setValueLabel,
    valueLabel,
    className: hasSearchChild ? "!border-none !shadow-none" : "",
    searchValue: searchValue,
    setSearch: setSearchValue,
  };

  console.log("search", searchValue);

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
      {isDropdownOpen && (
        <div
          className={classNames(
            hasSearchChild
              ? "py-3 px-2 bg-white border border-neutral-200 rounded-b-md"
              : ""
          )}
        >
          {isDropdownOpen &&
            React.Children.map(children, (child) => {
              return isValidElement(child)
                ? cloneElement(child, sharedProps)
                : child;
            })}
        </div>
      )}
    </>
  );
}

type InputType = typeof InputDropdown & {
  Dropdown: typeof Dropdown;
  Search: typeof Search;
};

const DropdownWrapper = InputDropdown as InputType;
DropdownWrapper.Dropdown = Dropdown;
DropdownWrapper.Search = Search;

export default DropdownWrapper;
export { Dropdown };
