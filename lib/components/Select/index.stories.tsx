import type { Meta, StoryObj } from '@storybook/react'
import  { useState } from 'react'
import Select from './index'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Select>

// --- Mock Data ---
interface User {
  id: number
  name: string
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'David Miller' },
  { id: 5, name: 'Eve Adams' },
]

// --- Internal Templates (Agar ESLint Happy) ---

const DefaultTemplate = () => {
  const [selected, setSelected] = useState<User | null>(null)
  const [query, setQuery] = useState('')

  const filtered = query === '' 
    ? mockUsers 
    : mockUsers.filter(u => u.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="w-80 h-96">
      <Select value={selected} onChange={setSelected} setQuery={setQuery}>
        <Select.Input 
          displayValue={(u: User) => u?.name || ''} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pilih nama..."
        />
        <Select.List>
          {filtered.map((user) => (
            <Select.Option key={user.id} item={user} label={user.name} />
          ))}
        </Select.List>
      </Select>
    </div>
  )
}

const InfiniteTemplate = () => {
  const [selected, setSelected] = useState<User | null>(null)
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<User[]>(mockUsers)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchNextPage = () => {
    if (loading || !hasMore) return
    setLoading(true)
    
    setTimeout(() => {
      const nextBatch = Array.from({ length: 5 }, (_, i) => ({
        id: items.length + i + 1,
        name: `User Baru ${items.length + i + 1}`
      }))
      setItems(prev => [...prev, ...nextBatch])
      setLoading(false)
      if (items.length >= 20) setHasMore(false)
    }, 1000)
  }

  const filtered = items.filter(u => u.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="w-80 h-96">
      <label className="text-sm font-bold text-foreground-secondary mb-2 block">Scroll ke bawah untuk load data</label>
      <Select value={selected} onChange={setSelected} setQuery={setQuery}>
        <Select.Input 
          displayValue={(u: User) => u?.name || ''} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari user (Infinite)..."
        />
        <Select.List>
          {filtered.map((user) => (
            <Select.Option key={user.id} item={user} label={user.name} />
          ))}
          <Select.Loader 
            onBottom={fetchNextPage} 
            hasMore={hasMore} 
            loading={loading} 
          />
        </Select.List>
      </Select>
    </div>
  )
}

// --- Stories Export ---

export const Default: Story = {
  render: () => <DefaultTemplate />,
}

export const InfiniteScroll: Story = {
  render: () => <InfiniteTemplate />,
}

export const NoResults: Story = {
  render: () => {
    // Untuk story sederhana tanpa state kompleks, 
    // kita bisa pakai functional component anonim yang dimulai dengan huruf Kapital
    const EmptyState = () => {
      const [val, setVal] = useState(null)
      return (
        <div className="w-80 h-40">
          <Select value={val} onChange={setVal} setQuery={() => {}}>
            <Select.Input displayValue={() => ''} onChange={() => {}} placeholder="Ketik apa saja..." />
            <Select.List>
              <div className="p-4 text-center text-sm text-foreground-muted italic">
                Data tidak ditemukan
              </div>
            </Select.List>
          </Select>
        </div>
      )
    }
    return <EmptyState />
  }
}

// --- Stories prop baru (Base UI) ---

const FeatureTemplate = ({
  disabled,
  error,
  clearable,
  initial = null,
}: {
  disabled?: boolean
  error?: boolean
  clearable?: boolean
  initial?: User | null
}) => {
  const [selected, setSelected] = useState<User | null>(initial)
  const [query, setQuery] = useState('')
  const filtered = mockUsers.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="w-80 h-72">
      <label htmlFor="user-select" className="mb-1 block text-sm font-semibold text-foreground-secondary">
        Penanggung jawab
      </label>
      <Select
        value={selected}
        onChange={setSelected}
        setQuery={setQuery}
        items={filtered}
        disabled={disabled}
        error={error}
        isItemEqualToValue={(a, b) => a.id === b.id}
      >
        <Select.Input
          id="user-select"
          clearable={clearable}
          displayValue={(u: User) => u?.name || ''}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pilih nama..."
        />
        <Select.List emptyText="Tidak ada user yang cocok">
          {filtered.map((user) => (
            <Select.Option key={user.id} item={user} label={user.name} disabled={user.id === 4} />
          ))}
        </Select.List>
      </Select>
      {error ? <p className="mt-1 text-xs text-danger">Penanggung jawab wajib dipilih</p> : null}
    </div>
  )
}

export const Clearable: Story = {
  render: () => <FeatureTemplate clearable initial={mockUsers[0]} />,
}

export const Disabled: Story = {
  render: () => <FeatureTemplate disabled initial={mockUsers[1]} />,
}

export const WithError: Story = {
  render: () => <FeatureTemplate error />,
}
