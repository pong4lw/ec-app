"use client";

import { useCartStore } from "@/store/cart";

type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function AddToCartButton({ id, name, price, imageUrl }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => addItem({ id, name, price, imageUrl })}
    >
      カートに追加
    </button>
  );
}
