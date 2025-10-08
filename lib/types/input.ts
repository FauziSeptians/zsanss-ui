import { VARIANT } from "@/constants/input";
import { InputHTMLAttributes } from "react";

export type InputTypes = {
  type: "text" | "email" | "number";
  className?: string;
  inputVariant?: VARIANT;
  inputRadius?: "md" | "xl" | "full";
  placeHolder: string;
  label?: string;
  value?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type InputState = {
  value: string;
};

export type InputAction = { type: "ADD"; payload: string } | { type: "REMOVE" };

export type InputSearchTypes = {
  className?: string;
  placeHolder?: string;
  searchValue: string;
  setSearch : (val : string) => void
} & InputHTMLAttributes<HTMLInputElement>;
