// src/components/cart/CartIndicator.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/firestore/cart";

export default function CartIndicator() {
  const items = useCartStore((state) => state.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      🛒 カート
      {totalCount > 0 && (
        <span className="ml-1 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
