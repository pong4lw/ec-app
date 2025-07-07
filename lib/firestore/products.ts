import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryId?: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const colRef = collection(db, 'products');
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};
