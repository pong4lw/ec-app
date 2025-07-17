// app/checkout/success/page.tsx

type Props = {
  searchParams: {
    orderId?: string;
  };
};

export default function SuccessPage({ searchParams }: Props) {
  const orderId = searchParams.orderId;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ご注文ありがとうございました！</h1>
      <p>注文番号：{orderId}</p>
    </div>
  );
}
