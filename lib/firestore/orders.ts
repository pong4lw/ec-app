import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { CartItem } from "@/lib/firestore/cart";

// 注文データ型（必要に応じて拡張）
type OrderData = {
  items: CartItem[];
  name: string;
  email: string;
  address: string;
  phone: string;
  payment: "credit" | "bank" | "cash";
};

// 共通：現在のユーザー取得
const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("ログインユーザーが見つかりません");
  return user;
};

// ✅ 注文を Firestore に保存
export async function saveOrder(orderData: {
  items: any[];
  name: string;
  email: string;
  address: string;
  phone: string;
  payment: string;
}) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt: Timestamp.now(),
  });

  return docRef.id; // ← これで orderId を返す
}

// ✅ 注文履歴を取得
export const fetchOrderHistory = async (): Promise<any[]> => {
  const user = getCurrentUser();

  const colRef = collection(db, "orders", user.uid, "list");
  const snap = await getDocs(colRef);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
