import { db, auth } from "@/lib/firebase";
import { doc, collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { CartItem } from "@/lib/firestore/cart";

export const saveOrder = async (items: CartItem[]) => {
  const user = auth.currentUser;
  if (!user) return;

  const colRef = collection(db, "orders", user.uid, "list");
  await addDoc(colRef, {
    items,
    createdAt: Timestamp.now(),
  });
};

export const fetchOrderHistory = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const colRef = collection(db, "orders", user.uid, "list");
  const snap = await getDocs(colRef);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
