import type { Meta, StoryObj } from "@storybook/react";
import Search from "./Search";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  argTypes: {
    placeHolder: {
      control: "text",
      description: "Placeholder text for the search input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Search.." },
      },
    },
    searchValue: {
      control: "text",
      description: "Current search value",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    setSearch: {
      action: "setSearch",
      description: "Callback to update search value",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    placeHolder: "Search fruits...",
    searchValue: "",
  },
};

export const WithInitialValue: Story = {
  args: {
    placeHolder: "Search fruits...",
    searchValue: "apple",
  },
};

export const ReadOnly: Story = {
  args: {
    placeHolder: "Read-only search",
    searchValue: "banana",
    readOnly: true,
  },
};
