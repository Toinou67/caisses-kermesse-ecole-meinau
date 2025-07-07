import { Article, Sale } from "@/types/kermesse";

export const mockArticles: Article[] = [
  {
    id: '1',
    name: 'Coca Cola',
    price: 2.50,
    category: 'boissons',
    icon: '🥤',
    sales: 15
  },
  {
    id: '2',
    name: 'Hot Dog',
    price: 4.00,
    category: 'nourriture',
    icon: '🌭',
    sales: 8
  },
  {
    id: '3',
    name: 'Chamboule-tout',
    price: 3.00,
    category: 'jeux',
    icon: '🎯',
    sales: 12
  },
  {
    id: '4',
    name: 'Barbe à papa',
    price: 2.00,
    category: 'nourriture',
    icon: '🍭',
    sales: 20
  },
  {
    id: '5',
    name: 'Pêche aux canards',
    price: 2.50,
    category: 'jeux',
    icon: '🦆',
    sales: 18
  },
  {
    id: '6',
    name: 'Bière',
    price: 3.50,
    category: 'boissons',
    icon: '🍺',
    sales: 25
  },
  {
    id: '7',
    name: 'Maquillage',
    price: 5.00,
    category: 'activités',
    icon: '🎨',
    sales: 6
  },
  {
    id: '8',
    name: 'Popcorn',
    price: 1.50,
    category: 'nourriture',
    icon: '🍿',
    sales: 30
  }
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