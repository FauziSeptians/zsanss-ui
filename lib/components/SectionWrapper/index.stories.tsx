import type { Meta, StoryObj } from "@storybook/react";
import  SectionWrapper  from ".";

const meta: Meta<typeof SectionWrapper> = {
  title: "Components/SectionWrapper",
  component: SectionWrapper,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SectionWrapper>;

function LandingContrastDemo() {
  return (
    <div className="w-full">
      {/* 1. Konten Atas: Warna Putih */}
      <div className="h-[50vh] bg-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
          PREMIUM QUALITY
        </h1>
        <p className="text-gray-500 mt-2">Section atas dengan background putih bersih.</p>
      </div>

      {/* 2. Section Wrapper (Tengah) */}
      <SectionWrapper 
        topColor="from-white"      // Gradasi atas putih (match bg atas)
        bottomColor="from-black"   // Gradasi bawah hitam (match bg bawah)
        gradientHeight="h-60"      // Dibuat agak tinggi biar ekstra smooth
        className="bg-blue-600"    // Warna kontras di tengah (misal biru brand)
      >
        <div className="py-60 px-10 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">WAFZ Industrial Hub</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Section ini berada di tengah dengan transisi warna yang sangat halus 
              meskipun diapit oleh dua warna yang sangat kontras (Putih & Hitam).
            </p>
            <div className="mt-10 flex justify-center gap-4">
               <div className="w-20 h-1 bg-white/30 rounded-full" />
               <div className="w-20 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. Konten Bawah: Warna Hitam */}
      <div className="h-[70vh] bg-black flex flex-col items-center justify-center text-center px-4 text-white">
        <h2 className="text-3xl font-bold text-gray-400">FINISHING SECTION</h2>
        <p className="text-gray-600 mt-4 max-w-md">
          Section bawah dengan warna hitam pekat, menyatu sempurna dengan gradasi dari section tengah.
        </p>
      </div>
    </div>
  );
}

export const ContrastTransition: Story = {
  render: () => <LandingContrastDemo />,
};