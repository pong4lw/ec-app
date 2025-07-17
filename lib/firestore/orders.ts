/* eslint-disable @typescript-eslint/no-explicit-any */
import { db, auth } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  name: string;
  email: string;
  address: string;
  phone: string;
  payment: string;
  createdAt: {
    toDate: () => Date;
  };
}

// 共通：現在のユーザー取得
const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("ログインユーザーが見つかりません");
  return user;
};

// ✅ 注文を Firestore に保存

export async function saveOrder(orderData: {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  userId: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  payment: string;
}) {
  const itemsWithSubtotal = orderData.items.map((item) => ({
    ...item,
    subtotal: item.price * item.quantity,
  }));
  const user = getCurrentUser();

  const docRef = await addDoc(collection(db, "orders"), {
    items: itemsWithSubtotal,
    userId: user?.uid || "guest",
    name: orderData.name,
    email: orderData.email,
    address: orderData.address,
    phone: orderData.phone,
    payment: orderData.payment,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

// ✅ 注文履歴を取得
export async function fetchOrderHistory(): Promise<Order[]> {
  const auth = getAuth();
  console.log(auth);
  const user = auth.currentUser;
  console.log(user);

  if (!user) return [];

  const q = query(
    collection(db, "orders"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
