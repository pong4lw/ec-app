// app/layout.tsx
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ClientLayout } from "@/components/layout/clientLayout";
import { AuthProvider } from "@/components/organisms/Auth/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Shop",
  description: "Next.js shopping app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
