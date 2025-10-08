import { InputAction, InputSearchTypes, InputState } from "@/types/input";
import classNames from "@/utils/classNames";
import { SearchIcon } from "lucide-react";
import { useReducer } from "react";

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
