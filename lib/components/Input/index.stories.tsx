import type { Meta, StoryObj } from "@storybook/react";
import InputWrapper from "./index";
import { VARIANT } from "@/constants/input";

const meta: Meta<typeof InputWrapper> = {
  title: "Components/Input",
  component: InputWrapper,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "text",
      description: "Type of the input element",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    label: {
      control: "text",
      description: "Label displayed above the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    placeHolder: {
      control: "text",
      description: "Placeholder text inside the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    value: {
      control: "text",
      description: "Initial value of the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    error: {
      control: "text",
      description: "Error message to display below the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    inputVariant: {
      control: "select",
      options: [VARIANT.FLAT, VARIANT.BORDERED, VARIANT.UNDERLINED],
      description: "Visual variant of the input",
      table: {
        type: { summary: "VARIANT" },
        defaultValue: { summary: "VARIANT.FLAT" },
      },
    },
    inputRadius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Border radius size of the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    className: {
      control: "text",
      description: "Custom CSS classes for the input element",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputWrapper>;

export const Flat: Story = {
  args: {
    type: "text",
    label: "Flat Input",
    placeHolder: "Enter text...",
    inputVariant: VARIANT.FLAT,
  },
};

export const Bordered: Story = {
  args: {
    type: "text",
    label: "Bordered Input",
    placeHolder: "Enter text...",
    inputVariant: VARIANT.BORDERED,
  },
};

export const Underlined: Story = {
  args: {
    type: "text",
    label: "Underlined Input",
    placeHolder: "Enter text...",
    inputVariant: VARIANT.UNDERLINED,
  },
};

export const WithError: Story = {
  args: {
    type: "text",
    label: "Input with Error",
    placeHolder: "Enter text...",
    inputVariant: VARIANT.BORDERED,
    error: "This field is required",
  },
};
