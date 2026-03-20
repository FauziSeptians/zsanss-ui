/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, ReactNode } from 'react'
import { 
  Combobox, 
  ComboboxInput, 
  ComboboxOption, 
  ComboboxOptions, 
  ComboboxButton 
} from '@headlessui/react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import clsx from 'clsx'

// --- Interfaces ---

/**
 * Props untuk root component Select.
 */
interface SelectProps<T> {
  children: ReactNode
  /** Value terpilih dengan tipe generic T */
  value: T | null
  /** Callback saat nilai berubah */
  onChange: (value: T | null) => void
  /** Callback untuk mereset atau mengupdate query pencarian */
  setQuery: (query: string) => void
}

/**
 * Props untuk input pencarian Select.
 */
interface SelectInputProps {
  /** Fungsi untuk menentukan teks apa yang tampil di input saat item terpilih */
  displayValue: (item: any) => string
  placeholder?: string
  /** Event handler untuk perubahan text input */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Props untuk item opsi dalam list.
 */
interface SelectOptionProps<T> {
  /** Data objek utuh */
  item: T
  /** Teks yang ditampilkan di list */
  label: string
}

/**
 * Props untuk detector infinite scroll.
 */
interface SelectLoaderProps {
  /** Fungsi yang dijalankan saat scroll mencapai bawah */
  onBottom: () => void
  /** Flag apakah masih ada data yang bisa diambil */
  hasMore: boolean
  /** Status loading untuk menampilkan spinner */
  loading: boolean
}

// --- Components ---

/**
 * @component Select (Compound Component)
 * Komponen pembungkus utama menggunakan Headless UI Combobox.
 * * @example
 * ```tsx
 * <Select value={selected} onChange={setSelected} setQuery={setQuery}>
 * <Select.Input 
 * displayValue={(u) => u.name} 
 * onChange={(e) => setQuery(e.target.value)} 
 * />
 * <Select.List>
 * {data.map(item => (
 * <Select.Option key={item.id} item={item} label={item.name} />
 * ))}
 * <Select.Loader onBottom={fetchNext} hasMore={true} loading={false} />
 * </Select.List>
 * </Select>
 * ```
 */
export const SelectRoot = <T,>({ children, value, onChange, setQuery }: SelectProps<T>) => {
  return (
    <Combobox value={value} onChange={onChange} onClose={() => setQuery('')}>
      <div className="relative mt-1">{children}</div>
    </Combobox>
  )
}

/**
 * @component Select.Input
 * Komponen input text dengan tombol trigger dropdown menggunakan Lucide Icon.
 */
export const SelectInput: React.FC<SelectInputProps> = ({ displayValue, placeholder, onChange }) => (
  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:text-sm border border-gray-200">
    <ComboboxInput
      className="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
      displayValue={displayValue}
      placeholder={placeholder}
      onChange={onChange}
    />
    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
      <ChevronsUpDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
    </ComboboxButton>
  </div>
)

/**
 * @component Select.List
 * Container dropdown yang menampung semua opsi.
 */
export const SelectList: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ComboboxOptions
    transition
    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
  >
    {children}
  </ComboboxOptions>
)

/**
 * @component Select.Option
 * Komponen item satuan di dalam list dengan Check icon dari Lucide.
 */
export const SelectOption = <T,>({ item, label }: SelectOptionProps<T>) => (
  <ComboboxOption
    value={item}
    className={({ focus }) =>
      clsx(
        'relative cursor-default select-none py-2 pl-10 pr-4 transition-colors',
        focus ? 'bg-teal-600 text-white' : 'text-gray-900'
      )
    }
  >
    {({ selected, focus }) => (
      <>
        <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
          {label}
        </span>
        {selected && (
          <span className={clsx('absolute inset-y-0 left-0 flex items-center pl-3', focus ? 'text-white' : 'text-teal-600')}>
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </ComboboxOption>
)

/**
 * @component Select.Loader
 * Komponen invisible sentinel untuk trigger infinite scroll dengan Spinner Lucide.
 */
export const SelectLoader: React.FC<SelectLoaderProps> = ({ onBottom, hasMore, loading }) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onBottom()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [onBottom, hasMore, loading])

  if (!hasMore && !loading) return null

  return (
    <div ref={observerTarget} className="flex justify-center p-3">
      {loading && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
          <span>Memuat data...</span>
        </div>
      )}
    </div>
  )
}