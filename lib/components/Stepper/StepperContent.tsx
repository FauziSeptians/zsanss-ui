import React from "react";

/**
 * Properti untuk masing-masing Step Item.
 */
interface StepperItemProps {
  /** Identifier unik untuk langkah ini, bisa berupa string atau number. */
  step: string | number;
  /** Konten yang akan ditampilkan jika langkah ini aktif. */
  children: React.ReactNode;
}

/**
 * Properti utama untuk komponen StepperContent.
 */
interface StepperContentProps {
  /** Nilai langkah yang sedang aktif saat ini. */
  currentStep: string | number;
  /** Kumpulan komponen StepperContent.Item. */
  children: React.ReactNode;
}

/**
 * Komponen Item untuk mendefinisikan konten pada langkah tertentu.
 * Komponen ini hanya berfungsi sebagai wrapper data untuk Parent-nya.
 */
export function StepperItem({ children }: StepperItemProps) {
  return <>{children}</>;
}

/**
 * Komponen Utama StepperContent.
 * Menangani logika penampilan konten berdasarkan currentStep secara deklaratif.
 * * @example
 * ```tsx
 * <StepperContent currentStep={activeStep}>
 * <StepperContent.Item step="IDENTITY">
 * <IdentityForm />
 * </StepperContent.Item>
 * <StepperContent.Item step="ADDRESS">
 * <AddressForm />
 * </StepperContent.Item>
 * </StepperContent>
 * ```
 */
export function StepperContent({ currentStep, children }: StepperContentProps) {
  // Mencari anak (children) yang memiliki props 'step' yang sama dengan 'currentStep'
  const activeContent = React.Children.toArray(children).find((child) => {
    if (React.isValidElement<StepperItemProps>(child)) {
      return child.props.step === currentStep;
    }
    return false;
  });

  return <>{activeContent || null}</>;
}
