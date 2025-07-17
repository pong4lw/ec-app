"use client";
import React from "react";
import Image from "next/image";

type Props = {
  product: {
    id: string;
    name: string;
    price?: number;
    imageUrl?: string;
  };
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export const CartItem = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  return (
    <div className="flex items-center gap-6 border-b pb-4">
      <Image
        src={product.imageUrl || "/no-image.webp"}
        alt={product.name}
        width={100}
        height={100}
        className="rounded object-cover"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">¥{product.price?.toLocaleString()}</p>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={onDecrease}
            className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          >
            ＋
          </button>
          <button
            onClick={onRemove}
            className="ml-4 text-sm text-red-500 hover:underline"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};
