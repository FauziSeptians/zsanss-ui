import type { Meta, StoryObj } from "@storybook/react";
import Card from "./index";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS classes for the Card container",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      description:
        "Content of the Card. Can include Card.Image, Card.Description, or custom nodes",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardDescriptionUsingTitle: Story = {
  render: () => (
    <Card>
      <Card.Description title="Only Title" bold />
    </Card>
  ),
};

export const CardDescriptionUsingTitleAndDescription: Story = {
  render: () => (
    <Card>
      <Card.Description
        title="Only Title"
        bold
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
    </Card>
  ),
};

export const CardUsingImage: Story = {
  render: () => (
    <Card>
      <Card.Image
        src="https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765"
        className="object-top"
      />
      <Card.Description
        title="Only Title"
        bold
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
    </Card>
  ),
};

export const CardDescriptionWithCustomChildren: Story = {
  render: () => (
    <Card>
      <Card.Description title="Custom Content" underline description="test">
        <p className="text-sm text-neutral-600">
          You can also pass children here for more flexible layouts.
        </p>
        <div className="mt-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
            Action
          </button>
        </div>
      </Card.Description>
    </Card>
  ),
};
