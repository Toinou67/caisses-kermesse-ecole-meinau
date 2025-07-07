import { useState, useEffect } from "react";
import { Article, Sale, Category } from "@/types/kermesse";
import { ArticleCard } from "./ArticleCard";
import { CategoryFilter } from "./CategoryFilter";
import { SalesTable } from "./SalesTable";
import { ArticleForm } from "./ArticleForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, BarChart3, ShoppingCart, Settings } from "lucide-react";
import { mockArticles, mockSales } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import heroImage from "@/assets/kermesse-hero.jpg";

const CASH_REGISTERS = ['Caisse 1', 'Caisse 2', 'Caisse 3', 'Caisse 4'];

export const KermesseApp = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedCashRegister, setSelectedCashRegister] = useState<string>('Caisse 1');
  const [selectedCashRegisterForStats, setSelectedCashRegisterForStats] = useState<string | 'all'>('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');

  // Load from localStorage on mount
  useEffect(() => {
    const savedArticles = localStorage.getItem('kermesse-articles');
    const savedSales = localStorage.getItem('kermesse-sales');
    const savedCashRegister = localStorage.getItem('kermesse-cash-register');
    
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }
    if (savedCashRegister) {
      setSelectedCashRegister(savedCashRegister);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('kermesse-articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('kermesse-sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('kermesse-cash-register', selectedCashRegister);
  }, [selectedCashRegister]);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const handleSale = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    const newSale: Sale = {
      id: Date.now().toString(),
      articleId,
      articleName: article.name,
      price: article.price,
      timestamp: new Date(),
      cashRegister: selectedCashRegister
    };

    setSales(prev => [...prev, newSale]);
    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, sales: a.sales + 1 } : a
    ));

    toast({
      title: "Vente enregistrée! 🎉",
      description: `${article.name} - ${article.price.toFixed(2)}€ (${selectedCashRegister})`,
    });
  };

  const handleSaveArticle = (articleData: Omit<Article, 'id' | 'sales'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      sales: 0
    };
    setArticles(prev => [...prev, newArticle]);
    toast({
      title: "Article créé! ✨",
      description: `${articleData.name} a été ajouté`,
    });
  };

  const handleEditArticle = (article: Article) => {
    // TODO: Implement edit functionality
    console.log('Edit article:', article);
  };

  const handleDeleteArticle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    setArticles(prev => prev.filter(a => a.id !== articleId));
    setSales(prev => prev.filter(s => s.articleId !== articleId));
    
    toast({
      title: "Article supprimé",
      description: `${article.name} a été retiré`,
      variant: "destructive",
    });
  };

  const totalRevenue = sales
    .filter(sale => selectedCashRegisterForStats === 'all' || sale.cashRegister === selectedCashRegisterForStats)
    .reduce((total, sale) => total + sale.price, 0);

  const todaySalesCount = sales
    .filter(sale => selectedCashRegisterForStats === 'all' || sale.cashRegister === selectedCashRegisterForStats)
    .length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div 
          className="h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-festive/80"></div>
          <div className="relative z-10 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">🎪 Kermesse Manager</h1>
            <div className="flex items-center gap-4">
              <Select value={selectedCashRegister} onValueChange={setSelectedCashRegister}>
                <SelectTrigger className="w-40 bg-white/20 text-white border-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CASH_REGISTERS.map((register) => (
                    <SelectItem key={register} value={register}>
                      {register}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {todaySalesCount} ventes aujourd'hui
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {totalRevenue.toFixed(2)}€ total
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-card shadow-card-festive h-14">
            <TabsTrigger value="sales" className="h-12 text-lg font-medium">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ventes
            </TabsTrigger>
            <TabsTrigger value="stats" className="h-12 text-lg font-medium">
              <BarChart3 className="w-5 h-5 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={isEditMode ? "default" : "outline"}
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="h-12 px-6"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  {isEditMode ? 'Mode vente' : 'Mode édition'}
                </Button>
                {isEditMode && <ArticleForm onSave={handleSaveArticle} />}
              </div>
            </div>

            {/* Category Filter */}
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSale={handleSale}
                  onEdit={handleEditArticle}
                  onDelete={handleDeleteArticle}
                  isEditMode={isEditMode}
                />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">🎪</div>
                  <h3 className="text-xl font-semibold mb-2">Aucun article dans cette catégorie</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedCategory === 'all' 
                      ? 'Commencez par ajouter vos premiers articles'
                      : 'Essayez une autre catégorie ou ajoutez de nouveaux articles'
                    }
                  </p>
                  {isEditMode && <ArticleForm onSave={handleSaveArticle} />}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Tableau de bord</h2>
              <Select 
                value={selectedCashRegisterForStats} 
                onValueChange={setSelectedCashRegisterForStats}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les caisses</SelectItem>
                  {CASH_REGISTERS.map((register) => (
                    <SelectItem key={register} value={register}>
                      {register}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <SalesTable 
              articles={articles}
              sales={sales}
              selectedCashRegister={selectedCashRegisterForStats}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};