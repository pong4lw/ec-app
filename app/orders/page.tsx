"use client";
import { useEffect, useState } from "react";
import { fetchOrderHistory } from "@/lib/firestore/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrderHistory().then(setOrders);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold mb-6">購入履歴</h1>
      {orders.length === 0 ? (
        <p>まだ購入履歴がありません。</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-500">
                購入日時:{" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "-"}
              </p>
              <ul className="ml-4 mt-2 list-disc">
                {order.items?.map((item: any) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}（¥{item.price}）
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
