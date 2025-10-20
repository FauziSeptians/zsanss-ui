import type { Meta, StoryObj } from "@storybook/react";
import Title from "./Title";

const meta: Meta<typeof Title> = {
  title: "Components/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Konten teks yang akan ditampilkan sebagai judul",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Ukuran teks judul",
      table: {
        type: { summary: `"small" | "medium" | "large"` },
        defaultValue: { summary: "medium" },
      },
    },
    bold: {
      control: "boolean",
      description: "Menjadikan judul tebal",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    italic: {
      control: "boolean",
      description: "Menjadikan judul miring",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    underline: {
      control: "boolean",
      description: "Menambahkan garis bawah pada judul",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    type: {
      control: "text",
      description: "Tipe teks (sesuai constants typograpgy)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: "text",
      description: "Kelas CSS tambahan",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Small: Story = {
  args: {
    children: "Judul Kecil",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Judul Sedang",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Judul Besar",
    size: "large",
  },
};

export const Styled: Story = {
  args: {
    children: "Judul dengan Bold, Italic, dan Underline",
    size: "large",
    bold: true,
    italic: true,
    underline: true,
  },
};
