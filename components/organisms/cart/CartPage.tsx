"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/firestore/cart";
import { getProductById, Product } from "@/lib/firestore/products";
import { useInitCartSync } from "@/lib/firestore/cartSync";
import { CartList } from "@/components/organisms/cart/CartList";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useInitCartSync(); // Firestore同期

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const prods: Product[] = [];
      for (const item of items) {
        const p = await getProductById(item.id);
        if (p) prods.push(p);
      }
      setProducts(prods);
    }

    if (items.length > 0) {
      load();
    } else {
      setProducts([]);
    }
  }, [items]);

  const getQuantity = (id: string) =>
    items.find((i) => i.id === id)?.quantity || 0;
  const onChangeQuantity = (id: string, delta: number) => {
    const nextQty = getQuantity(id) + delta;
    if (nextQty < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, nextQty);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 カートの中身</h1>
      <CartList
        products={products}
        getQuantity={getQuantity}
        onChangeQuantity={onChangeQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
