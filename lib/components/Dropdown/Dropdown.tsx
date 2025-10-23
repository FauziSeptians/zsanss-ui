import { DropdownTypes } from "@/types/dropdown";
import Typography from "../Typography";
import classNames from "@/utils/classNames";

/**
 * `Dropdown` is a list component used within `DropdownWrapper` to render selectable items.
 * It supports highlighting the selected item, search term highlighting, and optional callbacks
 * for selection and dropdown visibility control.
 *
 * @component
 * @example
 * ```tsx
 * <Dropdown
 *   item={[{ key: 'tech', value: 'Technology' }, { key: 'design', value: 'Design' }]}
 *   valueLabel={{ key: 'tech', value: 'Technology' }}
 *   setValueLabel={(val) => setSelected(val)}
 *   setIsOpenDropdown={(open) => setDropdownOpen(open)}
 *   searchValue="tech"
 * />
 * ```
 *
 * @param props - Props extending `DropdownTypes`.
 * @param props.item - Array of items to display in the dropdown. Each item must have `key` and `value`.
 * @param props.valueLabel - Currently selected item, used to highlight the active option.
 * @param props.setValueLabel - Callback to update the selected item.
 * @param props.setIsOpenDropdown - Callback to toggle dropdown visibility.
 * @param props.onClick - Optional callback triggered when an item is clicked.
 * @param props.searchValue - Optional search term used to highlight matching text.
 * @param props.className - Additional Tailwind CSS classes for the dropdown container.
 *
 * @returns A styled dropdown list of selectable items with optional search highlighting.
 */
function Dropdown({
  item,
  setIsOpenDropdown,
  onClick,
  className,
  setValueLabel,
  valueLabel,
  searchValue,
  ...props
}: DropdownTypes) {
  return (
    <div
      className={classNames(
        item && item?.length > 2 ? "max-h-36 overflow-y-auto" : "h-fit",
        "mt-2 border border-primary shadow-sm bg-white flex flex-col",
        className
      )}
      {...props}
    >
      {item &&
        item?.map((i) => {
          const isHighlight = i?.key === valueLabel?.key;

          return (
            <button
              key={i.key}
              className={classNames(
                "cursor-pointer hover:bg-neutral-100 flex justify-start",
                isHighlight ? "!bg-primary !text-white" : ""
              )}
              onClick={() => {
                if (onClick) onClick(i);
                if (setValueLabel) setValueLabel(i);
                if (setIsOpenDropdown) setIsOpenDropdown(false);
              }}
            >
              <div
                className={classNames(
                  isHighlight ? "border-none" : "border-b-[1px]",
                  "border-slate-300 w-full h-full mx-2 py-3 flex justify-start"
                )}
              >
                <Typography.Text highlightText={searchValue}>
                  {i.value}
                </Typography.Text>
              </div>
            </button>
          );
        })}
      {!item?.length ? (
        <div className="min-h-36 flex justify-center items-center">
          <Typography.Text>No data</Typography.Text>
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
