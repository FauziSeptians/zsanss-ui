import { Modal } from "@/main";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
   tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 1. Handle dengan 2 Button (Contoh: Konfirmasi Settlement)
export const Confirmation: Story = {
  render: (args) => {
    return (
      <Modal {...args} size="sm">
        <Modal.Body>
          <Modal.Header>Konfirmasi Settlement</Modal.Header>
           <p className="text-sm text-foreground-muted">
              Apakah Anda yakin ingin menyetujui transaksi settlement H+1 ini? Tindakan ini tidak dapat dibatalkan.
            </p>
          <Modal.Footer className="justify-end">
            <button className="px-4 py-2 text-sm font-medium text-foreground-secondary bg-surface border border-border-strong rounded-md hover:bg-surface-muted">
              Batal
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
              Setujui
            </button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    );
  },
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

// 2. General Error (Contoh: Gagal Proses Payroll)
export const ErrorState: Story = {
  render: (args) => (
    <Modal {...args} size="sm">
      <Modal.Body>
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-danger-100 rounded-full mb-4">
          <span className="text-danger-600 text-xl">⚠️</span>
        </div>
        <Modal.Header>
          <div className="text-center">Gagal Memproses Data</div>
        </Modal.Header>
        <p className="text-sm text-center text-foreground-muted">
            Terjadi kesalahan pada sistem saat mencoba memproses daftar payroll. Silakan coba beberapa saat lagi atau hubungi tim IT.
          </p>
        <Modal.Footer className="justify-center">
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-danger-600 rounded-md hover:bg-danger-700">
            Tutup
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  ),
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

// 3. Modal dengan Table (Contoh: Detail Riwayat Transaksi)
export const WithTable: Story = {
  render: (args) => (
    <Modal {...args} size="lg">
      <Modal.Body>
        <Modal.Header>Riwayat Transaksi Properti</Modal.Header>
        
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground-muted uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground-muted uppercase">Produk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground-muted uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground-muted uppercase">Nominal</th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-border">
                {[1, 2, 3].map((item) => (
                  <tr key={item}>
                    <td className="px-4 py-3 text-sm text-foreground">#TRX-00{item}</td>
                    <td className="px-4 py-3 text-sm text-foreground-muted">Cluster Industrial A{item}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-semibold text-success-800 bg-success-100 rounded-full">Success</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground text-right font-mono">Rp 500.000.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <Modal.Footer className="justify-end">
          <button className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-md">Unduh Laporan</button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  ),
  args: {
    isOpen: true,
    onClose: () => {},
  },
};