import React, { ReactElement } from "react";

export type itemTypes = {
  key: string;
  value: string;
};

export type InputDropdownTypes = {
  children?: ReactElement<itemTypes[]>;
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
} & React.HTMLAttributes<HTMLDivElement>
