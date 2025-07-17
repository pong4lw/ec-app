"use client";
import { create } from "zustand";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type FavoriteItem = {
  id: string;
  name: string;
  imageUrl?: string;
  price?: number;
};

type FavoriteState = {
  items: FavoriteItem[];
  loadFavorites: () => Promise<void>;
  toggleFavorite: (item: FavoriteItem) => Promise<void>;
};

export const useFavoriteStore = create<FavoriteState>((set, get) => {
  const syncToFirestore = async (items: FavoriteItem[]) => {
    const user = auth.currentUser;
    if (!user) return;
    await setDoc(doc(db, "favorites", user.uid), { items }, { merge: true });
  };

  return {
    items: [],
    loadFavorites: async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, "favorites", user.uid);
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : {};
      set({ items: Array.isArray(data.items) ? data.items : [] });
    },

    toggleFavorite: async (item) => {
      const current = get().items;
      const exists = current.find((i) => i.id === item.id);
      const updated = exists
        ? current.filter((i) => i.id !== item.id)
        : [...current, item];

      set({ items: updated });
      await syncToFirestore(updated);
    },
  };
});
