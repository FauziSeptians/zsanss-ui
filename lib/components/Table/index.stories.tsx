/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react'
import  { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './index'
import { Edit3, Trash2, Mail, ExternalLink } from 'lucide-react'

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

// --- Mock Data Type ---
interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Member' | 'Guest'
  status: 'Active' | 'Inactive'
}

const MOCK_DATA: User[] = [
  { id: '1', name: 'Muhammad Fauzi', email: 'fauzi@zisanss.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Wartiwan Putra', email: 'wartiwan@win.id', role: 'Admin', status: 'Active' },
  { id: '3', name: 'Sarah Connor', email: 'sarah@sky.net', role: 'Member', status: 'Inactive' },
  { id: '4', name: 'John Doe', email: 'john@example.com', role: 'Guest', status: 'Active' },
  { id: '5', name: 'Jane Smith', email: 'jane@test.com', role: 'Member', status: 'Active' },
]

// --- Internal Template Component ---
const TableTemplate = () => {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Definisi Kolom
  const columns = useMemo<ColumnDef<User, any>[]>(() => [
    {
      accessorKey: 'name',
      header: 'User Info',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{row.original.name}</span>
          <span className="text-xs text-foreground-subtle">ID: {row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Contact',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2 text-foreground-secondary">
          <Mail className="h-4 w-4 text-foreground-subtle" />
          {getValue()}
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue()
        return (
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            status === 'Active' ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'
          }`}>
            {status}
          </span>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-surface-subtle rounded text-primary-600 transition-colors">
            <Edit3 className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-danger-50 rounded text-danger-600 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ], [])

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    setPage(newPage)
    // Simulasi fetch data dari API
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-foreground">User Management</h2>
          <p className="text-sm text-foreground-muted">Daftar pengguna terdaftar di sistem.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-all">
          <ExternalLink className="h-4 w-4" />
          Export Data
        </button>
      </div>

      <DataTable
        columns={columns}
        data={MOCK_DATA}
        pageCount={10} // Ceritanya ada 10 halaman
        currentPage={page}
        onPageChange={handlePageChange}
        loading={isLoading}
      />
    </div>
  )
}

// --- Stories ---

export const Default: Story = {
  render: () => <TableTemplate />,
}

export const LoadingState: Story = {
  render: () => {
    const LoadingTemplate = () => (
      <DataTable
        columns={[]}
        data={[]}
        pageCount={1}
        currentPage={1}
        onPageChange={() => {}}
        loading={true}
      />
    )
    return <LoadingTemplate />
  }
}

export const EmptyState: Story = {
  render: () => {
    const EmptyTemplate = () => (
      <DataTable
        columns={[{ header: 'No Data', accessorKey: 'none' }]}
        data={[]}
        pageCount={0}
        currentPage={1}
        onPageChange={() => {}}
        loading={false}
      />
    )
    return <EmptyTemplate />
  }
}