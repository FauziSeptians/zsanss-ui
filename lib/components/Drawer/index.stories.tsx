import type { Meta, StoryObj } from "@storybook/react";
import Drawer from "./index";
import { Button } from "@/main";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const BottomDefault: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Trigger asChild>
        <Button>Open Bottom Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Quick Actions</Drawer.Title>
          <Drawer.Description>Choose what you want to do next.</Drawer.Description>
        </Drawer.Header>
        <div className="p-4 grid grid-cols-2 gap-4">
          {["Send Money", "Request", "Bill Pay", "Top Up"].map((action) => (
            <button key={action} className="h-20 flex flex-col items-center justify-center border rounded-xl hover:bg-gray-50 transition-colors">
               <div className="w-8 h-8 bg-blue-100 rounded-full mb-2" />
               <span className="text-xs font-medium">{action}</span>
            </button>
          ))}
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="bordered" className="w-full">Dismiss</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
  args: {
    direction: "bottom",
  },
};

export const LeftNavigation: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Trigger asChild>
        <Button>Open Sidebar (Left)</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <div className="flex flex-col h-full">
          <Drawer.Header className="border-b">
            <Drawer.Title>Zsanss UI</Drawer.Title>
            <Drawer.Description>v1.1.3 Stable</Drawer.Description>
          </Drawer.Header>
          <div className="flex-1 p-4 space-y-1">
            {["Overview", "Components", "Templates", "Settings", "Documentation"].map((item) => (
              <button key={item} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">{item}</span>
              </button>
            ))}
          </div>
          <Drawer.Footer className="border-t">
            <div className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="flex-1">
                <p className="text-xs font-bold">Fauzi Septians</p>
                <p className="text-[10px] text-gray-500">Administrator</p>
              </div>
            </div>
          </Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
  args: {
    direction: "left",
  },
};

export const RightProfile: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Trigger asChild>
        <Button>View Profile (Right)</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header className="text-center sm:text-center border-b pb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-sm">
             <span className="text-2xl font-bold text-blue-600">FS</span>
          </div>
          <Drawer.Title>User Profile</Drawer.Title>
          <Drawer.Description>Manage your account settings.</Drawer.Description>
        </Drawer.Header>
        <div className="p-6 space-y-6">
          <section>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Personal Info</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Email</span><span>fauzi@example.com</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Phone</span><span>+62 812-3456-7890</span></div>
            </div>
          </section>
          <section>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Security</h4>
            <Button variant="bordered" className="w-full text-xs">Reset Password</Button>
          </section>
        </div>
        <Drawer.Footer className="border-t">
          <Button variant="primary" className="w-full">Save Changes</Button>
          <Drawer.Close asChild>
            <Button variant="bordered" className="w-full">Close</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
  args: {
    direction: "right",
  },
};

export const TopAlert: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Trigger asChild>
        <Button>System Alert (Top)</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <div className="bg-amber-50">
          <Drawer.Header>
            <div className="flex items-center gap-2 text-amber-700">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <Drawer.Title className="text-amber-700">Network Discovered</Drawer.Title>
            </div>
            <Drawer.Description className="text-amber-600/80">
              A new local network was found. Would you like to connect?
            </Drawer.Description>
          </Drawer.Header>
          <div className="p-4 pt-0 flex gap-3">
            <Button className="flex-1 bg-amber-600 hover:bg-amber-700 border-none text-white text-xs">Connect</Button>
            <Drawer.Close asChild>
              <Button variant="bordered" className="flex-1 text-xs border-amber-200 text-amber-700 hover:bg-amber-100">Ignore</Button>
            </Drawer.Close>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
  args: {
    direction: "top",
  },
};

export const ScrollableContent: Story = {
  render: (args) => (
    <Drawer {...args}>
      <Drawer.Trigger asChild>
        <Button>Scrollable Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header className="border-b">
          <Drawer.Title>Terms of Service</Drawer.Title>
          <Drawer.Description>Please read carefully before proceeding.</Drawer.Description>
        </Drawer.Header>
        <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-gray-600 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>
              <h5 className="font-bold text-gray-900 mb-2">Section {i + 1}. Details</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          ))}
        </div>
        <Drawer.Footer className="border-t">
          <Button className="w-full">Accept Terms</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
  args: {
    direction: "bottom",
  },
};
