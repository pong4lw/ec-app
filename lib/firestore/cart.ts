// lib/store/cart.ts
import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc, deleteField } from 'firebase/firestore';
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
};

export const useCartStore = create<CartState>((set, get) => ({
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
}));

// Firestore に同期保存
async function syncCartToFirestore(items: CartItem[]) {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, 'carts', user.uid);
  await setDoc(ref, { items }, { merge: true });
}
