// components/ProductFilter.tsx
import React from "react";

export default function ProductFilter() {
  return (
    <aside className="w-72 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">サイズ（レディース）</h2>
      {["XS", "S", "M", "L"].map((size) => (
        <label
          key={size}
          className="flex items-center gap-2 mb-2 cursor-pointer"
        >
          <input type="checkbox" className="w-4 h-4" />
          <span>{size}</span>
        </label>
      ))}

      <h2 className="text-lg font-semibold mt-8 mb-4">価格</h2>
      <div className="mb-6">
        <input
          type="number"
          placeholder="最小"
          className="w-20 border p-1 mr-2"
        />
        <input type="number" placeholder="最大" className="w-20 border p-1" />
        {/* スライダーも追加可能 */}
      </div>

      <h2 className="text-lg font-semibold mb-4">カラーで選ぶ</h2>
      <label className="flex items-center gap-2 mb-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4" />
        <span className="inline-block w-4 h-4 rounded-full bg-gray-400"></span>{" "}
        グレー
      </label>
      <label className="flex items-center gap-2 mb-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4" />
        <span className="inline-block w-4 h-4 rounded-full bg-yellow-300"></span>{" "}
        イエロー
      </label>

      <h2 className="text-lg font-semibold mt-8 mb-4">ブランドで選ぶ</h2>
      {["Aether Elegance", "Quintessential Bliss", "Minimal Craftsman"].map(
        (brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input type="checkbox" className="w-4 h-4" />
            <span>{brand}</span>
          </label>
        ),
      )}
    </aside>
  );
}
