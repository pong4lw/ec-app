"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, fetchProductsByTags } from "@/lib/firestore/products";
import { useFavoriteStore } from "@/lib/firestore/favorites";
import { useCartStore } from "@/lib/firestore/cart";
import { FavoriteButton } from "@/components/atoms/FavoriteButton";
import { FaPlus, FaMinus } from "react-icons/fa";
import { use } from "react";

type PageProps = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const { items: favoriteItems } = useFavoriteStore();
  const { items: cartItems, addToCart, updateQuantity } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      const p = await getProductById(id);
      setProduct(p);

      if (p?.tags?.length > 0) {
        const related = await fetchProductsByTags(p.tags, p.id);
        setRelatedProducts(related);
      }
    }
    fetchData();
  }, [id]);

  if (!product) return <div>読み込み中...</div>;

  const imageUrl = product.imageUrl || "/no-image.webp";
  const quantity = cartItems.find((i) => i.id === product.id)?.quantity || 0;

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <FavoriteButton product={product} />
      </div>

      <Image
        src={imageUrl}
        alt={product.name}
        width={600}
        height={400}
        className="mb-4 rounded object-cover"
      />

      <p className="text-gray-700 mb-2">
        価格: ¥{product.price?.toLocaleString() ?? "未定"}
      </p>
      <p className="text-gray-500 mb-4">
        カテゴリ: {product.category ?? "なし"}
      </p>

      {/* カートの増減ボタン */}
      <div className="flex items-center gap-2 mt-4">
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
      </div>

      {/* 関連商品 */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">同じタグの商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="border rounded p-4 shadow hover:shadow-lg transition block"
              >
                <Image
                  src={item.imageUrl || "/no-image.webp"}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="mb-2 object-cover w-full h-48 rounded"
                />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">
                  ¥{item.price?.toLocaleString() ?? "未定"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
