/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

// app/checkout/success/page.tsx
export default function SuccessPage({ searchParams }: any) {
  const orderId =
    typeof searchParams?.orderId === "string"
      ? searchParams.orderId
      : undefined;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ご注文ありがとうございました！</h1>
      <p>注文番号：{orderId ?? "不明"}</p>
    </div>
  );
}
