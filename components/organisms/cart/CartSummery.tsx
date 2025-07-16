"use client";
import Link from "next/link";

export const CartSummary = ({ total }: { total: number }) => {
  return (
    <>
      <div className="text-right text-xl font-bold mt-8">
        合計: ¥{total.toLocaleString()}
      </div>

      <div className="mt-6 text-right space-x-4">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          買い物を続ける
        </Link>
        <Link
          href="/checkout"
          className="inline-block px-4 py-2 text-blue-600 hover:underline"
        >
          🧾 購入手続き
        </Link>
      </div>
    </>
  );
};
