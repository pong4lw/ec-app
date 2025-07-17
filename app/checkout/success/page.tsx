// app/checkout/success/page.tsx
import React from "react";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const orderId =
    typeof searchParams?.orderId === "string"
      ? searchParams.orderId
      : Array.isArray(searchParams?.orderId)
        ? searchParams.orderId[0]
        : undefined;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ご注文ありがとうございました！</h1>
      <p>注文番号：{orderId ?? "不明"}</p>
    </div>
  );
}
