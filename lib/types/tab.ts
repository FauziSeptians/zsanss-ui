import { COLOR, SIZE, VARIANT_TAB } from "@/constants/tab";

export type itemTabType = {
  key: string;
  value: string;
  /** Nonaktifkan tab ini (tidak bisa dipilih; tetap bisa difokus keyboard sesuai pola WAI-ARIA). */
  disabled?: boolean;
};

export type TabTypes = {
  /**
   * Konten di bawah daftar tab. Bisa fungsi yang menerima key tab aktif,
   * mis. `{(active) => <Panel id={active} />}`.
   */
  children?: React.ReactNode | ((activeKey: string) => React.ReactNode);
  item: itemTabType[];
  radius?: SIZE | string;
  variant?: VARIANT_TAB.BORDERED | string;
  highlightColor?: COLOR | string;
  /** Key tab aktif (controlled). */
  value?: string;
  /** Key tab aktif awal (uncontrolled). Default: tab pertama yang tidak disabled. */
  defaultValue?: string;
  /** Dipanggil saat user berpindah tab. */
  onValueChange?: (key: string) => void;
  /** Label aksesibilitas untuk daftar tab. */
  "aria-label"?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
