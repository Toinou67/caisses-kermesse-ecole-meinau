export interface Article {
  id: string;
  name: string;
  price: number;
  categoryId: string;
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

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CashRegister {
  id: string;
  name: string;
  totalSales: number;
}