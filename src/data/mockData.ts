import { Article, Sale, Category } from "@/types/kermesse";

export const mockArticles: Article[] = [];

export const mockCategories: Category[] = [
  { id: '1', name: 'Boissons', icon: '🥤', color: 'accent' },
  { id: '2', name: 'Nourriture', icon: '🍿', color: 'festive-orange' },
  { id: '3', name: 'Jeux', icon: '🎯', color: 'primary' },
  { id: '4', name: 'Activités', icon: '🎪', color: 'festive-purple' },
  { id: '5', name: 'Autre', icon: '🎈', color: 'festive-green' },
];

export const mockSales: Sale[] = [
  {
    id: '1',
    articleId: '1',
    articleName: 'Coca Cola',
    price: 2.50,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    cashRegister: 'Caisse 1'
  },
  {
    id: '2',
    articleId: '3',
    articleName: 'Chamboule-tout',
    price: 3.00,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    cashRegister: 'Caisse 2'
  },
  {
    id: '3',
    articleId: '6',
    articleName: 'Bière',
    price: 3.50,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    cashRegister: 'Caisse 1'
  }
];