// app/layout.tsx
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";
import { ClientLayout } from "@/components/layout/ClientLayout";
import AuthModal from "@/components/organisms/Auth/AuthModal"; // ← モーダル用に変更

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

export default function RootLayout({
  children,
  user,
  onLogout,
}: {
  children: React.ReactNode;
  user?: User;
  onLogout?: () => void;
}) {

  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          {/* ヘッダー */}
          <header className="bg-white shadow px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-lg font-semibold text-blue-600 hover:underline">
                My Shop
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-sm text-blue-600 hover:underline">
                  商品一覧
                </Link>
                <Link href="/cart" className="text-sm text-blue-600 hover:underline">
                  🛒 カートを見る
                </Link>
              </div>
            </div>
          </header>

          <ClientLayout>{children}</ClientLayout>
        </div>
        {/* フッター */}
        <footer className="bg-white shadow px-4 py-4 text-center text-sm text-gray-500">
          <div className="flex justify-center space-x-4 mb-2">
            <Link href="/" className="text-blue-600 hover:underline">
              商品一覧
            </Link>
            <Link href="/cart" className="text-blue-600 hover:underline">
              🛒 カートを見る
            </Link>
          </div>
          &copy; {new Date().getFullYear()} Your Company
        </footer>
      </body>
    </html>
  );
}
