import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Size of the spinner icon in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "32" },
      },
    },
    color: {
      control: { type: "color" },
      description: "Color of the spinner stroke",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "gray" },
      },
    },
    className: {
      control: "text",
      description: "Custom CSS classes for the spinner container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 32,
    color: "gray",
  },
};

export const Small: Story = {
  args: {
    size: 16,
    color: "gray",
  },
};

export const Large: Story = {
  args: {
    size: 64,
    color: "gray",
  },
};

export const Colored: Story = {
  args: {
    size: 48,
    color: "red",
  },
};

export const WithCustomClass: Story = {
  args: {
    size: 40,
    color: "blue",
    className: "bg-neutral-100 p-4 rounded-md",
  },
};
