import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";

// Product 型
export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category?: string;
  tags?: string[];
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

export async function fetchProductsByCategory(category: string, excludeId?: string): Promise<Product[]> {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => {
      const data = doc.data() as Omit<Product, "id">;
      return {
        id: doc.id,
        ...data,
      };
    })
    .filter((product) => product.id !== excludeId);
}

export async function fetchProductsByTags(tags: string[], excludeId?: string): Promise<Product[]> {
  const promises = tags.map(tag => {
    const q = query(
      collection(db, "products"),
      where("tags", "array-contains", tag)
    );
    return getDocs(q);
  });

  const snapshots = await Promise.all(promises);

  const mergedProductsMap = new Map<string, Product>();

  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      if (doc.id === excludeId) continue;
      const data = doc.data() as Omit<Product, "id">;
      mergedProductsMap.set(doc.id, {
        id: doc.id,
        ...data,
      });
    }
  }

  return Array.from(mergedProductsMap.values());
}