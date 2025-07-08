import { Article, Category } from "@/types/kermesse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  onSale: (articleId: string) => void;
  onEdit?: (article: Article) => void;
  onDelete?: (articleId: string) => void;
  isEditMode?: boolean;
  categories: Category[];
}

export const ArticleCard = ({ 
  article, 
  onSale, 
  onEdit, 
  onDelete, 
  isEditMode = false,
  categories 
}: ArticleCardProps) => {
  const category = categories.find(cat => cat.id === article.categoryId);
  
  return (
    <Card className="shadow-card-festive hover:shadow-festive transition-all duration-300 hover:scale-105 relative group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-4xl mb-2">{article.icon}</div>
          {category && (
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-secondary/20"
            >
              {category.icon} {category.name}
            </Badge>
          )}
        </div>
        <h3 className="font-bold text-lg text-center text-foreground leading-tight">
          {article.name}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-primary mb-1">
            {article.price.toFixed(2)}€
          </div>
          <div className="text-sm text-muted-foreground">
            {article.sales} ventes
          </div>
        </div>

        {isEditMode ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(article)}
              className="flex-1"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(article.id)}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => onSale(article.id)}
            className="w-full h-12 text-lg font-bold bg-gradient-festive hover:scale-105 transition-transform shadow-festive"
            size="lg"
          >
            <Plus className="w-6 h-6 mr-2" />
            Vendre
          </Button>
        )}
      </CardContent>
    </Card>
  );
};