import { Button } from "@/components/ui/button";
import { Category } from "@/types/kermesse";
import { CategoryForm } from "./CategoryForm";

interface CategoryFilterProps {
  selectedCategory: string | 'all';
  onCategoryChange: (categoryId: string | 'all') => void;
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  categories, 
  onAddCategory 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      <Button
        variant={selectedCategory === 'all' ? "default" : "outline"}
        onClick={() => onCategoryChange('all')}
        className="h-12 px-6 font-medium"
      >
        🎪 Tout voir
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="h-12 px-6 font-medium"
        >
          {category.icon} {category.name}
        </Button>
      ))}
      
      <CategoryForm onSave={onAddCategory} />
    </div>
  );
};