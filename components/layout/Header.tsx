"use client";

import Link from "next/link";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthFormModal from "@/components/organisms/Auth/AuthFormModal";

export const Header = () => {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("ログアウトしました");
    } catch (err) {
      console.error("ログアウト失敗:", err);
    }
  };

  return (
    <header className="bg-white shadow px-4 py-4">
      <div className="flex justify-between items-center relative">
        <Link href="/" className="text-lg font-semibold text-blue-600 hover:underline">
          My Shop
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">商品一覧</Link>
          <Link href="/cart" className="text-sm text-blue-600 hover:underline">🛒 カート</Link>
          <Link href="/favorites" className="text-sm text-blue-600 hover:underline">❤️ お気に入り</Link>
          {!loading && user ? (
            <>

            <Link href="/orders" className="text-sm text-blue-600 hover:underline">🧾 購入履歴</Link>
              <span className="text-sm text-gray-700">
                ようこそ、{user.displayName || user.email} さん
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <div style={{ width: "150px" }}></div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
