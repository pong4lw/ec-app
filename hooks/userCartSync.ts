// lib/hooks/useCartSync.ts

import { useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/components/organisms/Auth/AuthContext";
import { db } from "@/lib/firebase";

/**
 * Firestore ⇆ Zustand のリアルタイム同期
 */
export function useCartSync() {
  const { user } = useAuth();
  const { setCart, items } = useCartStore();

  // Firestore → Zustand（購読）
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

  // Zustand → Firestore（items が更新されたら保存）
  useEffect(() => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    setDoc(cartRef, { items }, { merge: true });
  }, [items, user]);
}
