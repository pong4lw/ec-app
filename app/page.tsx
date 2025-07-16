"use client";

import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@/lib/firestore/products";
import { useEffect, useState } from "react";
import { Product } from "@/lib/firestore/products";
import { useCartStore } from "@/lib/firestore/cart";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { FavoriteButton } from "@/components/atoms/FavoriteButton";

function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { items, addToCart, updateQuantity } = useCartStore();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  const getQuantity = (id: string) => items.find((i) => i.id === id)?.quantity || 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">商品一覧</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">現在、商品が登録されていません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = isValidUrl(product.imageUrl)
              ? product.imageUrl
              : "/no-image.webp";
            const quantity = getQuantity(product.id);

            return (
              <div
                key={product.id}
                className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col"
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
                </Link>

                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">
                  ¥
                  {typeof product.price === "number"
                    ? product.price.toLocaleString()
                    : "価格未定"}
                </p>

                {/* カートの増減ボタン */}
                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    disabled={quantity === 0}
                  >
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price ?? 0,
                        imageUrl: product.imageUrl,
                      })
                    }
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    <FaPlus />
                  </button>

                  {/* お気に入りボタン */}
                    <FavoriteButton product={product} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
