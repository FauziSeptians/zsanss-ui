import { Button } from "@/main";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

const meta = {
   title: "Components/Button",
   component: Button,
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
   argTypes: {
      variant: {
         control: { type: "select" },
         options: ["primary", "secondary", "bordered"],
         description: "The visual style variant of the button",
         table: {
            type: { summary: "string" },
            defaultValue: { summary: "primary" },
         },
      },
      radius: {
         control: { type: "select" },
         options: ["full", "2xl", "md"],
         description: "Border radius size of the button",
         table: {
            type: { summary: "string" },
            defaultValue: { summary: "full" },
         },
      },
      typeText: {
         control: { type: "select" },
         options: ["small", "medium"],
         description: "Text size of the button content",
         table: {
            type: { summary: "string" },
            defaultValue: { summary: "small" },
         },
      },
      children: {
         control: { type: "text" },
         description: "The content to be displayed inside the button",
         table: {
            type: { summary: "ReactNode" },
         },
      },
      isDisable: {
         control: { type: "boolean" },
         description: "Disables the button and prevents user interaction",
         table: {
            type: { summary: "boolean" },
            defaultValue: { summary: "false" },
         },
      },
      isProcessing: {
         control: { type: "boolean" },
         description: "Shows a loading spinner and disables the button during async operations",
         table: {
            type: { summary: "boolean" },
            defaultValue: { summary: "false" },
         },
      },
      className: {
         control: { type: "text" },
         description: "Additional CSS classes to customize the button styling",
         table: {
            type: { summary: "string" },
         },
      },
      onClick: {
         description: "Callback function triggered when the button is clicked",
         table: {
            type: { summary: "(event: MouseEvent) => void" },
         },
      },
   },
   args: { onClick: fn(), className: "w-64" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
   args: {
      variant: "primary",
      children: "Button",
   },
};

export const PrimaryFullRadius: Story = {
   args: {
      variant: "primary",
      children: "Button",
      radius: "full",
   },
};

export const Secondary: Story = {
   args: {
      variant: "secondary",
      children: "Button",
   },
};

export const Large: Story = {
   args: {
      variant: "bordered",
      children: "Button",
   },
};

export const ButtonLoading: Story = {
   args: {
      variant: "primary",
      children: "Button",
      isProcessing: true,
   },
};

export const ButtonDisabled: Story = {
   args: {
      variant: "primary",
      children: "Button",
      isDisable: true,
   },
};