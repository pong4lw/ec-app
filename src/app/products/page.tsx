import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@/lib/firestore/products";

export default async function ProductListPage() {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">商品一覧</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">現在、商品が登録されていません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = product.imageUrl || "/images/no-image.png";
            console.log(product)

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="border rounded p-4 shadow hover:shadow-lg transition block"
              >
                <Image                  
                  src={imageUrl}
                  alt={product.name}
                  width={320}
                  height={160}
                  className="object-cover rounded mb-2"
                  unoptimized
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-1">
                  ¥{product.price.toLocaleString()}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
