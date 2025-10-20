import type { Meta, StoryObj } from "@storybook/react";
import TabWrapper from "./index";
import { COLOR, SIZE, VARIANT_TAB } from "@/constants/tab";

const meta: Meta<typeof TabWrapper> = {
  title: "Components/Tab",
  component: TabWrapper,
  tags: ["autodocs"],
  argTypes: {
    item: {
      description: "Array of tab items with key and value",
      table: {
        type: { summary: "{ key: string; value: string }[]" },
        defaultValue: { summary: "[]" },
      },
    },
    variant: {
      control: "select",
      options: Object.values(VARIANT_TAB),
      description: "Visual variant of the tab",
      table: {
        type: { summary: "VARIANT_TAB" },
        defaultValue: { summary: "VARIANT_TAB.DEFAULT" },
      },
    },
    radius: {
      control: "select",
      options: Object.values(SIZE),
      description: "Border radius of the tab buttons",
      table: {
        type: { summary: "SIZE" },
        defaultValue: { summary: "SIZE.LG" },
      },
    },
    highlightColor: {
      control: "select",
      options: Object.values(COLOR),
      description: "Highlight color for the active tab",
      table: {
        type: { summary: "COLOR" },
        defaultValue: { summary: "COLOR.PRIMARY" },
      },
    },
    children: {
      description: "Optional content rendered below the tabs",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabWrapper>;

const sampleTabs = [
  { key: "tab1", value: "Tab One" },
  { key: "tab2", value: "Tab Two" },
  { key: "tab3", value: "Tab Three" },
];

export const Default: Story = {
  args: {
    item: sampleTabs,
    variant: VARIANT_TAB.DEFAULT,
    radius: SIZE.LG,
    highlightColor: COLOR.PRIMARY,
  },
};

export const Underline: Story = {
  args: {
    item: sampleTabs,
    variant: VARIANT_TAB.UNDERLINE,
    highlightColor: COLOR.SECONDARY,
  },
};

export const Bordered: Story = {
  args: {
    item: sampleTabs,
    variant: VARIANT_TAB.BORDERED,
    radius: SIZE.MD,
    highlightColor: COLOR.NEUTRAL,
  },
};

export const WithChildren: Story = {
  args: {
    item: sampleTabs,
    variant: VARIANT_TAB.DEFAULT,
    children: (
      <div className="mt-4 p-4 border rounded-md">
        <p>Content below the tabs</p>
      </div>
    ),
  },
};
