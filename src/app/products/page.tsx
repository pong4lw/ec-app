import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@/lib/firestore/products";

function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export default async function ProductListPage() {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">商品一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const imageUrl = product.imageUrl || "/images/no-image.png"; // 代替画像パス
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <Image
                src={
                  isValidUrl(product.imageUrl)
                    ? product.imageUrl
                    : "/images/no-image.png"
                }
                alt={product.name}
                width={300}
                height={200}
                className="object-cover w-full h-48 rounded"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-1">¥{product.price}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
