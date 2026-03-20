import type { Meta, StoryObj } from '@storybook/react'
import  { useState } from 'react'
import Pagination from './index'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

const PaginationTemplate = () => {
  const [page, setPage] = useState(1)
  const total = 12

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-sm text-gray-500">Halaman Aktif: <span className="font-bold">{page}</span></p>
      <Pagination 
        currentPage={page} 
        totalPages={total} 
        onChange={(p) => setPage(p)}
      >
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
      </Pagination>
    </div>
  )
}

export const Default: Story = {
  render: () => <PaginationTemplate />,
}