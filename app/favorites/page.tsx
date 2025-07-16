// app/favorites/page.tsx
"use client";

import { useFavoriteStore } from "@/lib/firestore/favorites";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const { items, toggleFavorite } = useFavoriteStore();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">お気に入り一覧</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">お気に入り商品がありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <Link href={`/products/${item.id}`}>
                <Image
                  src={item.imageUrl || "/images/no-image.png"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded mb-2 object-cover"
                />
              </Link>
              <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-600 mb-3">
                ¥{item.price?.toLocaleString() ?? "未定"}
              </p>
              <button
                onClick={() => toggleFavorite(item)}
                className="text-sm text-red-500 hover:underline"
              >
                お気に入りから削除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
