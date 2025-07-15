// src/app/layout.tsx
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/organisms/Auth/AuthContext";
import "@/styles/globals.css";
import ProductListPage from "@/app/products/page";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {/* ヘッダー */}
            <header className="bg-white shadow px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:underline"
              >
                My Shop
              </Link>
</h1>
              <Link
                href="/cart"
                className="text-sm text-blue-600 hover:underline"
              >
                🛒 カートを見る
              </Link>
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
              {/* 商品一覧ページも含める（必要なら） */}
              <ProductListPage />
            </main>

            {/* フッター */}
            <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Your Company
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
