import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Select from "./index";

type User = { id: number; name: string };

const USERS: User[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
];

function Harness({
  initial = null,
  disabled,
  clearable,
  error,
  onChangeSpy,
}: {
  initial?: User | null;
  disabled?: boolean;
  clearable?: boolean;
  error?: boolean;
  onChangeSpy?: (u: User | null) => void;
}) {
  const [selected, setSelected] = useState<User | null>(initial);
  const [query, setQuery] = useState("");
  const data = USERS.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <Select
      value={selected}
      onChange={(u) => {
        setSelected(u);
        onChangeSpy?.(u);
      }}
      setQuery={setQuery}
      items={data}
      disabled={disabled}
      error={error}
      isItemEqualToValue={(a, b) => a.id === b.id}
    >
      <Select.Input
        aria-label="Pilih user"
        clearable={clearable}
        placeholder="Pilih nama..."
        displayValue={(u: User) => u?.name ?? ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Select.List emptyText="Tidak ditemukan">
        {data.map((u) => (
          <Select.Option key={u.id} item={u} label={u.name} />
        ))}
      </Select.List>
    </Select>
  );
}

describe("Select (Base UI Combobox)", () => {
  it("menampilkan placeholder dan input dengan role combobox", () => {
    render(<Harness />);
    const input = screen.getByRole("combobox", { name: "Pilih user" });
    expect(input).toHaveAttribute("placeholder", "Pilih nama...");
  });

  it("membuka daftar dan memilih opsi dengan klik", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness onChangeSpy={spy} />);

    await user.click(screen.getByRole("combobox", { name: "Pilih user" }));
    expect(await screen.findAllByRole("option")).toHaveLength(3);

    await user.click(screen.getByRole("option", { name: "Bob Smith" }));
    expect(spy).toHaveBeenLastCalledWith(USERS[1]);
    expect(screen.getByRole("combobox", { name: "Pilih user" })).toHaveValue("Bob Smith");
  });

  it("menyaring opsi lewat setQuery dan menampilkan teks kosong", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByRole("combobox", { name: "Pilih user" });
    await user.click(input);
    await user.type(input, "char");

    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
    expect(screen.getByRole("option", { name: "Charlie Brown" })).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "zzz");
    expect(await screen.findByText("Tidak ditemukan")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("bisa dipilih dengan keyboard (panah + Enter)", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness onChangeSpy={spy} />);

    const input = screen.getByRole("combobox", { name: "Pilih user" });
    await user.click(input);
    await screen.findAllByRole("option");
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatchObject({ id: expect.any(Number) });
  });

  it("menutup daftar dengan Escape", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("combobox", { name: "Pilih user" }));
    await screen.findAllByRole("option");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryAllByRole("option")).toHaveLength(0));
  });

  it("menampilkan nilai awal lewat displayValue", () => {
    render(<Harness initial={USERS[2]} />);
    expect(screen.getByRole("combobox", { name: "Pilih user" })).toHaveValue("Charlie Brown");
  });

  it("clearable: tombol hapus mengosongkan pilihan", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<Harness initial={USERS[0]} clearable onChangeSpy={spy} />);

    await user.click(screen.getByRole("button", { name: "Hapus pilihan" }));
    expect(spy).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("combobox", { name: "Pilih user" })).toHaveValue("");
  });

  it("disabled: tidak bisa dibuka", async () => {
    const user = userEvent.setup();
    render(<Harness disabled />);

    const input = screen.getByRole("combobox", { name: "Pilih user" });
    expect(input).toBeDisabled();
    await user.click(input);
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("error: menandai input sebagai invalid", () => {
    render(<Harness error />);
    expect(screen.getByRole("combobox", { name: "Pilih user" })).toHaveAttribute("aria-invalid", "true");
  });

  it("melempar error jelas bila sub-komponen dipakai di luar <Select />", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Select.Input />)).toThrow(/di dalam <Select \/>/);
    spy.mockRestore();
  });
});
