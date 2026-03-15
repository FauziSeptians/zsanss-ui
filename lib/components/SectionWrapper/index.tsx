import React from "react";
import classNames from "@/utils/classNames";

interface SectionWrapperProps {
  children: React.ReactNode;
  /** Warna gradasi atas (mengikuti bg sebelumnya) */
  topColor?: string;
  /** Warna gradasi bawah (mengikuti bg sesudahnya) */
  bottomColor?: string;
  /** Tinggi gradasi */
  gradientHeight?: string;
  /** Background utama section tengah */
  className?: string;
}

/**
 * Wrapper untuk transisi warna antar section yang berbeda.
 * Memungkinkan gradasi atas putih dan gradasi bawah hitam secara bersamaan.
 */
export default function SectionWrapper({
  children,
  topColor = "from-white",
  bottomColor = "from-black",
  gradientHeight = "h-40",
  className,
}: SectionWrapperProps) {
  return (
    <section className={classNames("relative overflow-hidden", className)}>
      {/* Top Gradient - Transisi dari Putih (atau bg atas) */}
      <div
        className={classNames(
          "absolute top-0 left-0 right-0 z-10 pointer-events-none bg-gradient-to-b to-transparent",
          topColor,
          gradientHeight
        )}
      />

      {/* Main Content */}
      <div className="relative z-0">{children}</div>

      {/* Bottom Gradient - Transisi ke Hitam (atau bg bawah) */}
      <div
        className={classNames(
          "absolute bottom-0 left-0 right-0 z-10 pointer-events-none bg-gradient-to-t to-transparent",
          bottomColor,
          gradientHeight
        )}
      />
    </section>
  );
}