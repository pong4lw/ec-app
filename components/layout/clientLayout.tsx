"use client";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
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
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white shadow px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold text-blue-600 hover:underline">
            My Shop
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-blue-600 hover:underline">商品一覧</Link>
            <Link href="/cart" className="text-sm text-blue-600 hover:underline">🛒 カート</Link>
            <Link href="/orders" className="text-sm text-blue-600 hover:underline">🧾 購入履歴</Link>
            <Link href="/favorites" className="text-sm text-blue-600 hover:underline">❤️ お気に入り</Link>

            {!loading && user ? (
              <>
                <span className="text-sm text-gray-700">
                  ようこそ、{user.displayName || user.email} さん
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline ml-2"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link href="/auth" className="text-sm text-blue-600 hover:underline">
                ログイン
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="flex-1 container mx-auto px-4 py-8 min-h-[400px]">
        {children}
      </main>

      {/* フッター */}
      <footer className="bg-white shadow px-4 py-4 text-center text-sm text-gray-500">
        <div className="flex justify-center space-x-4 mb-2">
          <Link href="/" className="text-blue-600 hover:underline">商品一覧</Link>
          <Link href="/cart" className="text-blue-600 hover:underline">🛒 カート</Link>
          <Link href="/orders" className="text-blue-600 hover:underline">🧾 購入履歴</Link>
          <Link href="/favorites" className="text-blue-600 hover:underline">❤️ お気に入り</Link>
        </div>
        &copy; {new Date().getFullYear()} Your Company
      </footer>
    </div>
  );
};
