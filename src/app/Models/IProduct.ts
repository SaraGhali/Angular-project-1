import { ICategory } from './ICategory';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ICategory;
  quantity?: number; // Optional as it might be used in cart logic
}