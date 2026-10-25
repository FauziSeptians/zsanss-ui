import React, { createContext, useContext } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Pilihan ukuran lebar maksimal untuk Modal.
 */
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Properti utama untuk komponen Modal.
 */
export type ModalTypes = Readonly<{
  /** Menentukan apakah modal sedang terbuka atau tertutup. */
  isOpen: boolean;
  /** Dipanggil saat modal diminta ditutup (klik backdrop, tekan ESC, atau tombol X). */
  onClose: () => void;
  /** Konten modal, biasanya diawali dengan Modal.Body. */
  children: React.ReactNode;
  /** Ukuran lebar modal. Default: "md". */
  size?: ModalSize;
  /** Tutup saat klik di luar panel. Default: true. Set false untuk form yang tidak boleh hilang tak sengaja. */
  closeOnBackdrop?: boolean;
  /** Tampilkan tombol X di pojok kanan atas Modal.Body. Default: false. */
  showCloseButton?: boolean;
}>;

/**
 * Mapping utilitas untuk lebar modal berdasarkan props size.
 */
const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full m-4",
};

type ModalContextValue = { onClose: () => void; showCloseButton: boolean };
const ModalContext = createContext<ModalContextValue | null>(null);

/**
 * Sub-komponen Body: panel utama modal (transisi, latar, bayangan, focus trap).
 *
 * @example
 * <Modal.Body className="p-8"> ... </Modal.Body>
 */
export function ModalBody({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  const ctx = useContext(ModalContext);

  return (
    <Dialog.Popup
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-surface p-6 text-left align-middle shadow-xl outline-none",
        "transition duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className,
      )}
    >
      {ctx?.showCloseButton ? (
        <Dialog.Close
          aria-label="Tutup"
          className="absolute right-3 top-3 rounded-md p-1 text-foreground-subtle transition-colors hover:bg-surface-subtle hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Dialog.Close>
      ) : null}
      {children}
    </Dialog.Popup>
  );
}

/**
 * Sub-komponen Header: judul modal. Dirender sebagai judul dialog
 * sehingga screen reader membacakannya sebagai nama modal.
 */
export function ModalHeader({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <Dialog.Title
      className={cn("mb-4 text-lg font-semibold leading-6 text-foreground", className)}
    >
      {children}
    </Dialog.Title>
  );
}

/**
 * Sub-komponen Description: teks penjelasan, dibacakan screen reader sebagai deskripsi modal.
 */
export function ModalDescription({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <Dialog.Description className={cn("text-sm text-foreground-muted", className)}>
      {children}
    </Dialog.Description>
  );
}

/**
 * Sub-komponen Footer untuk meletakkan tombol aksi di bagian bawah modal.
 */
export function ModalFooter({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <div className={cn("mt-6 flex gap-3", className)}>{children}</div>;
}

/**
 * Komponen utama Modal, dibangun di atas Base UI Dialog: focus trap, kunci scroll,
 * ESC untuk menutup, dan atribut ARIA diurus otomatis.
 *
 * @component
 * @example
 * ```tsx
 * <Modal isOpen={show} onClose={() => setShow(false)} size="lg" showCloseButton>
 *   <Modal.Body>
 *     <Modal.Header>Konfirmasi Transaksi</Modal.Header>
 *     <Modal.Description>Apakah Anda yakin?</Modal.Description>
 *     <Modal.Footer>
 *       <Button variant="bordered" onClick={onClose}>Batal</Button>
 *     </Modal.Footer>
 *   </Modal.Body>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnBackdrop = true,
  showCloseButton = false,
}: ModalTypes) {
  return (
    <ModalContext.Provider value={{ onClose, showCloseButton }}>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        disablePointerDismissal={!closeOnBackdrop}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-overlay transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
          <Dialog.Viewport className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className={cn("w-full", sizeClasses[size])}>{children}</div>
            </div>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContext.Provider>
  );
}
