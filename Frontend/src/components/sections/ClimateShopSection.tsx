// src/components/ClimateShopSection.tsx
import { staticProducts } from '@/data/staticProducts';
import ProductCard from '../ProductCard';

export default function ClimateShopSection() {
  return (
    <section id="shop" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Climate Action Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eco-friendly products to protect yourself and contribute to a cleaner environment
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
