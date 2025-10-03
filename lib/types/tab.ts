import { COLOR, SIZE, VARIANT_TAB } from "@/constants/tab";

export type itemTabType = {
  key: string;
  value: string;
};

export type TabTypes = {
  children?: React.ReactNode;
  item: itemTabType[];
  radius?: SIZE | string;
  variant?: VARIANT_TAB.BORDERED | string;
  highlightColor?: COLOR | string;
} & React.HTMLAttributes<HTMLDivElement>;
