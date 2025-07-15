// lib/store/cart.ts (最適化バージョン)
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";

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
  loadCartOnce: () => Promise<void>; // ⬆ 新しい: 1回だけ読み込み
};

export const useCartStore = create<CartState>((set, get) => {
  const syncCartToFirestore = async (items: CartItem[]) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "carts", user.uid);
    await setDoc(ref, { items }, { merge: true });
  };

  return {
    items: [],
    loading: true,

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
        set({ items: data.items || [], loading: false });
      } else {
        set({ items: [], loading: false });
      }
    },

    addToCart: async (item) => {
      const current = get().items;
      const existing = current.find((i) => i.id === item.id);
      const newItems = existing
        ? current.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...current, { ...item, quantity: 1 }];
      set({ items: newItems });
      await syncCartToFirestore(newItems);
    },

    updateQuantity: async (id, quantity) => {
      const updated = get().items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      set({ items: updated });
      await syncCartToFirestore(updated);
    },

    removeFromCart: async (id) => {
      const updated = get().items.filter((i) => i.id !== id);
      set({ items: updated });
      await syncCartToFirestore(updated);
    },
  };
});
