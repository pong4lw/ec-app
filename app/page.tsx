// src/app/page.tsx
import HeaderClient from "@/components/organisms/HeaderClient";

export default function HomePage() {
  return (
    <>
      <HeaderClient />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Title</h1>
        {/* 他のページ内容 */}
      </main>
    </>
  );
}
