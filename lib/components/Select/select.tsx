/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "@/utils/cn";

// --- Context ---

type SelectContextValue = {
  /** Diisi oleh <Select.Input displayValue=...> agar root tahu cara menampilkan item terpilih. */
  displayValueRef: React.MutableRefObject<((item: any) => string) | undefined>;
  disabled: boolean;
  hasError: boolean;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select.* harus berada di dalam <Select />");
  return ctx;
}

// --- Interfaces ---

/**
 * Props untuk root component Select.
 */
export interface SelectProps<T> {
  children: ReactNode;
  /** Value terpilih dengan tipe generic T */
  value: T | null;
  /** Callback saat nilai berubah */
  onChange: (value: T | null) => void;
  /** Callback untuk mereset atau mengupdate query pencarian */
  setQuery: (query: string) => void;
  /**
   * Daftar item yang sedang ditampilkan. Opsional; kalau diisi, `Select.List`
   * bisa menampilkan `emptyText` saat daftar kosong.
   */
  items?: T[];
  /** Bandingkan dua item (default: referensi sama). Berguna saat data di-fetch ulang. */
  isItemEqualToValue?: (a: T, b: T) => boolean;
  /** Ubah item menjadi teks (default: `displayValue` milik Select.Input, lalu `label`, lalu String). */
  itemToString?: (item: T) => string;
  /** Nonaktifkan seluruh select. */
  disabled?: boolean;
  /** Tampilkan nilai tapi tidak bisa diubah. */
  readOnly?: boolean;
  /** Wajib dipilih saat form disubmit. */
  required?: boolean;
  /** Nama field untuk form submit. */
  name?: string;
  /** Tandai tampilan error (border merah). */
  error?: boolean;
  /** Class tambahan untuk wrapper. */
  className?: string;
}

/**
 * Props untuk input pencarian Select.
 */
export interface SelectInputProps {
  /** Fungsi untuk menentukan teks apa yang tampil di input saat item terpilih */
  displayValue?: (item: any) => string;
  placeholder?: string;
  /** Event handler untuk perubahan text input */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Tampilkan tombol hapus pilihan. Default: false. */
  clearable?: boolean;
  /** Label aksesibilitas bila tidak ada <label> terpisah. */
  "aria-label"?: string;
  /** id input, untuk dihubungkan dengan <label htmlFor>. */
  id?: string;
  className?: string;
}

/**
 * Props untuk item opsi dalam list.
 */
export interface SelectOptionProps<T> {
  /** Data objek utuh */
  item: T;
  /** Teks yang ditampilkan di list */
  label: string;
  /** Nonaktifkan opsi ini. */
  disabled?: boolean;
}

/**
 * Props untuk list opsi.
 */
export interface SelectListProps {
  children: ReactNode;
  /** Teks saat daftar kosong (butuh prop `items` di <Select />). */
  emptyText?: ReactNode;
  className?: string;
}

/**
 * Props untuk detector infinite scroll.
 */
export interface SelectLoaderProps {
  /** Fungsi yang dijalankan saat scroll mencapai bawah */
  onBottom: () => void;
  /** Flag apakah masih ada data yang bisa diambil */
  hasMore: boolean;
  /** Status loading untuk menampilkan spinner */
  loading: boolean;
  /** Teks saat memuat. Default: "Memuat data..." */
  loadingText?: ReactNode;
}

// --- Components ---

/**
 * @component Select (Compound Component)
 * Combobox dengan pencarian, dibangun di atas Base UI. Pencarian dilakukan di sisi
 * konsumer (server-side atau filter sendiri) lewat `setQuery` + `Select.Input onChange`.
 *
 * @example
 * ```tsx
 * <Select value={selected} onChange={setSelected} setQuery={setQuery} items={data}>
 *   <Select.Input
 *     clearable
 *     displayValue={(u) => u.name}
 *     onChange={(e) => setQuery(e.target.value)}
 *   />
 *   <Select.List emptyText="Tidak ditemukan">
 *     {data.map((item) => (
 *       <Select.Option key={item.id} item={item} label={item.name} />
 *     ))}
 *     <Select.Loader onBottom={fetchNext} hasMore loading={false} />
 *   </Select.List>
 * </Select>
 * ```
 */
export const SelectRoot = <T,>({
  children,
  value,
  onChange,
  setQuery,
  items,
  isItemEqualToValue,
  itemToString,
  disabled = false,
  readOnly,
  required,
  name,
  error = false,
  className,
}: SelectProps<T>) => {
  const displayValueRef = useRef<((item: any) => string) | undefined>(undefined);

  const toLabel = (item: T): string => {
    if (itemToString) return itemToString(item);
    if (displayValueRef.current) return displayValueRef.current(item);
    if (item && typeof item === "object" && "label" in item) {
      return String((item as { label: unknown }).label);
    }
    return item == null ? "" : String(item);
  };

  return (
    <SelectContext.Provider value={{ displayValueRef, disabled, hasError: error }}>
      <Combobox.Root<T>
        value={value}
        onValueChange={(next) => onChange((next as T | null) ?? null)}
        onOpenChange={(open) => {
          if (!open) setQuery("");
        }}
        // Pencarian dikendalikan konsumer, jadi Base UI tidak boleh memfilter lagi.
        filter={null}
        items={items}
        filteredItems={items}
        itemToStringLabel={toLabel}
        isItemEqualToValue={isItemEqualToValue}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        name={name}
      >
        <div className={cn("relative mt-1", className)}>{children}</div>
      </Combobox.Root>
    </SelectContext.Provider>
  );
};

/**
 * @component Select.Input
 * Input pencarian + tombol buka daftar (dan tombol hapus bila `clearable`).
 */
export const SelectInput: React.FC<SelectInputProps> = ({
  displayValue,
  placeholder,
  onChange,
  clearable = false,
  className,
  ...aria
}) => {
  const { displayValueRef, disabled, hasError } = useSelectContext();

  useLayoutEffect(() => {
    displayValueRef.current = displayValue;
    return () => {
      displayValueRef.current = undefined;
    };
  }, [displayValue, displayValueRef]);

  return (
    <Combobox.InputGroup
      className={cn(
        "relative flex w-full items-center overflow-hidden rounded-lg border bg-surface text-left shadow-sm",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-200",
        hasError ? "border-danger focus-within:border-danger focus-within:ring-danger-200" : "border-border",
        disabled && "cursor-not-allowed bg-surface-muted opacity-60",
        className,
      )}
    >
      <Combobox.Input
        {...aria}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={hasError || undefined}
        className="w-full border-none bg-transparent py-2.5 pl-3 pr-16 text-sm leading-5 text-foreground outline-none placeholder:text-foreground-subtle disabled:cursor-not-allowed"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-1">
        {clearable ? (
          <Combobox.Clear
            aria-label="Hapus pilihan"
            className="flex h-8 w-6 items-center justify-center text-foreground-subtle transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Combobox.Clear>
        ) : null}
        <Combobox.Trigger
          aria-label="Buka daftar"
          className="flex h-8 w-7 items-center justify-center text-foreground-subtle transition-colors hover:text-foreground"
        >
          <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
        </Combobox.Trigger>
      </div>
    </Combobox.InputGroup>
  );
};

/**
 * @component Select.List
 * Popup berisi semua opsi. Dirender lewat portal sehingga tidak terpotong `overflow` parent.
 */
export const SelectList: React.FC<SelectListProps> = ({ children, emptyText, className }) => (
  <Combobox.Portal>
    <Combobox.Positioner sideOffset={4} className="z-50 outline-none">
      <Combobox.Popup
        className={cn(
          "w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-md bg-surface text-base shadow-lg ring-1 ring-black/5",
          "transition duration-100 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className,
        )}
      >
        <Combobox.Empty className="px-4 py-3 text-sm text-foreground-muted empty:hidden">
          {emptyText}
        </Combobox.Empty>
        <Combobox.List className="max-h-60 overflow-auto overscroll-contain py-1 outline-none sm:text-sm">
          {children}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
);

/**
 * @component Select.Option
 * Satu opsi di dalam list, dengan indikator centang saat terpilih.
 */
export const SelectOption = <T,>({ item, label, disabled }: SelectOptionProps<T>) => (
  <Combobox.Item
    value={item}
    disabled={disabled}
    className={cn(
      "relative flex cursor-default select-none items-center py-2 pl-10 pr-4 text-foreground transition-colors",
      "data-[highlighted]:bg-primary-600 data-[highlighted]:text-white",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    )}
  >
    <span className="block truncate font-normal data-[selected]:font-medium">{label}</span>
    <Combobox.ItemIndicator className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 [[data-highlighted]>&]:text-white">
      <Check className="h-4 w-4" aria-hidden="true" />
    </Combobox.ItemIndicator>
  </Combobox.Item>
);

/**
 * @component Select.Loader
 * Sentinel tak terlihat untuk memicu infinite scroll, dengan spinner saat memuat.
 */
export const SelectLoader: React.FC<SelectLoaderProps> = ({
  onBottom,
  hasMore,
  loading,
  loadingText = "Memuat data...",
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const onBottomRef = useRef(onBottom);

  useEffect(() => {
    onBottomRef.current = onBottom;
  }, [onBottom]);

  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onBottomRef.current();
      },
      { threshold: 0.1 },
    );
    observer.observe(currentTarget);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  if (!hasMore && !loading) return null;

  return (
    <div ref={observerTarget} className="flex justify-center p-3" role="status" aria-live="polite">
      {loading ? (
        <div className="flex items-center gap-2 text-xs text-foreground-muted">
          <Loader2 className="h-4 w-4 animate-spin text-primary-500" aria-hidden="true" />
          <span>{loadingText}</span>
        </div>
      ) : null}
    </div>
  );
};
