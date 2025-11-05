import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProduct, useProductEdit } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { editSchema, type EditFormValues } from "@/schemas/editSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { product, loading, error } = useProduct(id!);
  const { getEditedProduct, saveEdit } = useProductEdit(Number(id));

  const displayProduct = product ? getEditedProduct(product) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    values: displayProduct
      ? {
          title: displayProduct.title,
          price: displayProduct.price,
          rating: displayProduct.rating,
          discountPercentage: displayProduct.discountPercentage,
          description: displayProduct.description,
        }
      : undefined,
  });

  if (!isAuthenticated) {
    return <Navigate to={`/product/${id}`} replace />;
  }

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
            The product you're trying to edit doesn't exist.
          </p>
          <Button onClick={() => navigate("/")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (data: EditFormValues) => {
    saveEdit(data);
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(`/product/${id}`)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Cancel
      </Button>

      <div className="rounded-lg border bg-background p-6">
        <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-600">*</span>
            </Label>
            <Input id="title" {...register("title")} aria-required="true" />
            {errors.title && (
              <p className="text-sm text-red-600" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">
              Price <span className="text-red-600">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              aria-required="true"
            />
            {errors.price && (
              <p className="text-sm text-red-600" role="alert">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (0-5)</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating", { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className="text-sm text-red-600" role="alert">
                {errors.rating.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountPercentage">
              Discount Percentage (0-100)
            </Label>
            <Input
              id="discountPercentage"
              type="number"
              step="0.1"
              min="0"
              max="100"
              {...register("discountPercentage", { valueAsNumber: true })}
            />
            {errors.discountPercentage && (
              <p className="text-sm text-red-600" role="alert">
                {errors.discountPercentage.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter product description..."
            />
            {errors.description && (
              <p className="text-sm text-red-600" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 border-t pt-6">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/product/${id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
