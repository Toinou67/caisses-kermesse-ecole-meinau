import { Article, Sale } from "@/types/kermesse";

export const mockArticles: Article[] = [];

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