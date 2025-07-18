/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FavoriteButton.tsx
"use client";
import React from "react";
import { useFavoriteStore } from "@/lib/firestore/favorites";

// 型定義（必要に応じて拡張）
export interface Product {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
}

export const FavoriteButton = ({ product }: { product: Product }) => {
  const { items, toggleFavorite } = useFavoriteStore();
  const isFav = items.some((i) => i.id === product.id);

  return (
    <button
      onClick={() => toggleFavorite(product)}
      className="text-2xl hover:scale-110 transition-transform"
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  );
};
