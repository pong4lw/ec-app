// src/app/layout.tsx
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/organisms/Auth/AuthContext";
import "@/styles/globals.css";
import ProductListPage from "@/app/products/page"; // appからの絶対パスに修正
import { useCartSync } from "@/hooks/useCartSync";

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
            <header className="bg-white shadow p-4 text-xl font-semibold text-center">
              My Shop
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
              {/* 商品一覧ページも含める */}
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
