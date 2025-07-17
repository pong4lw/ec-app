"use client";

import React from "react";
import { useCartStore } from "@/lib/firestore/cart";

export default function ProductDetailActions({ id, name, price, imageUrl }) {
  const { addToCart, removeFromCart, updateQuantity, items } = useCartStore();
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={() =>
          cartItem
            ? updateQuantity(id, quantity + 1)
            : addToCart({ id, name, price, imageUrl })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        ＋追加
      </button>

      <button
        onClick={() => {
          if (cartItem && quantity > 1) {
            updateQuantity(id, quantity - 1);
          } else {
            removeFromCart(id);
          }
        }}
        disabled={quantity === 0}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        −削除
      </button>

      <span className="text-lg">数量: {quantity}</span>
    </div>
  );
}
