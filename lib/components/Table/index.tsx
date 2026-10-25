import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import Pagination from '../Pagination/index'
import clsx from 'clsx'

/**
 * Props untuk komponen DataTable.
 * Menggunakan Generic TData untuk tipe data baris dan TValue untuk tipe data cell.
 */
interface DataTableProps<TData extends object, TValue> {
  /** Definisi kolom tabel menggunakan standard TanStack Table ColumnDef */
  columns: ColumnDef<TData, TValue>[]
  /** Array data yang akan ditampilkan dalam tabel */
  data: TData[]
  /** Total halaman yang tersedia (biasanya didapat dari meta data API) */
  pageCount: number
  /** Halaman yang sedang aktif saat ini (dimulai dari 1) */
  currentPage: number
  /** Fungsi callback yang dijalankan ketika user berpindah halaman */
  onPageChange: (page: number) => void
  /** Status loading untuk menampilkan overlay spinner di atas tabel */
  loading?: boolean
  /** Custom class untuk styling container utama */
  className?: string
}

/**
 * @component DataTable
 * Komponen tabel yang dibungkus (rewrapped) menggunakan TanStack Table v8.
 * Sudah terintegrasi dengan komponen Pagination custom dan mendukung server-side pagination.
 * * @example
 * ```tsx
 * const columns = [
 * { header: 'Nama', accessorKey: 'name' },
 * { header: 'Email', accessorKey: 'email' }
 * ];
 * * <DataTable
 * columns={columns}
 * data={users}
 * pageCount={5}
 * currentPage={1}
 * onPageChange={(page) => handleFetch(page)}
 * loading={isLoading}
 * />
 * ```
 */
export function DataTable<TData extends object, TValue>({
  columns,
  data,
  pageCount,
  currentPage,
  onPageChange,
  loading = false,
  className,
}: DataTableProps<TData, TValue>) {
  
  /**
   * Inisialisasi instance table dari TanStack.
   * Menggunakan useMemo agar instance tidak dibuat ulang kecuali dependency berubah,
   * demi menjaga performa rendering.
   */
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage - 1, // Sinkronisasi 0-based index TanStack dengan 1-based UI
        pageSize: 10, 
      },
    },
  })

  return (
    <div className={clsx("w-full space-y-4", className)}>
      <div className="rounded-md border border-border bg-surface overflow-hidden shadow-sm relative">
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 bg-surface/60 flex items-center justify-center backdrop-blur-[1px] transition-all">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        )}

        <table className="w-full text-sm text-left">
          <thead className="bg-surface-muted text-foreground-secondary uppercase text-xs font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-surface-muted transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-foreground-secondary">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-32 text-center text-foreground-muted">
                  {loading ? 'Sedang mengambil data...' : 'Tidak ada data ditemukan.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Section: Info halaman & Pagination Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <p className="text-sm text-foreground-muted font-medium order-2 sm:order-1">
          Menampilkan halaman <span className="text-foreground">{currentPage}</span> dari <span className="text-foreground">{pageCount}</span>
        </p>
        <div className="order-1 sm:order-2">
          <Pagination 
            currentPage={currentPage} 
            totalPages={pageCount} 
            onChange={onPageChange}
          >
            <Pagination.Prev />
            <Pagination.Pages />
            <Pagination.Next />
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default DataTable