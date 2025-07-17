// lib/store/cart.ts
"use client";

import { create } from "zustand";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  loading: boolean;
  setItems: (items: CartItem[]) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  loadCartOnce: () => Promise<void>;
};

export async function clearCartInFirestore(userId: string) {
  const ref = doc(db, "carts", userId);
  await setDoc(ref, { items: [] });
}

export const useCartStore = create<CartState>((set, get) => {
  const syncCartToFirestore = async (items: CartItem[]) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "carts", user.uid);
    console.log(items);
    await setDoc(ref, { items }, { merge: true });
  };

  return {
    items: [],
    loading: true,

    clearCart: async (userId: string) => {
      await clearCartInFirestore(userId); // Firebase 側を先にクリア
      set({ items: [] }); // ローカルカートを空にする
    },

    setItems: (items) => set({ items, loading: false }),

    loadCartOnce: async () => {
      const user = auth.currentUser;
      if (!user) {
        set({ items: [], loading: false });
        return;
      }
      const ref = doc(db, "carts", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.items)) {
          set({ items: data.items, loading: false });
        } else {
          set({ items: [], loading: false });
        }
      } else {
        set({ items: [], loading: false });
      }
    },

    addToCart: async (item) => {
      const current = get().items;
      const existing = current.find((i) => i.id === item.id);
      const newItems = existing
        ? current.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...current, { ...item, quantity: 1 }];
      set({ items: newItems });
      console.log("syncing:", newItems);

      await syncCartToFirestore(newItems);
    },

    updateQuantity: async (id, quantity) => {
      if (quantity <= 0) {
        await get().removeFromCart(id);
        return;
      }
      const updated = get().items.map((i) =>
        i.id === id ? { ...i, quantity } : i,
      );
      set({ items: updated });
      console.log("syncing:", updated);

      await syncCartToFirestore(updated);
    },

    removeFromCart: async (id) => {
      const updated = get().items.filter((i) => i.id !== id);
      set({ items: updated });
      console.log("syncing:", updated);

      await syncCartToFirestore(updated);
    },
  };
});
