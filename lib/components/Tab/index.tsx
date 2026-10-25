import { COLOR, SIZE, VARIANT_TAB } from "@/constants/tab";
import { TabTypes } from "@/types/tab";
import { cn } from "@/utils/cn";
import { Tabs } from "@base-ui/react/tabs";
import { useState } from "react";
import Typography from "../Typography";

/**
 * `TabWrapper` — navigasi tab horizontal berbasis Base UI Tabs.
 *
 * Keyboard (panah kiri/kanan, Home, End), ARIA (`tablist`/`tab`/`tabpanel`),
 * dan tab disabled ditangani otomatis. Bisa uncontrolled (`defaultValue`) atau
 * controlled (`value` + `onValueChange`).
 *
 * @example
 * ```tsx
 * <TabWrapper
 *   item={[
 *     { key: "overview", value: "Overview" },
 *     { key: "details", value: "Details" },
 *     { key: "audit", value: "Audit", disabled: true },
 *   ]}
 *   variant="underline"
 *   onValueChange={(key) => setTab(key)}
 * >
 *   {(active) => <Content tab={active} />}
 * </TabWrapper>
 * ```
 *
 * @param props.item - Daftar tab `{ key, value, disabled? }`.
 * @param props.variant - `"default"`, `"underline"`, `"bordered"`.
 * @param props.radius - `"full"`, `"lg"` (default), `"md"`, `"sm"`.
 * @param props.highlightColor - `"primary"` (default), `"secondary"`, `"neutral"`.
 * @param props.value - Key tab aktif (controlled).
 * @param props.defaultValue - Key tab aktif awal (uncontrolled).
 * @param props.onValueChange - Dipanggil dengan key tab baru.
 * @param props.children - Konten di bawah tab; boleh fungsi `(activeKey) => node`.
 */
export default function TabWrapper({
  item,
  variant = VARIANT_TAB.DEFAULT,
  radius = SIZE.LG,
  highlightColor = COLOR.PRIMARY,
  children,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabTypes) {
  const firstEnabled = item.find((tab) => !tab.disabled)?.key ?? item[0]?.key ?? "";
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled);
  const active = value ?? internal;

  const isUnderline = variant === VARIANT_TAB.UNDERLINE;
  const color = (Object.values(COLOR) as string[]).includes(highlightColor)
    ? (highlightColor as COLOR)
    : COLOR.PRIMARY;

  const radiusClass = {
    [SIZE.FULL]: "rounded-full",
    [SIZE.MD]: "rounded-md",
    [SIZE.LG]: "rounded-lg",
    [SIZE.SM]: "rounded-sm",
  }[radius as SIZE] ?? "rounded-lg";

  const containerVariant = {
    [VARIANT_TAB.UNDERLINE]: "bg-surface",
    [VARIANT_TAB.DEFAULT]: "bg-neutral/10",
    [VARIANT_TAB.BORDERED]: "bg-surface border border-border",
  }[variant as VARIANT_TAB];

  // Pill (default & bordered): tab aktif terisi warna.
  const activePill = {
    [COLOR.PRIMARY]: "data-[active]:bg-primary data-[active]:text-primary-foreground",
    [COLOR.SECONDARY]: "data-[active]:bg-secondary data-[active]:text-secondary-foreground",
    [COLOR.NEUTRAL]: "data-[active]:bg-neutral data-[active]:text-white",
  }[color];

  // Underline: tab aktif berwarna + garis bawah.
  const activeUnderline = {
    [COLOR.PRIMARY]: "data-[active]:border-primary data-[active]:text-primary",
    [COLOR.SECONDARY]: "data-[active]:border-secondary data-[active]:text-secondary-700",
    [COLOR.NEUTRAL]: "data-[active]:border-neutral data-[active]:text-neutral",
  }[color];

  const hoverPill = {
    [COLOR.PRIMARY]: "hover:bg-primary-100",
    [COLOR.SECONDARY]: "hover:bg-secondary-100",
    [COLOR.NEUTRAL]: "hover:bg-neutral-200",
  }[color];

  return (
    <Tabs.Root
      value={active}
      onValueChange={(next) => {
        const key = String(next);
        setInternal(key);
        onValueChange?.(key);
      }}
    >
      <Tabs.List
        {...props}
        className={cn(
          "flex",
          !isUnderline && radiusClass,
          containerVariant,
          !isUnderline && "p-1",
          className,
        )}
      >
        {item.map((tab) => (
          <Tabs.Tab
            key={tab.key}
            value={tab.key}
            disabled={tab.disabled}
            className={cn(
              "flex w-full cursor-pointer items-center justify-center px-3 py-2 text-center text-foreground-secondary transition-all duration-300 ease-in-out",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              "data-[active]:font-semibold data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
              isUnderline
                ? cn("border-b border-border-strong", activeUnderline)
                : cn(radiusClass, hoverPill, activePill, "data-[active]:hover:brightness-95"),
            )}
          >
            <Typography.Text className="tracking-normal">{tab.value}</Typography.Text>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {children != null ? (
        <Tabs.Panel value={active} keepMounted={false} className="outline-none">
          {typeof children === "function" ? children(active) : children}
        </Tabs.Panel>
      ) : null}
    </Tabs.Root>
  );
}
