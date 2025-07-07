import { Article, Sale } from "@/types/kermesse";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/types/kermesse";

interface SalesTableProps {
  articles: Article[];
  sales: Sale[];
  selectedCashRegister: string | 'all';
}

export const SalesTable = ({ articles, sales, selectedCashRegister }: SalesTableProps) => {
  const filteredSales = selectedCashRegister === 'all' 
    ? sales 
    : sales.filter(sale => sale.cashRegister === selectedCashRegister);

  const articleStats = articles.map(article => {
    const articleSales = filteredSales.filter(sale => sale.articleId === article.id);
    const totalRevenue = articleSales.length * article.price;
    const category = CATEGORIES.find(cat => cat.value === article.category);
    
    return {
      ...article,
      totalSales: articleSales.length,
      totalRevenue,
      category: category?.label || article.category
    };
  });

  const grandTotal = articleStats.reduce((total, article) => total + article.totalRevenue, 0);
  const totalSalesCount = articleStats.reduce((total, article) => total + article.totalSales, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          📊 Récapitulatif des ventes
          {selectedCashRegister !== 'all' && (
            <Badge variant="secondary" className="ml-2">
              {selectedCashRegister}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-center">Prix unitaire</TableHead>
              <TableHead className="text-center">Ventes</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articleStats.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{article.icon}</span>
                    {article.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-medium">
                  {article.price.toFixed(2)}€
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={article.totalSales > 0 ? "default" : "secondary"}>
                    {article.totalSales}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-bold text-primary">
                  {article.totalRevenue.toFixed(2)}€
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 p-4 bg-gradient-festive rounded-lg">
          <div className="flex justify-between items-center text-white">
            <div>
              <div className="text-lg font-bold">Total des ventes</div>
              <div className="text-sm opacity-90">{totalSalesCount} articles vendus</div>
            </div>
            <div className="text-3xl font-bold">
              {grandTotal.toFixed(2)}€
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};