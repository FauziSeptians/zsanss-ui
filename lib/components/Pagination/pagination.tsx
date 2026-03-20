/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import clsx from 'clsx'

// --- Interfaces ---

interface PaginationProps {
  children: ReactNode
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

interface PageButtonProps {
  page: number | string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  children?: ReactNode
}

// --- Logic Helper ---
const getPaginationRange = (current: number, total: number) => {
  const delta = 2 // Jumlah halaman di kiri/kanan halaman aktif
  const range: (number | string)[] = []
  
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }
  return range
}

// --- Components ---

/**
 * @component Pagination (Compound Component)
 * Wrapper utama untuk navigasi halaman.
 * @example
 * ```tsx
 * <Pagination currentPage={1} totalPages={10} onChange={(p) => setPage(p)}>
 * <Pagination.Prev />
 * <Pagination.Pages />
 * <Pagination.Next />
 * </Pagination>
 * ```
 */
export const PaginationRoot = ({ children, currentPage, totalPages, onChange }: PaginationProps) => {
  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            currentPage, 
            totalPages, 
            onChange 
          })
        }
        return child
      })}
    </nav>
  )
}

/**
 * Tombol internal untuk angka halaman
 */
export const PageButton = ({ page, active, disabled, onClick, children }: PageButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled || page === '...'}
    className={clsx(
      'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-all',
      active 
        ? 'bg-teal-600 text-white shadow-sm' 
        : 'text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
      page === '...' && 'cursor-default hover:bg-transparent'
    )}
  >
    {children || page}
  </button>
)

export const Prev = ({ currentPage, onChange }: any) => (
  <PageButton 
    page="prev" 
    disabled={currentPage === 1} 
    onClick={() => onChange(currentPage - 1)}
  >
    <ChevronLeft className="h-4 w-4" />
  </PageButton>
)

export const Next = ({ currentPage, totalPages, onChange }: any) => (
  <PageButton 
    page="next" 
    disabled={currentPage === totalPages} 
    onClick={() => onChange(currentPage + 1)}
  >
    <ChevronRight className="h-4 w-4" />
  </PageButton>
)

export const Pages = ({ currentPage, totalPages, onChange }: any) => {
  const range = getPaginationRange(currentPage, totalPages)

  return (
    <div className="flex items-center space-x-1">
      {range.map((p, idx) => (
        <React.Fragment key={idx}>
          {p === '...' ? (
            <span className="px-2 text-gray-400">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ) : (
            <PageButton 
              page={p} 
              active={currentPage === p} 
              onClick={() => onChange(Number(p))} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}