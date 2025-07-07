import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Category, CATEGORIES } from "@/types/kermesse";

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === 'all' ? "default" : "outline"}
        onClick={() => onCategoryChange('all')}
        className="h-12 px-6 font-medium"
      >
        🎪 Tout voir
      </Button>
      
      {CATEGORIES.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          onClick={() => onCategoryChange(category.value)}
          className="h-12 px-6 font-medium"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};