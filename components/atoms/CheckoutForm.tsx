"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/firestore/cart";
import { createOrder, saveOrder } from "@/lib/firestore/orders"; // ← Firestore登録関数

// バリデーションスキーマ
const CheckoutSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  phone: z.string().regex(/^\d{10,11}$/, "電話番号を正しく入力してください"),
  payment: z.enum(["credit", "bank", "cash"], {
    required_error: "支払い方法を選択してください",
  }),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export default function CheckoutForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { items } = useCartStore();
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
  });

  // ユーザー情報でフォーム初期化
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      alert("ログインしてください");
      return;
    }

    try {
      const orderId = await saveOrder({
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        payment: data.payment,
      });

      await clearCart(user.uid);

      router.push(`/checkout/success?orderId=${orderId}`);
    } catch (err) {
      console.error("注文エラー:", err);
      alert("注文処理に失敗しました");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-8 rounded shadow space-y-6"
    >
      <h2 className="text-xl font-bold">購入手続き</h2>

      {/* 氏名 */}
      <div>
        <label className="block font-medium">氏名</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div>
        <label className="block font-medium">メールアドレス</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* 住所 */}
      <div>
        <label className="block font-medium">配送先住所</label>
        <input
          type="text"
          {...register("address")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* 電話番号 */}
      <div>
        <label className="block font-medium">電話番号（ハイフンなし）</label>
        <input
          type="tel"
          {...register("phone")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* 支払い方法 */}
      <div>
        <label className="block font-medium mb-2">支払い方法</label>
        <select
          {...register("payment")}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">選択してください</option>
          <option value="credit">クレジットカード</option>
          <option value="bank">銀行振込</option>
          <option value="cash">代金引換</option>
        </select>
        {errors.payment && (
          <p className="text-red-500 text-sm">{errors.payment.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        注文を確定する
      </button>
    </form>
  );
}
