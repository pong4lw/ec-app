// lib/store/cart.ts
import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  initCartSync: () => void;
};

export const useCartStore = create<CartState>((set, get) => {
  let unsubscribe: (() => void) | null = null;

  // Firestore同期解除用を外部スコープに持つ
  const initCartSync = () => {
    // いったん前の監視解除
    if (unsubscribe) unsubscribe();

    // ユーザー認証状態監視
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const ref = doc(db, 'carts', user.uid);

        unsubscribe = onSnapshot(ref, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            set({ items: data.items || [] });
          } else {
            set({ items: [] });
          }
        });
      } else {
        // ログアウト時はカートクリア
        set({ items: [] });
        if (unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }
      }
    });
  };

  const syncCartToFirestore = async (items: CartItem[]) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, 'carts', user.uid);
    await setDoc(ref, { items }, { merge: true });
  };

  return {
    items: [],
    setItems: (items) => set({ items }),

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

    initCartSync,
  };
});
