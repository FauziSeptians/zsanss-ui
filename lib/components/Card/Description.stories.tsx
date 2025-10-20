import type { Meta, StoryObj } from "@storybook/react";
import Description from "./Description";

const meta: Meta<typeof Description> = {
  title: "Components/Description",
  component: Description,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text of the description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    description: {
      control: "text",
      description: "Body text of the description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    titleSize: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the title text",
      table: {
        type: { summary: `"small" | "medium" | "large"` },
        defaultValue: { summary: "medium" },
      },
    },
    italic: {
      control: "boolean",
      description: "Make the title italic",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    bold: {
      control: "boolean",
      description: "Make the title bold",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    underline: {
      control: "boolean",
      description: "Underline the title",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description: "Custom React nodes to render inside the description",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {
  args: {
    title: "Card Title",
    description: "This is a description text that explains the card content.",
    titleSize: "medium",
  },
};

export const WithFormatting: Story = {
  args: {
    title: "Formatted Title",
    description: "This description shows bold, italic, and underline options.",
    titleSize: "large",
    bold: true,
    italic: true,
    underline: true,
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <Description {...args}>
      <h4 className="text-blue-600">Custom Child Content</h4>
      <p className="text-sm text-gray-600">
        You can pass any React node as children instead of using `title` and `description`.
      </p>
    </Description>
  ),
};
