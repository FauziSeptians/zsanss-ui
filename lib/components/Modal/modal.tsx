import classNames from "@/utils/classNames";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import React from "react";

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
  /** Fungsi callback yang dipanggil saat modal diminta untuk ditutup (klik backdrop atau tekan ESC). */
  onClose: () => void;
  /** Konten yang akan dirender di dalam modal, biasanya diawali dengan Modal.Body. */
  children: React.ReactNode;
  /** Ukuran lebar modal. Default: "md". */
  size?: ModalSize;
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

/**
 * Sub-komponen Body yang berfungsi sebagai panel container utama modal.
 * Komponen ini menangani transisi, warna latar, dan efek bayangan (shadow).
 * * @example
 * <Modal.Body className="p-8"> ... </Modal.Body>
 */
export function ModalBody({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <DialogPanel
      className={classNames(
        "w-full transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all",
        className
      )}
    >
      {children}
    </DialogPanel>
  );
}

/**
 * Sub-komponen Header untuk menampilkan judul atau informasi di bagian atas modal.
 */
export function ModalHeader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mb-4 text-lg font-semibold leading-6 text-gray-900">
      {children}
    </div>
  );
}

/**
 * Sub-komponen Footer untuk meletakkan tombol aksi di bagian bawah modal.
 * Secara default menggunakan flexbox dengan gap.
 */
export function ModalFooter({
  children,
  className
}: Readonly<{ children: React.ReactNode, className?: string }>) {
  return <div className={classNames("mt-6 flex gap-3", className)}>{children}</div>;
}

/**
 * Komponen Utama Modal.
 * Mengintegrasikan Backdrop dan posisi tengah (center) secara otomatis.
 * Pastikan untuk menggunakan pola Compound Component: Modal.Body, Modal.Header, dll.
 * * @component
 * @example
 * ```tsx
 * <Modal isOpen={show} onClose={() => setShow(false)} size="lg">
 * <Modal.Body>
 * <Modal.Header>Konfirmasi Transaksi</Modal.Header>
 * <p>Apakah Anda yakin?</p>
 * <Modal.Footer>
 * <button onClick={onClose}>Batal</button>
 * </Modal.Footer>
 * </Modal.Body>
 * </Modal>
 * ```
 */
export function Modal({ isOpen, onClose, children, size = "md" }: ModalTypes) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 1. Backdrop overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity" />

      {/* 2. Full-screen container untuk centering */}
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* 3. Wrapper untuk kontrol ukuran */}
          <div className={classNames("w-full transition-all", sizeClasses[size])}>
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
}