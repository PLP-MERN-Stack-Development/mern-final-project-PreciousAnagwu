import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { storefrontApiRequest, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      loadProduct();
    }
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;

    const variant = product.variants.edges[selectedVariantIndex]?.node;
    if (!variant) {
      toast.error('Product variant not available');
      return;
    }

    const cartItem = {
      product: { node: product } as ShopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: product.title
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-24 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-24">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link to="/">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const mainImage = product.images.edges[0]?.node;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              {mainImage ? (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </span>
                {selectedVariant?.availableForSale && (
                  <Badge variant="secondary">In Stock</Badge>
                )}
              </div>
            </div>

            {product.description && (
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {product.variants.edges.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((variant, index) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariantIndex === index ? "default" : "outline"}
                      onClick={() => setSelectedVariantIndex(index)}
                      disabled={!variant.node.availableForSale}
                    >
                      {variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium">
                      {selectedVariant?.availableForSale ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  {selectedVariant?.selectedOptions.map((option) => (
                    <div key={option.name} className="flex justify-between">
                      <span className="text-muted-foreground">{option.name}:</span>
                      <span className="font-medium">{option.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
