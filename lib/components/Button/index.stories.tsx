import { Button } from "@/main";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

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
         options: ["primary", "secondary", "accent", "bordered", "ghost", "danger", "link"],
         description: "The visual style variant of the button",
         table: {
            type: { summary: "string" },
            defaultValue: { summary: "primary" },
         },
      },
      radius: {
         control: { type: "select" },
         options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
         description: "Border radius size of the button",
         table: {
            type: { summary: "string" },
            defaultValue: { summary: "md" },
         },
      },
      size: {
         control: { type: "select" },
         options: ["sm", "md", "lg"],
         description: "Ukuran tombol (padding + font). Menggantikan `typeText`.",
         table: {
            type: { summary: "string" },
            defaultValue: { summary: "md" },
         },
      },
      fullWidth: {
         control: { type: "boolean" },
         description: "Lebar tombol 100% dari container",
         table: {
            type: { summary: "boolean" },
            defaultValue: { summary: "false" },
         },
      },
      leftIcon: {
         control: false,
         description: "Ikon di kiri label",
         table: { type: { summary: "ReactNode" } },
      },
      rightIcon: {
         control: false,
         description: "Ikon di kanan label",
         table: { type: { summary: "ReactNode" } },
      },
      typeText: {
         control: { type: "select" },
         options: ["small", "medium"],
         description: "[Deprecated] gunakan `size`. small = md, medium = lg.",
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

const VARIANTS = ["primary", "secondary", "accent", "bordered", "ghost", "danger", "link"] as const;

export const AllVariants: Story = {
   parameters: { layout: "padded" },
   args: { children: "Button" },
   render: () => (
      <div className="flex flex-wrap items-center gap-3">
         {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
               {variant}
            </Button>
         ))}
      </div>
   ),
};

export const AllVariantsDisabled: Story = {
   parameters: { layout: "padded" },
   args: { children: "Button" },
   render: () => (
      <div className="flex flex-wrap items-center gap-3">
         {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} isDisable>
               {variant}
            </Button>
         ))}
      </div>
   ),
};

export const Sizes: Story = {
   parameters: { layout: "padded" },
   args: { children: "Button" },
   render: () => (
      <div className="flex flex-wrap items-center gap-3">
         <Button size="sm">Small</Button>
         <Button size="md">Medium</Button>
         <Button size="lg">Large</Button>
      </div>
   ),
};

export const Radius: Story = {
   parameters: { layout: "padded" },
   args: { children: "Button" },
   render: () => (
      <div className="flex flex-wrap items-center gap-3">
         {(["none", "sm", "md", "lg", "xl", "2xl", "full"] as const).map((radius) => (
            <Button key={radius} radius={radius}>
               {radius}
            </Button>
         ))}
      </div>
   ),
};

export const WithIcons: Story = {
   parameters: { layout: "padded" },
   args: { children: "Button" },
   render: () => (
      <div className="flex flex-wrap items-center gap-3">
         <Button leftIcon={<Plus size={16} />}>Tambah data</Button>
         <Button variant="bordered" rightIcon={<ArrowRight size={16} />}>
            Lanjut
         </Button>
         <Button variant="danger" leftIcon={<Trash2 size={16} />}>
            Hapus
         </Button>
      </div>
   ),
};

export const LoadingEveryVariant: Story = {
   parameters: { layout: "padded" },
   args: { children: "Button" },
   render: () => (
      <div className="flex flex-wrap items-center gap-3">
         {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} isProcessing>
               {variant}
            </Button>
         ))}
      </div>
   ),
};

export const FullWidth: Story = {
   parameters: { layout: "padded" },
   args: { fullWidth: true, className: "", children: "Simpan perubahan" },
};
