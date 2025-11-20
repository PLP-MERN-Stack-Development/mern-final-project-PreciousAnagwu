import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/staticProducts';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const toggleCart = useCartStore(state => state.toggleCart);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    };
    addItem(cartItem);
    toast.success('Added to cart', { description: product.title });
    toggleCart();
  };

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition p-4">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />
      <CardContent>
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button onClick={handleAddToCart} className="hover:bg-primary/80 transition flex items-center">
            <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
