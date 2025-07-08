import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

// Product 型
export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

// 商品一覧を取得
export async function fetchProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => {
    const data = doc.data() as Omit<Product, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
}

// 商品詳細を取得
export async function getProductById(id: string): Promise<Product | null> {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data() as Omit<Product, "id">;
  return {
    id: snap.id,
    ...data,
  };
}
