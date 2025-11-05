import { useState, useCallback } from "react";

interface ProductImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    setImageError(true);
    setIsLoaded(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (imageError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
      >
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}