"use client";

import React, { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, fetchProductsByTags } from "@/lib/firestore/products";

type PageProps = {
  params: { id: string };
};

type CartType = {
  [productId: string]: number; // 商品IDと個数
};

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [cart, setCart] = useState<CartType>({});
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

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

  const imageUrl = product.imageUrl || "/images/no-image.png";
  const quantity = cart[product.id] || 0;

  const increaseQuantity = () => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const decreaseQuantity = () => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      } else {
        return {
          ...prev,
          [product.id]: current - 1,
        };
      }
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <Image
        src={imageUrl}
        alt={product.name}
        width={600}
        height={400}
        className="mb-4 rounded"
      />
      <p className="text-gray-700 mb-2">
        価格: ¥{product.price?.toLocaleString() ?? "未定"}
      </p>
      <p className="text-gray-500 mb-4">カテゴリ: {product.category ?? "なし"}</p>

      {/* 数量操作ボタン */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={decreaseQuantity}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          −
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ＋
        </button>
        {quantity > 0 && (
          <span className="text-sm text-green-600">カートに追加済み</span>
        )}
      </div>

      {/* 関連商品表示 */}
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
                  src={item.imageUrl || "/images/no-image.png"}
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
