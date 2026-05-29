export interface Product {
  id: number;
  name: string;
  url: string;
  price: string;
  image: string | null;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onBuyClick: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onBuyClick, index }: ProductCardProps) {
  return (
    <div
      className="product-card-wrapper"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="product-card">
        <div className="card-shine" />
        
        <div className="card-image-wrapper">
          {product.image ? (
            <>
              <img
                src={product.image.startsWith('/') ? `${import.meta.env.BASE_URL}${product.image.slice(1)}` : product.image}
                alt={product.name}
                className="card-image"
                loading="lazy"
              />
              <div className="card-image-overlay" />
            </>
          ) : (
            <div className="card-no-image">No Image</div>
          )}
        </div>
        
        <div className="card-info">
          <span className="card-name">{product.name}</span>
          <div className="card-bottom">
            <span className="card-price">{product.price}</span>
            <button
              className="card-buy-btn"
              onClick={(e) => {
                e.stopPropagation();
                onBuyClick(product);
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
