import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProduct, useProductEdit } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Edit,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { product, loading, error } = useProduct(id!);
  const { getEditedProduct } = useProductEdit(Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          aria-label="Loading product"
        />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Product Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/" className="mt-4 inline-block">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayProduct = getEditedProduct(product);
  const images = displayProduct.images || [displayProduct.thumbnail];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <ProductImage
              src={images[currentImageIndex]}
              alt={displayProduct.title}
              priority={true}
              className="h-full w-full object-cover"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded border-2 ${
                    idx === currentImageIndex
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <ProductImage
                    src={img}
                    priority={true}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{displayProduct.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {displayProduct.category}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">
              ${displayProduct.price.toFixed(2)}
            </span>
            {displayProduct.discountPercentage !== undefined &&
              displayProduct.discountPercentage > 0 && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                  {displayProduct.discountPercentage.toFixed(0)}% OFF
                </span>
              )}
          </div>

          {displayProduct.rating !== undefined && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {displayProduct.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">
                ({displayProduct.rating} out of 5)
              </span>
            </div>
          )}

          {displayProduct.brand && (
            <div>
              <span className="font-semibold">Brand:</span>{" "}
              {displayProduct.brand}
            </div>
          )}

          {displayProduct.stock !== undefined && (
            <div>
              <span className="font-semibold">Stock:</span>{" "}
              <span
                className={
                  displayProduct.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {displayProduct.stock > 0
                  ? `${displayProduct.stock} available`
                  : "Out of stock"}
              </span>
            </div>
          )}

          <div>
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">
              {displayProduct.description}
            </p>
          </div>

          {displayProduct.tags && displayProduct.tags.length > 0 && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {displayProduct.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isAuthenticated && (
            <Button
              onClick={() => navigate(`/product/${id}/edit`)}
              className="w-full"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
