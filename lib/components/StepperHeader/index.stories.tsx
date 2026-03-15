import type { Meta, StoryObj } from "@storybook/react";
import  { useState } from "react";
import StepperHeader from ".";

const meta: Meta<typeof StepperHeader> = {
  title: "Components/StepperHeader",
  component: StepperHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};


type Story = StoryObj<typeof StepperHeader>;

export default meta;

/**
 * Story Interaktif: Menunjukkan transisi antar langkah.
 * Perhatikan bagaimana step yang sudah dilewati otomatis berubah menjadi Checklist Hijau.
 */
function StepperInteractive() {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto space-y-12 p-8 bg-white rounded-xl shadow-sm border">
      <StepperHeader currentStep={currentStep}>
        <StepperHeader.Item step={1} label="Informasi Dasar" />
        <StepperHeader.Item step={2} label="Detail Properti" />
        <StepperHeader.Item step={3} label="Upload Dokumen" />
        <StepperHeader.Item step={4} label="Konfirmasi" />
      </StepperHeader>

      <div className="flex justify-center gap-3 pt-6 border-t">
        <button
          onClick={back}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Kembali
        </button>
        <button
          onClick={next}
          disabled={currentStep === 4}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-200"
        >
          {currentStep === 4 ? "Selesai" : `Lanjut ke Step ${currentStep + 1}`}
        </button>
      </div>
    </div>
  );
}

/**
 * 2. Gunakan komponen tersebut di dalam Story
 */
export const InteractiveFlow: Story = {
  render: () => <StepperInteractive />,
};

/**
 * Story: Skenario Settlement Perbankan.
 * Menggunakan string sebagai identifier step.
 */
export const BankingSettlement: StoryObj<typeof StepperHeader> = {
  render: () => {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <StepperHeader currentStep="PROCESSING">
          <StepperHeader.Item step="START" label="Inisiasi" />
          <StepperHeader.Item step="PROCESSING" label="Verifikasi" />
          <StepperHeader.Item step="SETTLED" label="Dana Cair" />
        </StepperHeader>
      </div>
    );
  },
};

/**
 * Story: Skenario Langkah Manufaktur WAFZ.
 * Menunjukkan tampilan saat hampir semua langkah selesai.
 */
export const ManufacturingProgress: StoryObj<typeof StepperHeader> = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <StepperHeader currentStep="QUALITY_CONTROL">
        <StepperHeader.Item step="CUTTING" label="Pemotongan" />
        <StepperHeader.Item step="SEWING" label="Penjahitan" />
        <StepperHeader.Item step="QUALITY_CONTROL" label="QC & Packing" />
        <StepperHeader.Item step="SHIPPING" label="Pengiriman" />
      </StepperHeader>
    </div>
  ),
};