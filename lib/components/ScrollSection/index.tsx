import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/**
 * Properti untuk komponen ScrollStepContent.
 */
interface ScrollStepContentProps {
  /** * Array berisi elemen React yang akan ditampilkan satu per satu.
   * Urutan item dalam array menentukan urutan kemunculan saat di-scroll.
   */
  contents: React.ReactNode[];
  /** * Tinggi per item dalam unit Viewport Height (vh). 
   * Semakin besar nilainya, semakin lama pengguna harus men-scroll untuk berganti konten (sensitivitas).
   * @default 100
   */
  height?: number;
}

/**
 * Komponen untuk menampilkan konten secara bergantian berdasarkan posisi scroll (Scroll-Triggered Switching).
 * * Mekanisme:
 * 1. Menggunakan `sticky` agar konten tetap berada di layar sementara pengguna melakukan scroll.
 * 2. Menghitung `scrollYProgress` untuk menentukan index mana yang harus aktif.
 * 3. Memberikan efek transisi halus (opacity, y-axis, dan scale) antar perpindahan konten.
 * * Cocok digunakan untuk:
 * - Menampilkan fitur utama produk (misal: spesifikasi tas industrial).
 * - Storytelling atau alur layanan (misal: proses settlement perbankan).
 * - Presentasi visual yang membutuhkan fokus per section.
 * * @component
 * @example
 * ```tsx
 * const steps = [
 * <div key="1">Step 1: Research</div>,
 * <div key="2">Step 2: Design</div>,
 * <div key="3">Step 3: Build</div>
 * ];
 * * <ScrollStepContent contents={steps} height={120} />
 * ```
 */
export default function ScrollStepContent({ contents, height = 100 }: ScrollStepContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  /**
   * Mengambil progres scroll dari 0 ke 1 berdasarkan posisi container terhadap viewport.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /**
   * Memetakan progres angka (0 - 1) menjadi index array konten.
   */
  const contentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, contents.length - 1]
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  /**
   * Listener untuk mendeteksi perubahan index hasil kalkulasi scroll.
   */
  useMotionValueEvent(contentIndex, "change", (latest: number) => {
    setActiveIndex(Math.round(latest));
  });

  return (
    /** * Container Utama:
     * Tinggi dihitung dari (jumlah konten * height vh) untuk menciptakan 'ruang' scroll.
     */
    <div 
      ref={containerRef} 
      style={{ height: `${contents.length * height}vh` }} 
      className="relative"
    >
      {/* Sticky Container: 
        Menjaga konten tetap di viewport (fixed-like) saat proses scroll berlangsung. 
      */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {contents.map((content, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: activeIndex === index ? 1 : 0,
              y: activeIndex === index ? 0 : -20,
              scale: activeIndex === index ? 1 : 0.95
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ pointerEvents: activeIndex === index ? "auto" : "none" }}
          >
            {content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}