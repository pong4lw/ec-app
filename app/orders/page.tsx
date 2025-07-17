"use client";

import React, { useEffect, useState } from "react";
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
        <ul className="space-y-6">
          {orders.map((order) => {
            const totalPrice = order.items?.reduce(
              (sum: number, item: any) => sum + item.price * item.quantity,
              0,
            );

            return (
              <li key={order.id} className="border p-6 rounded shadow bg-white">
                <div className="text-sm text-gray-500 mb-2">
                  <p>
                    購入日時:{" "}
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleString()
                      : "-"}
                  </p>
                  <p>支払い方法: {order.payment || "-"}</p>
                  <p>氏名: {order.name}</p>
                  <p>住所: {order.address}</p>
                  <p>電話番号: {order.phone}</p>
                  <p>メール: {order.email}</p>
                </div>

                <h2 className="text-md font-semibold mb-2">注文商品</h2>
                <ul className="ml-4 list-disc text-sm space-y-1">
                  {order.items?.map((item: any, index: number) => (
                    <li key={index}>
                      {item.name} × {item.quantity}（¥
                      {(item.price * item.quantity).toLocaleString()}）
                    </li>
                  ))}
                </ul>

                <p className="mt-3 font-bold text-right text-gray-700">
                  合計: ¥{totalPrice.toLocaleString()}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
