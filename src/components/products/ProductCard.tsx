import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-lg border border-border bg-background p-4 transition-all hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden rounded-md bg-muted">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold line-clamp-2" title={product.title}>
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.rating !== undefined && (
            <div
              className="flex items-center gap-1 text-sm"
              aria-label={`Rating: ${product.rating} out of 5`}
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {product.discountPercentage !== undefined &&
          product.discountPercentage > 0 && (
            <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
              {product.discountPercentage.toFixed(0)}% OFF
            </span>
          )}
      </div>
    </Link>
  );
}
