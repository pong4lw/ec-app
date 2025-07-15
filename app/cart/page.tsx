"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/firestore/cart";
import { getProductById, Product } from "@/lib/firestore/products";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const initCartSync = useCartStore((state) => state.initCartSync);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Firestoreとの同期開始
    initCartSync();
  }, [initCartSync]);

  useEffect(() => {
    // カートに入ってる商品の詳細をフェッチ
    async function loadProducts() {
      const prods: Product[] = [];
      for (const item of items) {
        const p = await getProductById(item.id);
        if (p) prods.push(p);
      }
      setProducts(prods);
    }
    if (items.length > 0) {
      loadProducts();
    } else {
      setProducts([]);
    }
  }, [items]);

  // 数量の取得（itemsのquantity優先）
  const getQuantity = (id: string) => items.find((i) => i.id === id)?.quantity || 0;

  // 数量増減
  const onChangeQuantity = (id: string, delta: number) => {
    const currentQty = getQuantity(id);
    const newQty = currentQty + delta;
    if (newQty < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQty);
    }
  };

  // 合計金額計算
  const totalPrice = products.reduce((sum, product) => {
    const qty = getQuantity(product.id);
    return sum + (product.price || 0) * qty;
  }, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 カートの中身</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">カートに商品が入っていません。</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => {
            const quantity = getQuantity(product.id);
            return (
              <div key={product.id} className="flex items-center gap-6 border-b pb-4">
                <Image
                  src={product.imageUrl || "/images/no-image.png"}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">¥{product.price?.toLocaleString()}</p>

                  {/* 数量操作ボタン */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onChangeQuantity(product.id, -1)}
                      className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => onChangeQuantity(product.id, 1)}
                      className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                    >
                      ＋
                    </button>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="ml-4 text-sm text-red-500 hover:underline"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 合計金額 */}
          <div className="text-right text-xl font-bold mt-8">
            合計: ¥{totalPrice.toLocaleString()}
          </div>

          <div className="mt-6 text-right">
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              買い物を続ける
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
