"use client";

import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">カート</h2>
      {items.length === 0 ? (
        <p>カートは空です。</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="border p-4 mb-4 rounded">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>¥{item.price}</p>
              <p>数量: {item.quantity}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                className="border p-1 w-16"
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />
              <button
                className="ml-2 text-red-500"
                onClick={() => removeItem(item.id)}
              >
                削除
              </button>
            </div>
          ))}
          <button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
            onClick={clearCart}
          >
            カートを空にする
          </button>
        </>
      )}
    </div>
  );
}
