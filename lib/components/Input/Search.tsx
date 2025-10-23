import { InputAction, InputSearchTypes, InputState } from "@/types/input";
import classNames from "@/utils/classNames";
import { SearchIcon } from "lucide-react";
import { useReducer } from "react";


/**
 * `Search` is a controlled search input component with built-in reducer logic
 * for managing input state and triggering search updates.
 * It supports read-only mode, custom placeholder, and external state handling via `setSearch`.
 *
 * @component
 * @example
 * ```tsx
 * <Search
 *   placeHolder="Search projects..."
 *   searchValue={search}
 *   setSearch={(val) => setSearch(val)}
 * />
 * ```
 *
 * @param props - Props extending `InputSearchTypes`.
 * @param props.className - Additional Tailwind CSS classes for the container.
 * @param props.placeHolder - Placeholder text for the input field.
 * @param props.searchValue - Initial value of the search input.
 * @param props.setSearch - Callback to update the search value externally.
 * @param props.readOnly - If true, disables input interaction.
 *
 * @returns A styled search input field with icon and reducer-based state management.
 */
export default function Search({
  className,
  placeHolder,
  searchValue,
  ...props
}: InputSearchTypes) {
  function inputReducer(state: InputState, action: InputAction): InputState {
    switch (action.type) {
      case "ADD": {
        props.setSearch(action.payload);
        return {
          ...state,
          value: action.payload,
        };
      }

      case "REMOVE": {
        props.setSearch("");
        return {
          ...state,
          value: "",
        };
      }

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(inputReducer, {
    value: searchValue || "",
  });

  return (
    <div
      className={classNames(
        !props.readOnly
          ? "focus:border focus:border-primary"
          : "cursor-not-allowed",
        "bg-neutral-200",
        "w-full py-3 px-4 outline-none rounded-full flex gap-2 items-center",
        className
      )}
    >
      <SearchIcon className="size-5" />
      <input
        className="w-full outline-none"
        type="search"
        placeholder={placeHolder || "Search.."}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "ADD", payload: e.target.value })
        }
        value={state.value}
        {...props}
      />
    </div>
  );
}
