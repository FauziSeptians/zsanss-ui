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
           <p className="text-sm text-gray-500">
              Apakah Anda yakin ingin menyetujui transaksi settlement H+1 ini? Tindakan ini tidak dapat dibatalkan.
            </p>
          <Modal.Footer className="justify-end">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Batal
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
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
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <span className="text-red-600 text-xl">⚠️</span>
        </div>
        <Modal.Header>
          <div className="text-center">Gagal Memproses Data</div>
        </Modal.Header>
        <p className="text-sm text-center text-gray-500">
            Terjadi kesalahan pada sistem saat mencoba memproses daftar payroll. Silakan coba beberapa saat lagi atau hubungi tim IT.
          </p>
        <Modal.Footer className="justify-center">
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nominal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <tr key={item}>
                    <td className="px-4 py-3 text-sm text-gray-900">#TRX-00{item}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Cluster Industrial A{item}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Success</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right font-mono">Rp 500.000.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <Modal.Footer className="justify-end">
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md">Unduh Laporan</button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  ),
  args: {
    isOpen: true,
    onClose: () => {},
  },
};