export const dynamic = 'force-dynamic'; // ← これだけでOK

import { getProductById } from "@/lib/firestore/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

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
        src={product.imageUrl || "/images/no-image.png"}
        alt={product.name}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded mb-6"
        unoptimized
      />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl text-gray-700 mt-2 mb-4">
        ¥{product.price.toLocaleString()}
      </p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}
