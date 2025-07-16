// app/layout.tsx
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { Header } from "@/components/organisms/Header";
import { Button } from "@/components/atoms/Button";
import AuthForm from "@/components/organisms/Auth/AuthForm";

export type User = { name: string | null };

export interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Shop",
  description: "Next.js shopping app",
};

export default function RootLayout({ children, user, onLogout }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <ClientLayout>
          <div className="flex flex-col min-h-screen">
            {/* ヘッダー */}
            <header className="bg-white shadow px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-lg font-semibold text-blue-600 hover:underline">
                  My Shop
                </Link>
                <div className="space-x-4">
                  <Link href="/" className="text-sm text-blue-600 hover:underline">
                    商品一覧
                  </Link>
                  <Link href="/cart" className="text-sm text-blue-600 hover:underline">
                    🛒 カートを見る
                  </Link>
                </div>
              </div>
                <div className="space-x-4">

                  {user?.name
                    ? `ようこそ、${user.name} さん`
                    : ""}
              </div>

            </header>
                {user ? (
                  <button
                    onClick={() => onLogout && onLogout()}
                    disabled={!onLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-md"
                  >
                    ログアウト
                  </button>
                ) : (
                  <div></div>
                )}

            {/* メイン */}
            <main className="flex-1 container mx-auto px-4 py-8 min-h-[400px]">
              {children}
            </main>

            {/* フッター */}
            <footer className="bg-white shadow px-4 py-4 text-center text-sm text-gray-500">
              <div className="flex justify-center space-x-4 mb-2">
                <Link href="/" className="text-blue-600 hover:underline">商品一覧</Link>
                <Link href="/cart" className="text-blue-600 hover:underline">🛒 カートを見る</Link>
              </div>
              &copy; {new Date().getFullYear()} Your Company
            </footer>
                {user ? (
                  <button
                    onClick={() => onLogout && onLogout()}
                    disabled={!onLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-md"
                  >
                  </button>
                ) : (
                    <AuthForm />
                )}


          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
