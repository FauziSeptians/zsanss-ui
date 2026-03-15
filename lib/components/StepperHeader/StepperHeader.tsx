import React from "react";
import { Check, ChevronRight } from "lucide-react";
import classNames from "@/utils/classNames";

// --- Types ---

interface StepperItemProps {
  /** Identifier unik untuk step ini */
  step: string | number;
  /** Label yang ditampilkan */
  label: string;
  /** @internal Index yang dipassing otomatis oleh Parent */
  index?: number;
  /** @internal Status aktif yang dipassing otomatis oleh Parent */
  isActive?: boolean;
  /** @internal Status selesai yang dipassing otomatis oleh Parent */
  isCompleted?: boolean;
}

interface StepperHeaderProps {
  /** Step yang sedang aktif saat ini */
  currentStep: string | number;
  /** Kumpulan StepperHeader.Item */
  children: React.ReactNode;
  /** Class CSS tambahan untuk container utama */
  className?: string;
}

// --- Components ---

/**
 * Sub-komponen untuk merepresentasikan satu langkah di Header.
 */
export function StepperItem({ label, index = 0, isActive, isCompleted }: StepperItemProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Circle Indicator */}
      <div
        className={classNames(
          "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
          isCompleted
            ? "bg-green-500 border-green-500 text-white"
            : isActive
            ? "border-blue-600 text-blue-600 font-bold shadow-sm shadow-blue-100"
            : "border-gray-300 text-gray-400"
        )}
      >
        {isCompleted ? (
          <Check size={16} strokeWidth={3} />
        ) : (
          <span className="text-sm">{index + 1}</span>
        )}
      </div>

      {/* Label */}
      <span
        className={classNames(
          "text-sm font-medium transition-colors duration-300 whitespace-nowrap",
          isActive ? "text-blue-600" : isCompleted ? "text-gray-900" : "text-gray-400"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Komponen Utama StepperHeader.
 * Mengelola urutan dan logika visual secara otomatis.
 */
export default function StepperHeaderRoot({ currentStep, children, className }: StepperHeaderProps) {
  const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
  
  // Mencari index dari currentStep berdasarkan props 'step' di children
  const currentIndex = childrenArray.findIndex(
    (child) => (child.props as StepperItemProps).step === currentStep
  );

  return (
    <nav className={classNames("flex items-center w-full", className)}>
      {childrenArray.map((child, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        const isLast = index === childrenArray.length - 1;

        return (
          <React.Fragment key={index}>
            {/* Clone element untuk menyisipkan props internal */}
            {React.cloneElement(child as React.ReactElement<StepperItemProps>, {
              index,
              isActive,
              isCompleted,
            })}

            {/* Separator > otomatis kecuali di akhir */}
            {!isLast && (
              <div className="flex-1 flex justify-center text-gray-300 mx-4">
                <ChevronRight size={20} strokeWidth={1.5} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}