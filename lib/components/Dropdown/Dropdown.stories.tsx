import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    item: {
      description: "Array of dropdown items",
      table: {
        type: { summary: "{ key: string; value: string }[]" },
        defaultValue: { summary: "[]" },
      },
    },
    valueLabel: {
      description: "Currently selected value",
      table: {
        type: { summary: "{ key: string; value: string } | null" },
        defaultValue: { summary: "null" },
      },
    },
    searchValue: {
      control: "text",
      description: "Current search string to highlight text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback when an item is clicked",
      table: {
        type: { summary: "(item) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleItems = [
  { key: "apple", value: "Apple" },
  { key: "banana", value: "Banana" },
  { key: "cherry", value: "Cherry" },
  { key: "date", value: "Date" },
];

export const Default: Story = {
  args: {
    item: sampleItems,
    valueLabel: { key: "apple", value: "Apple" },
    searchValue: "",
  },
};

export const WithSelected: Story = {
  args: {
    item: sampleItems,
    valueLabel: { key: "banana", value: "Banana" },
    searchValue: "",
  },
};

export const WithSearchHighlight: Story = {
  args: {
    item: sampleItems,
    valueLabel: { key: "apple", value: "Apple" },
    searchValue: "ap",
  },
};

export const Empty: Story = {
  args: {
    item: [],
    valueLabel: { key: "apple", value: "Apple" },
    searchValue: "",
  },
};
