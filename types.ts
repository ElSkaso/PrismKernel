import { ReactNode } from 'react';

export interface Category {
  id: string;
  label: string;
  icon: ReactNode;
  color: string;
  options: string[];
}

export type Domain = 'image' | 'app' | 'free';

export interface CustomTagsState {
  [categoryId: string]: string[];
}