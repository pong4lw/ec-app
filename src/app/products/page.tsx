import { fetchProducts } from "@/lib/firestore/products";
import AuthFormModal from "./AuthFormModal";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">商品一覧</h1>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">¥{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <AuthFormModal />
    </>
  );
}
