import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { Form } from "@/main";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

/**
 * 1. Skema Validasi untuk Proyek Properti (sanss property)
 */
const propertySchema = z.object({
  title: z.string().min(5, "Judul iklan minimal 5 karakter"),
  price: z.string().regex(/^\d+$/, "Harga harus berupa angka"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter agar informatif"),
  location: z.string().min(1, "Lokasi wajib diisi"),
});

type PropertyType = z.infer<typeof propertySchema>;

export const PropertyListing: StoryObj<typeof Form> = {
  render: () => {
    const handleAction = () => {
      alert("Listing Berhasil Dibuat!");
    };

    return (
      <div className="w-[450px] p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Pasang Iklan</h2>
          <p className="text-sm text-gray-500">Lengkapi detail properti industrial Anda.</p>
        </div>

        <Form 
          schema={propertySchema} 
          onSubmit={handleAction} 
          className="space-y-5"
          options={{
            defaultValues: { title: "", price: "", description: "", location: "" }
          }}
        >
          <Form.Input<PropertyType> 
            name="title" 
            label="Judul Properti" 
            placeholder="Contoh: Gudang Modern di Bandung" 
          />
          
          <Form.Input<PropertyType> 
            name="price" 
            label="Harga (IDR)" 
            placeholder="Masukan angka saja" 
            helperText="Harga akan otomatis diformat di sistem"
          />

          <Form.Input<PropertyType> 
            name="location" 
            label="Lokasi" 
            placeholder="Kecamatan, Kota" 
          />

          <Form.TextArea<PropertyType> 
            name="description" 
            label="Deskripsi Lengkap" 
            placeholder="Jelaskan spesifikasi bangunan, luas tanah, dll..." 
            rows={5}
          />

          <button 
            type="submit" 
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            Publikasikan Iklan
          </button>
        </Form>
      </div>
    );
  },
};

/**
 * 2. Skema Validasi untuk Inquiry Manufaktur (WAFZ)
 * Menggunakan render props untuk akses state isSubmitting
 */
export const ManufacturingInquiry: StoryObj<typeof Form> = {
  render: () => {
    const inquirySchema = z.object({
      clientName: z.string().min(2, "Nama perusahaan/pribadi wajib diisi"),
      orderVolume: z.string().min(1, "Estimasi jumlah pesanan wajib diisi"),
      notes: z.string().optional(),
    });

    type InquiryType = z.infer<typeof inquirySchema>;

    return (
      <div className="w-[450px] p-8 bg-gray-50 border border-gray-200 rounded-2xl">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6">WAFZ Production Request</h2>
        
        <Form 
          schema={inquirySchema} 
          onSubmit={async () => {
            // Simulasi loading
            await new Promise(res => setTimeout(res, 2000))
          }} 
          className="space-y-4"
        >
          {({ formState: { isSubmitting } }) => (
            <>
              <Form.Input<InquiryType> 
                name="clientName" 
                label="Nama Klien" 
                placeholder="PT. Maju Bersama" 
              />
              
              <Form.Input<InquiryType> 
                name="orderVolume" 
                label="Jumlah Pesanan (Pcs)" 
                placeholder="1000" 
              />

              <Form.TextArea<InquiryType> 
                name="notes" 
                label="Catatan Tambahan (Opsional)" 
                placeholder="Spesifikasi bahan kain atau detail resleting..." 
              />

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 disabled:bg-blue-300 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : "Kirim Permintaan"}
              </button>
            </>
          )}
        </Form>
      </div>
    );
  },
};