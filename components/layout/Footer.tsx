import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white shadow px-4 py-4 text-center text-sm text-gray-500">
      <div className="flex justify-center space-x-4 mb-2">
        <Link href="/" className="text-blue-600 hover:underline">商品一覧</Link>
        <Link href="/cart" className="text-blue-600 hover:underline">🛒 カート</Link>
        <Link href="/orders" className="text-blue-600 hover:underline">🧾 購入履歴</Link>
        <Link href="/favorites" className="text-blue-600 hover:underline">❤️ お気に入り</Link>
      </div>
      &copy; {new Date().getFullYear()} Your Company
    </footer>
  );
};
