// components/FavoriteButton.tsx
"use client";

import { useFavoriteStore } from "@/lib/firestore/favorites";

export const FavoriteButton = ({ product }: { product: any }) => {
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
