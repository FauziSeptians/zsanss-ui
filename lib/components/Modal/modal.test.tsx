import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Modal from "./index";

function getViewport(): Element {
  const el = document.body.querySelector(".overflow-y-auto");
  if (!el) throw new Error("viewport modal tidak ditemukan");
  return el;
}

function Harness({
  closeOnBackdrop,
  showCloseButton,
  onCloseSpy,
}: {
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  onCloseSpy?: () => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button onClick={() => setOpen(true)}>buka</button>
      <Modal
        isOpen={open}
        onClose={() => {
          onCloseSpy?.();
          setOpen(false);
        }}
        closeOnBackdrop={closeOnBackdrop}
        showCloseButton={showCloseButton}
      >
        <Modal.Body>
          <Modal.Header>Konfirmasi Settlement</Modal.Header>
          <Modal.Description>Tindakan ini tidak dapat dibatalkan.</Modal.Description>
          <Modal.Footer>
            <button>Setujui</button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

describe("Modal (Base UI Dialog)", () => {
  it("tampil sebagai dialog dengan nama dari Modal.Header dan deskripsi", async () => {
    render(<Harness />);
    const dialog = await screen.findByRole("dialog", { name: "Konfirmasi Settlement" });
    expect(dialog).toHaveAccessibleDescription("Tindakan ini tidak dapat dibatalkan.");
  });

  it("tidak dirender saat isOpen=false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <Modal.Body>
          <Modal.Header>Tersembunyi</Modal.Header>
        </Modal.Body>
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("menutup dengan Escape dan memanggil onClose", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness onCloseSpy={spy} />);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    expect(spy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("showCloseButton: tombol Tutup menutup modal", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness showCloseButton onCloseSpy={spy} />);

    await user.click(await screen.findByRole("button", { name: "Tutup" }));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("tanpa showCloseButton tidak ada tombol Tutup", async () => {
    render(<Harness />);
    await screen.findByRole("dialog");
    expect(screen.queryByRole("button", { name: "Tutup" })).not.toBeInTheDocument();
  });

  it("klik backdrop menutup modal secara default", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness onCloseSpy={spy} />);
    await screen.findByRole("dialog");

    // Klik di luar panel: viewport (area gelap di sekeliling panel) berada di luar dialog.
    await user.click(getViewport());
    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  it("closeOnBackdrop=false: klik backdrop tidak menutup, Escape tetap menutup", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness closeOnBackdrop={false} onCloseSpy={spy} />);
    await screen.findByRole("dialog");

    await user.click(getViewport());
    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("memindahkan fokus ke dalam dialog saat terbuka", async () => {
    render(<Harness />);
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  });
});
