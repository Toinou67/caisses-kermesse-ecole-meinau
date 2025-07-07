import { useState } from "react";
import { Article, Category, CATEGORIES } from "@/types/kermesse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface ArticleFormProps {
  article?: Article;
  onSave: (article: Omit<Article, 'id' | 'sales'>) => void;
  trigger?: React.ReactNode;
}

const EMOJI_OPTIONS = [
  '🥤', '🍺', '🧃', '☕', '🧊', // Boissons
  '🍿', '🌭', '🍔', '🍕', '🧁', '🍩', '🍪', '🍎', // Nourriture
  '🎯', '🎮', '🎲', '🎳', '🎪', '🎨', '🎭', // Jeux
  '🎠', '🎡', '🎢', '🎊', '🎈', '🎁', '🏆', // Activités
  '⭐', '🌟', '✨', '🎉', '🔥', '💫', '🎵' // Autre
];

export const ArticleForm = ({ article, onSave, trigger }: ArticleFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: article?.name || '',
    price: article?.price || 0,
    category: article?.category || 'autre' as Category,
    icon: article?.icon || '🎈'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price > 0) {
      onSave(formData);
      if (!article) {
        setFormData({ name: '', price: 0, category: 'autre', icon: '🎈' });
      }
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="h-12 px-6 bg-gradient-festive hover:scale-105 transition-transform shadow-festive">
            <Plus className="w-5 h-5 mr-2" />
            Nouvel article
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {article ? 'Modifier l\'article' : 'Nouvel article'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de l'article</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Coca Cola"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="2.50"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="icon">Icône</Label>
            <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-md">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`text-2xl p-2 rounded-md transition-colors ${
                    formData.icon === emoji 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-muted'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-festive">
              {article ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};