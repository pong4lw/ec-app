"use client";
import React from "react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { Product } from "@/lib/firestore/products";

type Props = {
  products: Product[];
  getQuantity: (id: string) => number;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

export const CartList = ({
  products,
  getQuantity,
  onChangeQuantity,
  onRemove,
}: Props) => {
  const total = products.reduce(
    (sum, p) => sum + (p.price || 0) * getQuantity(p.id),
    0,
  );

  if (products.length === 0) {
    return <p className="text-gray-500">カートに商品が入っていません。</p>;
  }

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          quantity={getQuantity(product.id)}
          onIncrease={() => onChangeQuantity(product.id, 1)}
          onDecrease={() => onChangeQuantity(product.id, -1)}
          onRemove={() => onRemove(product.id)}
        />
      ))}
      <CartSummary total={total} />
    </div>
  );
};
