"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts, getProductById, Product } from "@/lib/firestore/products";

// 画像URLのバリデーション
function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// タグでグループ化
function groupByTags(products: Product[]) {
  const grouped: Record<string, Product[]> = {};
  products.forEach((product) => {
    const tags = Array.isArray(product.tags) ? product.tags : [];
    tags.forEach((tag) => {
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(product);
    });
  });
  return grouped;
}

// カテゴリでグループ化（未分類は除外）
function groupByCategory(products: Product[]) {
  const grouped: Record<string, Product[]> = {};
  products.forEach((product) => {
    if (!product.category || product.category === "未分類") return;
    if (!grouped[product.category]) grouped[product.category] = [];
    grouped[product.category].push(product);
  });
  return grouped;
}

export default function ProductListPage() {
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from");

  const [products, setProducts] = useState<Product[]>([]);
  const [baseProduct, setBaseProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      const allProducts = await fetchProducts();

      if (fromId) {
        const base = await getProductById(fromId);
        setBaseProduct(base);
        if (!base) return;

        const related = allProducts.filter((p) => {
          if (p.id === base.id) return false;
          if (!p.category && (!p.tags || p.tags.length === 0)) return false;
          if (p.category === "未分類") return false;

          const matchCategory = base.category && p.category === base.category;
          const matchTags =
            Array.isArray(base.tags) &&
            Array.isArray(p.tags) &&
            base.tags.some((tag) => p.tags!.includes(tag));

          return matchCategory || matchTags;
        });

        setProducts(related);
      } else {
        const filtered = allProducts.filter(
          (p) =>
            (p.category && p.category !== "未分類") ||
            (Array.isArray(p.tags) && p.tags.length > 0)
        );
        setProducts(filtered);
      }
    }

    load();
  }, [fromId]);

  const groupedByCategory = groupByCategory(products);
  const groupedByTag = groupByTags(products);

  return (
    <div className="p-6 space-y-16">
      {/* トップリンク */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          トップページへ戻る
        </Link>
      </div>

      {/* ベース商品タイトル（from指定時） */}
      {baseProduct && (
        <h1 className="text-xl font-semibold mb-6">
          「{baseProduct.name}」と関連する商品
        </h1>
      )}

      {/* カテゴリ別表示 */}
      <section>
        <h2 className="text-lg font-bold mb-4">カテゴリ別</h2>
        {Object.keys(groupedByCategory).length === 0 ? (
          <p className="text-gray-500">該当する商品がありません。</p>
        ) : (
          Object.entries(groupedByCategory).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-md font-semibold mb-2">{category}</h3>
              <ul className="space-y-3">
                {items.map((product) => {
                  const imageUrl = isValidUrl(product.imageUrl)
                    ? product.imageUrl
                    : "/images/no-image.png";

                  return (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center gap-4 p-2 border rounded hover:shadow transition"
                      >
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{product.name}</span>
                          <span className="text-xs text-gray-600">
                            ¥
                            {typeof product.price === "number"
                              ? product.price.toLocaleString()
                              : "価格未定"}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
