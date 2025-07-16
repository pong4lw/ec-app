import dynamic from "next/dynamic";

// クライアントコンポーネントとして遅延読み込み
const CheckoutForm = dynamic(() => import("@/components/Atoms/CheckoutForm"), {
  ssr: true,
});

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <CheckoutForm />
    </div>
  );
}
