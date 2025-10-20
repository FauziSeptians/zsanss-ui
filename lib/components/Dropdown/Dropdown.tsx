import { DropdownTypes } from "@/types/dropdown";
import Typography from "../Typography";
import classNames from "@/utils/classNames";

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
