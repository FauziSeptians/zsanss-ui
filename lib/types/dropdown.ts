import React, { ReactElement } from "react";

export type itemTypes = {
  key: string;
  value: string;
};

export type SharedDropdownProps = {
  item: itemTypes[];
  valueLabel: itemTypes | null;
  setValueLabel: React.Dispatch<React.SetStateAction<itemTypes | null>>;
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
  searchValue: string;
  setSearch: (e: string) => void;
};

export type InputDropdownTypes = {
  children?:
    | ReactElement<SharedDropdownProps>
    | ReactElement<SharedDropdownProps>[];
  label?: string;
  item: itemTypes[];
  value?: itemTypes;
} & React.HTMLAttributes<HTMLButtonElement>;

export type DropdownTypes = {
  item?: itemTypes[];
  setIsOpenDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (val: itemTypes) => void;
  setValueLabel?: React.Dispatch<React.SetStateAction<itemTypes>>;
  valueLabel?: itemTypes;
  className?: string;
  searchValue?: string;
};
