import { Inter } from "next/font/google";
import Providers from "@/src/app/providers";
import { AuthProvider } from "@/components/organisms/Auth/AuthContext";

import ProductListPage from "@/src/app/products/page";

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
              List
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
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
