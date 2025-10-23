import { InputDropdownTypes, SharedDropdownProps } from "@/types/dropdown";
import Dropdown from "./Dropdown";
import { cloneElement, isValidElement, useMemo, useState } from "react";
import classNames from "@/utils/classNames";
import { ChevronDown, ChevronUp } from "lucide-react";
import Search from "../Input/Search";
import React from "react";


/**
 * `DropdownWrapper` is a compound dropdown component that supports dynamic item selection,
 * optional search filtering, and custom rendering via child components.
 * It manages internal state for dropdown visibility, selected value, and search input.
 *
 * This component exposes two subcomponents:
 * - `DropdownWrapper.Dropdown`: used to render selectable items.
 * - `DropdownWrapper.Search`: used to render a search input field inside the dropdown.
 *
 * @component
 * @example
 * ```tsx
 * <DropdownWrapper
 *   label="Select Category"
 *   item={[{ key: 'tech', value: 'Technology' }, { key: 'design', value: 'Design' }]}
 * >
 *   <DropdownWrapper.Search />
 *   <DropdownWrapper.Dropdown />
 * </DropdownWrapper>
 * ```
 *
 * @param props - Props extending `InputDropdownTypes`.
 * @param props.label - Accessible label and default display text. Default is `"input-dropdown"`.
 * @param props.value - Initial selected value object `{ key: string; value: string }`.
 * @param props.item - Array of selectable items with `key` and `value`.
 * @param props.children - Child components to be rendered inside the dropdown (e.g., `Search`, `Dropdown`).
 * @param props.className - Additional Tailwind CSS classes for the trigger button.
 *
 * @returns A styled dropdown button with optional search and item list.
 */
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
