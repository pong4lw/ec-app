// types/index.ts

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  tags?: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};
