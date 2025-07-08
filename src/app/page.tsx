import { fetchProducts } from "@/lib/firestore/products";
import AuthForm from "./auth/AuthForm";
import Image from "next/image";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">商品一覧</h1>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => {
            const imageUrl = product.imageUrl || "/images/no-image.png"; // 代替画像
            return (
              <div key={product.id} className="border p-4 rounded shadow">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={320}      // 横幅のピクセル数（例）
                  height={160}     // 高さのピクセル数（例）
                  className="object-cover mb-2 rounded"
                />
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-600">¥{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
      <AuthForm />
    </>
  );
}
