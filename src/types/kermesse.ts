export interface Article {
  id: string;
  name: string;
  price: number;
  category: Category;
  icon: string;
  sales: number;
}

export interface Sale {
  id: string;
  articleId: string;
  articleName: string;
  price: number;
  timestamp: Date;
  cashRegister: string;
}

export type Category = 'boissons' | 'nourriture' | 'jeux' | 'activités' | 'autre';

export interface CashRegister {
  id: string;
  name: string;
  totalSales: number;
}

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'boissons', label: '🥤 Boissons', color: 'accent' },
  { value: 'nourriture', label: '🍿 Nourriture', color: 'festive-orange' },
  { value: 'jeux', label: '🎯 Jeux', color: 'primary' },
  { value: 'activités', label: '🎪 Activités', color: 'festive-purple' },
  { value: 'autre', label: '🎈 Autre', color: 'festive-green' },
];