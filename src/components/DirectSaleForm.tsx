import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface DirectSaleFormProps {
  onAddSale: (articleName: string, price: number) => void;
}

export const DirectSaleForm = ({ onAddSale }: DirectSaleFormProps) => {
  const [articleName, setArticleName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (articleName.trim() && price.trim()) {
      const parsedPrice = parseFloat(price);
      if (!isNaN(parsedPrice) && parsedPrice > 0) {
        onAddSale(articleName.trim(), parsedPrice);
        setArticleName("");
        setPrice("");
      }
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary">
          ➕ Ajouter une vente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="articleName">Nom de l'article</Label>
            <Input
              id="articleName"
              value={articleName}
              onChange={(e) => setArticleName(e.target.value)}
              placeholder="Ex: Coca Cola"
              required
            />
          </div>
          <div className="w-32">
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2.50"
              required
            />
          </div>
          <Button type="submit" className="h-10">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};