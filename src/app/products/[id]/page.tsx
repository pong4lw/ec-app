import { getProductById, fetchProducts } from "@/lib/firestore/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

// ISR設定：60秒で再生成
export const revalidate = 60;

// 動的ルーティング生成（SSG対応）
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

// SEO対応：ページメタデータ生成
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) return { title: "商品が見つかりません" };

  return {
    title: `${product.name} | 商品詳細`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl text-gray-700 mt-2 mb-4">¥{product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}
