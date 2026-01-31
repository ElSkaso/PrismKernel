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

export interface DomainState {
  categories: Category[];
  selectedTags: Set<string>;
  customTags: CustomTagsState;
}

export interface AppState {
  selectedDomain: Domain;
  subject: string;
  image: DomainState;
  app: DomainState;
  free: DomainState;
}

export type Action =
  | { type: 'SET_DOMAIN'; domain: Domain }
  | { type: 'SET_SUBJECT'; subject: string }
  | { type: 'TOGGLE_TAG'; option: string }
  | { type: 'ADD_CUSTOM_TAG'; categoryId: string; tag: string }
  | { type: 'REMOVE_CUSTOM_TAG'; categoryId: string; tag: string }
  | { type: 'CREATE_CATEGORY'; name: string; icon: ReactNode }
  | { type: 'RESET_DOMAIN' };
