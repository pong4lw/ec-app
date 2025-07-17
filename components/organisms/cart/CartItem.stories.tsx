import { Meta, StoryObj } from "@storybook/react";
import { CartItem } from "./CartItem";

const meta: Meta<typeof CartItem> = {
  title: "Pages/Cart/CartItem",
  component: CartItem,
  argTypes: {
    onIncrease: { action: "increase" },
    onDecrease: { action: "decrease" },
    onRemove: { action: "remove" },
  },
};

export default meta;

type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    product: {
      id: "1",
      name: "サンプル商品",
      price: 1200,
      imageUrl: "/no-image.webp",
    },
    quantity: 2,
  },
};
