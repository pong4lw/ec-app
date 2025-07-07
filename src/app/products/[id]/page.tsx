import { getProductById } from "@/lib/firestore/products";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl text-gray-700 mt-2 mb-4">¥{product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}
