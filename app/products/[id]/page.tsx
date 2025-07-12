import { getProductById, fetchProducts } from "@/lib/firestore/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type PageProps = {
  params: {
    id?: string;
  };
};

// 画像URLのバリデーション関数
function isValidUrl(url?: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// ISR設定：60秒ごとに再生成
export const revalidate = 60;

// 動的ルーティング生成（SSG対応）
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id.trim(),
  }));
}

// SEO対応：メタデータ生成
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params?.id?.trim();
  if (!id) {
    return { title: "商品が見つかりません" };
  }

  const product = await getProductById(id);
  if (!product) {
    return { title: "商品が見つかりません" };
  }

  return {
    title: `${product.name} | 商品詳細`,
    description: product.description || "",
  };
}

// メインページコンポーネント
export default async function ProductDetailPage({ params }: PageProps) {
  const id = params?.id?.trim();
  if (!id) return notFound();

  const product = await getProductById(id);
  if (!product) return notFound();

  const imageUrl = isValidUrl(product.imageUrl)
    ? product.imageUrl
    : "/images/no-image.png";

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Image
        src={imageUrl}
        alt={product.name}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-4">
        ¥{product.price?.toLocaleString?.() || "価格未設定"}
      </p>
      <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
    </div>
  );
}
