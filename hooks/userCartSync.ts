import { useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { db } from "@/lib/firebase";

export function useCartSync() {
  const { user } = useAuth();
  const { setCart, items } = useCartStore();

  // Firestore → Zustand へリアルタイム同期
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCart(data.items || []);
      } else {
        setCart([]);
      }
    });

    return () => unsubscribe();
  }, [user, setCart]);

  // Zustand → Firestore へ保存（itemsが変更されたら）
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);
    setDoc(cartRef, { items }, { merge: true });
  }, [items, user]);
}
