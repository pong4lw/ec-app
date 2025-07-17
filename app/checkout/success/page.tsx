// app/checkout/success/page.tsx
import React from "react";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams?.orderId;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ご注文ありがとうございました！</h1>
      <p>注文番号：{orderId ?? "不明"}</p>
    </div>
  );
}
