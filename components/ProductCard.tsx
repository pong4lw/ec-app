// components/ProductCard.tsx
import React from "react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col">
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain rounded"
          unoptimized
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-lg font-semibold mb-1">
          {product.price.toLocaleString()} 円
        </p>
        <p className="text-gray-700 mb-2">{product.name}</p>
        <p
          className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}
        >
          {product.inStock ? "在庫あり" : "在庫なし"}
        </p>
      </div>
    </div>
  );
}
