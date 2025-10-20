import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./index";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Typography>;

// --- Stories untuk wrapper Typography ---
export const WrapperPrimary: Story = {
  args: {
    children: "This is Typography wrapper with primary variant",
    variant: "primary",
  },
};

export const WrapperSecondary: Story = {
  args: {
    children: "This is Typography wrapper with secondary variant",
    variant: "secondary",
  },
};

export const WrapperMuted: Story = {
  args: {
    children: "This is Typography wrapper with muted variant",
    variant: "muted",
  },
};

// --- Stories untuk Typography.Text ---
export const TextDefault: Story = {
  render: () => <Typography.Text>Default text</Typography.Text>,
};

export const TextWithHighlight: Story = {
  render: () => (
    <Typography.Text highlightText="ipsum">
      Lorem ipsum dolor sit amet
    </Typography.Text>
  ),
};

export const TextStyled: Story = {
  render: () => (
    <Typography.Text bold italic underline>
      Bold, italic, and underlined text
    </Typography.Text>
  ),
};

// --- Stories untuk Typography.Title ---
export const TitleSmall: Story = {
  render: () => <Typography.Title size="small">Small Title</Typography.Title>,
};

export const TitleMedium: Story = {
  render: () => <Typography.Title size="medium">Medium Title</Typography.Title>,
};

export const TitleLarge: Story = {
  render: () => <Typography.Title size="large">Large Title</Typography.Title>,
};

export const TitleStyled: Story = {
  render: () => (
    <Typography.Title size="large" bold italic underline>
      Styled Large Title
    </Typography.Title>
  ),
};
