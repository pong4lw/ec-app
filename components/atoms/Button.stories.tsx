import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Click Me",
  },
};
