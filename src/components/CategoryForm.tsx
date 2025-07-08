import { useState } from "react";
import { Category } from "@/types/kermesse";
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

interface CategoryFormProps {
  onSave: (category: Omit<Category, 'id'>) => void;
  trigger?: React.ReactNode;
}

const EXTENDED_EMOJI_OPTIONS = [
  // Boissons
  '🥤', '🍺', '🧃', '☕', '🧊', '🍷', '🥂', '🍸', '🍹', '🧉', '🍵', '🥛', '🍶', '🥃', '🧋',
  // Nourriture
  '🍿', '🌭', '🍔', '🍕', '🧁', '🍩', '🍪', '🍎', '🍌', '🍊', '🍓', '🥨', '🥖', '🧀', '🥪', '🌮', '🍜', '🍝', '🥗', '🍛', '🍣', '🍤', '🍙', '🥟', '🍱', '🍘', '🥧', '🍰', '🎂', '🍫', '🍬', '🍭',
  // Jeux & Activités
  '🎯', '🎮', '🎲', '🎳', '🎪', '🎨', '🎭', '🎠', '🎡', '🎢', '🎊', '🎈', '🎁', '🏆', '🎖️', '🏅', '🎸', '🥁', '🎺', '🎷', '🎻', '🎤', '🎧', '🎬', '🎭', '🃏', '🎰',
  // Objets divers
  '⭐', '🌟', '✨', '🎉', '🔥', '💫', '🎵', '🎶', '💎', '🏀', '⚽', '🏈', '🎾', '🏐', '🏓', '🏸', '🥏', '🏒', '🏑', '🥍', '🏏', '⛳', '🏹', '🎣', '🥊', '🥋', '🎪', '🎭', '🎨', '🎬', '📚', '📖', '📝', '📊', '📈', '📉', '💰', '💳', '🎫', '🎟️', '🏷️',
  // Nature & Animaux
  '🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌿', '🍀', '🍃', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵',
  // Transport & Véhicules
  '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🚁', '✈️', '🚀', '🛸', '⛵', '🚤', '🛥️', '🚢',
  // Symboles & Formes
  '❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎', '💗', '💖', '💕', '💓', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'
];

const COLOR_OPTIONS = [
  { value: 'primary', label: 'Rouge festif', color: 'hsl(var(--primary))' },
  { value: 'secondary', label: 'Jaune soleil', color: 'hsl(var(--secondary))' },
  { value: 'accent', label: 'Bleu ciel', color: 'hsl(var(--accent))' },
  { value: 'festive-green', label: 'Vert festif', color: 'hsl(var(--festive-green))' },
  { value: 'festive-orange', label: 'Orange festif', color: 'hsl(var(--festive-orange))' },
  { value: 'festive-purple', label: 'Violet festif', color: 'hsl(var(--festive-purple))' },
];

export const CategoryForm = ({ onSave, trigger }: CategoryFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: '🎪',
    color: 'primary'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      setFormData({ name: '', icon: '🎪', color: 'primary' });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle catégorie
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de la catégorie</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Boissons"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="color">Couleur</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData({ ...formData, color: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border" 
                        style={{ backgroundColor: color.color }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="icon">Icône</Label>
            <div className="flex flex-wrap gap-1 mt-2 p-3 border rounded-md max-h-48 overflow-y-auto">
              {EXTENDED_EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`text-xl p-1.5 rounded-md transition-colors hover:bg-muted ${
                    formData.icon === emoji 
                      ? 'bg-primary text-primary-foreground' 
                      : ''
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
              Créer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};