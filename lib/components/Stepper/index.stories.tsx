import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from ".";
import { useState } from "react";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
   tags: ["autodocs"],
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/**
 * 1. Kita buat Template Komponen Lokal dengan Huruf Kapital.
 * Ini agar React mengenali ini sebagai Functional Component yang valid.
 */
function StepperInteractiveTemplate() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <div className="mb-6 flex gap-4 border-b pb-4">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setActiveStep(s)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeStep === s
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            Langkah {s}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border min-h-[200px] flex items-center justify-center">
        <Stepper currentStep={activeStep}>
          <Stepper.Item step={1}>
            <div className="text-center">
              <h3 className="text-lg font-bold">Informasi Bisnis</h3>
              <p className="text-gray-500">Masukkan detail manufaktur WAFZ Anda.</p>
            </div>
          </Stepper.Item>
          <Stepper.Item step={2}>
            <div className="text-center">
              <h3 className="text-lg font-bold">Upload Katalog</h3>
              <p className="text-gray-500">Unggah foto produk tas terbaru.</p>
            </div>
          </Stepper.Item>
          <Stepper.Item step={3}>
            <div className="text-center">
              <h3 className="text-lg font-bold">Konfirmasi Akhir</h3>
              <p className="text-gray-500">Tinjau kembali data sebelum dikirim.</p>
            </div>
          </Stepper.Item>
        </Stepper>
      </div>
    </div>
  );
}

// 2. Gunakan komponen tersebut di dalam Story
export const Interactive: Story = {
  render: () => <StepperInteractiveTemplate />,
};

/**
 * Story untuk alur transaksi (Tanpa Hooks, jadi aman langsung di render)
 */
export const TransactionFlow: Story = {
  render: () => (
    <div className="max-w-md mx-auto border rounded-xl overflow-hidden bg-white shadow-lg">
      <div className="p-6">
        <Stepper currentStep="PENDING">
          <Stepper.Item step="PENDING">
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-sm">
              Transaksi sedang dalam pengecekan limit saldo.
            </div>
          </Stepper.Item>
          <Stepper.Item step="SUCCESS">
            <div className="text-center py-6 text-green-600 font-bold">
              Settlement Berhasil
            </div>
          </Stepper.Item>
        </Stepper>
      </div>
    </div>
  ),
};