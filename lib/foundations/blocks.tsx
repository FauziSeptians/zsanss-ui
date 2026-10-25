import { useEffect, useState, type ReactNode } from "react";

/**
 * Helper khusus dokumentasi Storybook (Foundations).
 * Semua nilai dibaca LANGSUNG dari CSS variable di `lib/styles/theme.css`,
 * jadi halaman docs tidak pernah beda dengan token yang sebenarnya.
 */

function useCssVar(name: string): string {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
  }, [name]);
  return value;
}

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function copy(text: string) {
  try {
    void navigator.clipboard?.writeText(text);
  } catch {
    /* clipboard tidak tersedia di iframe tertentu — abaikan */
  }
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="sb-unstyled my-10 font-sans">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1 mb-4 max-w-3xl text-sm text-foreground-muted">{description}</p>
      ) : null}
      {children}
    </section>
  );
}

function Swatch({
  varName,
  label,
  className = "",
  textTone,
}: {
  varName: string;
  label: string;
  className?: string;
  textTone?: "light" | "dark";
}) {
  const hex = useCssVar(varName);
  return (
    <button
      type="button"
      onClick={() => copy(varName)}
      title={`Klik untuk menyalin ${varName}`}
      className={`group flex h-20 w-full cursor-copy flex-col justify-between rounded-md border border-border p-2 text-left text-xs transition-shadow hover:shadow-md ${className}`}
      style={{ backgroundColor: `var(${varName})` }}
    >
      <span
        className={`font-semibold ${textTone === "light" ? "text-white" : "text-neutral-900"}`}
      >
        {label}
      </span>
      <span
        className={`font-mono uppercase ${textTone === "light" ? "text-white/80" : "text-neutral-700"}`}
      >
        {hex}
      </span>
    </button>
  );
}

/** Satu skala warna penuh: 50 → 950. */
export function ColorScale({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <Section title={title} description={description}>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
        {SHADES.map((shade) => (
          <Swatch
            key={shade}
            varName={`--color-${name}-${shade}`}
            label={String(shade)}
            textTone={shade >= 500 ? "light" : "dark"}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-foreground-muted">
        Pakai: <code>bg-{name}-600</code>, <code>text-{name}-700</code>,{" "}
        <code>border-{name}-200</code>. Default (<code>bg-{name}</code>) ={" "}
        <code>--color-{name}</code>.
      </p>
    </Section>
  );
}

export type SemanticToken = {
  varName: string;
  utility: string;
  usage: string;
  dark?: boolean;
};

/** Tabel token semantik (surface, text, border). */
export function SemanticTable({ tokens }: { tokens: SemanticToken[] }) {
  return (
    <div className="sb-unstyled overflow-hidden rounded-lg border border-border font-sans">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-muted text-xs uppercase text-foreground-secondary">
          <tr>
            <th className="px-4 py-3">Preview</th>
            <th className="px-4 py-3">Class</th>
            <th className="px-4 py-3">Nilai</th>
            <th className="px-4 py-3">Kapan dipakai</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tokens.map((t) => (
            <SemanticRow key={t.varName} token={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SemanticRow({ token }: { token: SemanticToken }) {
  const value = useCssVar(token.varName);
  return (
    <tr>
      <td className="px-4 py-3">
        <span
          className="inline-block h-8 w-14 rounded border border-border"
          style={{ backgroundColor: `var(${token.varName})` }}
        />
      </td>
      <td className="px-4 py-3 font-mono text-xs text-foreground">{token.utility}</td>
      <td className="px-4 py-3 font-mono text-xs uppercase text-foreground-muted">{value}</td>
      <td className="px-4 py-3 text-foreground-secondary">{token.usage}</td>
    </tr>
  );
}

/** Contoh teks untuk satu skala tipografi. */
export function TypeRow({ token, sample }: { token: string; sample: string }) {
  const size = useCssVar(`--text-${token}`);
  const lineHeight = useCssVar(`--text-${token}--line-height`);
  return (
    <div className="sb-unstyled flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-6">
      <div className="w-40 shrink-0 font-mono text-xs text-foreground-muted">
        text-{token}
        <div>
          {size} / {lineHeight}
        </div>
      </div>
      <div style={{ fontSize: `var(--text-${token})`, lineHeight: `var(--text-${token}--line-height)` }}>
        {sample}
      </div>
    </div>
  );
}

export function FontFamilyCard({
  varName,
  label,
  children,
}: {
  varName: string;
  label: string;
  children: ReactNode;
}) {
  const value = useCssVar(varName);
  return (
    <div className="sb-unstyled rounded-lg border border-border p-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-foreground">{label}</span>
        <code className="text-xs text-foreground-muted">{varName}</code>
      </div>
      <div className="mt-3 text-foreground" style={{ fontFamily: `var(${varName})` }}>
        {children}
      </div>
      <p className="mt-3 truncate font-mono text-xs text-foreground-subtle" title={value}>
        {value}
      </p>
    </div>
  );
}

/** Kotak demo untuk radius / shadow. */
export function TokenBox({
  label,
  token,
  style,
  className = "",
}: {
  label: string;
  token: string;
  style: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className="sb-unstyled flex flex-col items-center gap-2">
      <div
        className={`h-20 w-20 border border-border bg-surface ${className}`}
        style={style}
      />
      <div className="text-center text-xs">
        <div className="font-semibold text-foreground">{label}</div>
        <div className="font-mono text-foreground-muted">{token}</div>
      </div>
    </div>
  );
}

/** Batang spacing: n × 4px. */
export function SpacingBar({ n }: { n: number }) {
  return (
    <div className="sb-unstyled flex items-center gap-4 py-1">
      <code className="w-16 shrink-0 text-xs text-foreground-muted">p-{n}</code>
      <div
        className="h-4 rounded-sm bg-primary-500"
        style={{ width: `calc(var(--spacing) * ${n})` }}
      />
      <span className="text-xs text-foreground-muted">{n * 4}px</span>
    </div>
  );
}
