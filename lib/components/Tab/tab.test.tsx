import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TabWrapper from "./index";

const ITEMS = [
  { key: "overview", value: "Overview" },
  { key: "details", value: "Details" },
  { key: "audit", value: "Audit", disabled: true },
  { key: "history", value: "History" },
];

describe("TabWrapper (Base UI Tabs)", () => {
  it("memakai role tablist/tab dan memilih tab pertama secara default", () => {
    render(<TabWrapper item={ITEMS} aria-label="Navigasi" />);
    expect(screen.getByRole("tablist", { name: "Navigasi" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
  });

  it("pindah tab dengan klik dan memanggil onValueChange dengan key", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<TabWrapper item={ITEMS} onValueChange={spy} />);

    await user.click(screen.getByRole("tab", { name: "Details" }));
    expect(spy).toHaveBeenCalledWith("details");
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "false");
  });

  it("keyboard: tab disabled bisa difokus tapi tidak terpilih, lalu lanjut ke tab berikutnya", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<TabWrapper item={ITEMS} onValueChange={spy} />);

    await user.click(screen.getByRole("tab", { name: "Details" }));
    spy.mockClear();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Audit" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Audit" })).toHaveAttribute("aria-selected", "false");
    expect(spy).not.toHaveBeenCalled();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "History" })).toHaveFocus();
  });

  it("tab disabled tidak bisa dipilih", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    render(<TabWrapper item={ITEMS} onValueChange={spy} />);

    await user.click(screen.getByRole("tab", { name: "Audit" }));
    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole("tab", { name: "Audit" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("tab", { name: "Audit" })).toHaveAttribute("aria-selected", "false");
  });

  it("controlled: mengikuti prop value", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [v, setV] = useState("history");
      return (
        <>
          <button onClick={() => setV("details")}>ke details</button>
          <TabWrapper item={ITEMS} value={v} onValueChange={setV} />
        </>
      );
    }
    render(<Controlled />);
    expect(screen.getByRole("tab", { name: "History" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("button", { name: "ke details" }));
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("aria-selected", "true");
  });

  it("defaultValue menentukan tab awal", () => {
    render(<TabWrapper item={ITEMS} defaultValue="details" />);
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("aria-selected", "true");
  });

  it("children berupa fungsi menerima key tab aktif dan dirender di tabpanel", async () => {
    const user = userEvent.setup();
    render(<TabWrapper item={ITEMS}>{(active) => <p>Konten {active}</p>}</TabWrapper>);

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Konten overview");
    await user.click(screen.getByRole("tab", { name: "Details" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Konten details");
  });

  it("children biasa (API lama) tetap dirender", () => {
    render(
      <TabWrapper item={ITEMS}>
        <p>Isi statis</p>
      </TabWrapper>,
    );
    expect(screen.getByText("Isi statis")).toBeInTheDocument();
  });

  it("variant underline & highlightColor tak dikenal tidak error", () => {
    render(<TabWrapper item={ITEMS} variant="underline" highlightColor="#ff0000" />);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
  });
});
