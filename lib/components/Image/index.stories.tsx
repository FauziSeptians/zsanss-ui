import type { Meta, StoryObj } from "@storybook/react";
import Image from "./index";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Source URL of the image",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Image" },
      },
    },
    caption: {
      control: "text",
      description: "Optional caption displayed at the bottom of the image",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    fallbackSrc: {
      control: "text",
      description:
        "Optional fallback image source if the main image fails to load",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: "text",
      description: "Custom CSS classes for the container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/400x200",
    alt: "Placeholder Image",
  },
};

export const WithCaption: Story = {
  args: {
    src: "https://via.placeholder.com/400x200",
    alt: "Placeholder with caption",
    caption: "This is a sample caption",
  },
};

export const BrokenImage: Story = {
  args: {
    src: undefined,
    alt: "Broken image example",
  },
};

export const ImagePict: Story = {
  args: {
    src: "https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765",
    alt: "Broken image example",
    width: 400,
    height: 400,
  },
};
