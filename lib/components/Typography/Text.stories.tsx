import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Konten teks yang akan ditampilkan",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    type: {
      control: "text",
      description: "Tipe teks (misalnya body, caption, dsb sesuai constants)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    bold: {
      control: "boolean",
      description: "Menjadikan teks tebal",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    italic: {
      control: "boolean",
      description: "Menjadikan teks miring",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    underline: {
      control: "boolean",
      description: "Menambahkan garis bawah pada teks",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    highlightText: {
      control: "text",
      description: "Kata/frasa yang akan di-highlight di dalam teks",
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
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Ini adalah teks default",
  },
};

export const BoldItalicUnderline: Story = {
  args: {
    children: "Teks dengan gaya bold, italic, dan underline",
    bold: true,
    italic: true,
    underline: true,
  },
};

export const WithHighlight: Story = {
  args: {
    children: "Kata ini akan di-highlight jika cocok",
    highlightText: "highlight",
  },
};

export const CustomClass: Story = {
  args: {
    children: "Teks dengan custom class",
    className: "text-red-500",
  },
};
