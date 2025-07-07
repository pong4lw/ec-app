import Link from "next/link";
import { fetchProducts } from "@/lib/firestore/products";

export default async function ProductListPage() {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">商品一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-1">¥{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
