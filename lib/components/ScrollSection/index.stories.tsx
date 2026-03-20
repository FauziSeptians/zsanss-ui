import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ScrollStepContent from ".";

const meta: Meta<typeof ScrollStepContent> = {
  title: "Components/ScrollStepContent",
  component: ScrollStepContent,
   tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollStepContent>;

/**
 * Komponen pembungkus untuk memberikan ruang scroll
 */
const ScrollDecorator = ({ children }: { children: React.ReactNode }) => (
  <div>
    <div className="h-[50vh] flex items-center justify-center bg-gray-100 border-b">
      <p className="text-gray-400 animate-bounce">Scroll Down to Start Experience ↓</p>
    </div>
    {children}
    <div className="h-[50vh] flex items-center justify-center bg-gray-900 text-white">
      <p>End of Section</p>
    </div>
  </div>
);

/**
 * Story: Fitur Produk (Contoh: Katalog Tas WAFZ)
 */
export const ProductFeatures: Story = {
  render: (args) => (
    <ScrollDecorator>
      <ScrollStepContent {...args} />
    </ScrollDecorator>
  ),
  args: {
    height: 100,
    contents: [
      <div key={1} className="max-w-2xl text-center space-y-4">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-blue-100 text-blue-600 rounded-full">
          Material
        </span>
        <h2 className="text-5xl font-black text-gray-900">Cordura 1000D</h2>
        <p className="text-xl text-gray-500 leading-relaxed">
          Dibuat dengan serat sintetis nilon premium yang tahan terhadap abrasi, sobekan, dan lecet. Standar kekuatan industrial.
        </p>
      </div>,
      <div key={2} className="max-w-2xl text-center space-y-4">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-green-100 text-green-600 rounded-full">
          Protection
        </span>
        <h2 className="text-5xl font-black text-gray-900">YKK AquaGuard</h2>
        <p className="text-xl text-gray-500 leading-relaxed">
          Resleting berlapis PU yang menahan elemen cuaca. Menjaga barang bawaan Anda tetap kering di kondisi ekstrem.
        </p>
      </div>,
      <div key={3} className="max-w-2xl text-center space-y-4">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-purple-100 text-purple-600 rounded-full">
          Design
        </span>
        <h2 className="text-5xl font-black text-gray-900">Modular System</h2>
        <p className="text-xl text-gray-500 leading-relaxed">
          Kompartemen cerdas yang dapat disesuaikan dengan kebutuhan harian Anda, mulai dari kantor hingga perjalanan luar ruangan.
        </p>
      </div>,
    ],
  },
};

/**
 * Story: Proses Settlement (H+1 Banking Flow)
 */
export const BankingProcess: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args : any) => (
    <ScrollDecorator>
      <div className="bg-blue-50">
        <ScrollStepContent {...args} />
      </div>
    </ScrollDecorator>
  ),
  args: {
    height: 120, // Lebih tinggi agar scroll terasa lebih 'berat' dan fokus
    contents: [
      <div key="step-1" className="bg-white p-12 rounded-3xl shadow-xl border max-w-lg">
        <div className="text-4xl mb-4">💳</div>
        <h3 className="text-2xl font-bold mb-2">1. Inisiasi Transaksi</h3>
        <p className="text-gray-600">Pelanggan melakukan pembayaran via QRIS atau Transfer Bank.</p>
      </div>,
      <div key="step-2" className="bg-white p-12 rounded-3xl shadow-xl border max-w-lg">
        <div className="text-4xl mb-4">⚙️</div>
        <h3 className="text-2xl font-bold mb-2">2. Verifikasi Sistem</h3>
        <p className="text-gray-600">Sistem perbankan melakukan pengecekan validitas dan fraud detection.</p>
      </div>,
      <div key="step-3" className="bg-white p-12 rounded-3xl shadow-xl border max-w-lg">
        <div className="text-4xl mb-4">💰</div>
        <h3 className="text-2xl font-bold mb-2">3. Pencairan H+1</h3>
        <p className="text-gray-600">Dana diteruskan ke rekening merchant pada hari kerja berikutnya.</p>
      </div>,
    ],
  },
};