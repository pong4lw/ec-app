"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/firestore/products";
import { useCartStore } from "@/lib/firestore/cart";

type Props = {
  products: Product[];
};

export const ProductListClient = ({ products }: Props) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCartStore();

  const getQuantity = (id: string) =>
    items.find((i) => i.id === id)?.quantity || 0;

  const handleQuantityChange = async (product: Product, delta: number) => {
    const currentQty = getQuantity(product.id);
    const newQty = currentQty + delta;

    if (newQty < 1) {
      await removeFromCart(product.id);
    } else if (currentQty === 0) {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    } else {
      await updateQuantity(product.id, newQty);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">商品一覧</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">現在、商品が登録されていません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl =
              typeof product.imageUrl === "string" &&
              ["http", "https"].some((p) => product.imageUrl?.startsWith(p))
                ? product.imageUrl
                : "/no-image.webp";

            const quantity = getQuantity(product.id);

            return (
              <div
                key={product.id}
                className="border rounded p-4 shadow hover:shadow-lg transition block"
              >
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={320}
                    height={160}
                    className="object-cover rounded mb-2"
                    unoptimized
                  />
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600 mt-1">
                    ¥
                    {typeof product.price === "number"
                      ? product.price.toLocaleString()
                      : "価格未定"}
                  </p>
                </Link>

                {/* 増減ボタン */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(product, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(product, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ＋
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
