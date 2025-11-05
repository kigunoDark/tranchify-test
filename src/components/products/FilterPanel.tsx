import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterSchema, type FilterFormValues } from "@/schemas/filterSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (filters: FilterFormValues) => void;
  categories: string[];
  onClose?: () => void;
}

export function FilterPanel({
  onFilterChange,
  categories,
  onClose,
}: FilterPanelProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: "",
      categories: [],
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      discountedOnly: false,
      minDiscountPercent: undefined,
    },
  });

  const watchDiscountedOnly = watch("discountedOnly");
  const watchMinPrice = watch("minPrice");
  const watchCategories = watch("categories") || [];

  const onSubmit = (data: FilterFormValues) => {
    onFilterChange(data);
  };

  const handleReset = () => {
    reset();
    onFilterChange({});
  };

  const toggleCategory = (category: string) => {
    const current = watchCategories;
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    setValue("categories", updated);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 space-y-6 overflow-y-auto p-4"
      >
        <div className="space-y-2">
          <Label htmlFor="search">Search by title</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            {...register("search")}
            aria-label="Search products by title"
          />
        </div>

        <div className="space-y-2">
          <Label>Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={watchCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  aria-label={`Filter by ${category}`}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min"
                step="0.01"
                {...register("minPrice", { valueAsNumber: true })}
                aria-label="Minimum price"
              />
            </div>
            <div>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max"
                step="0.01"
                disabled={
                  watchMinPrice === undefined ||
                  watchMinPrice === null ||
                  isNaN(watchMinPrice)
                }
                {...register("maxPrice", { valueAsNumber: true })}
                aria-label="Maximum price"
              />
            </div>
          </div>
          {errors.maxPrice && (
            <p className="text-sm text-red-600" role="alert">
              {errors.maxPrice.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <RadioGroup
            value={watch("rating") || ""}
            onValueChange={(value) => setValue("rating", value || undefined)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="rating-all" />
              <Label htmlFor="rating-all" className="font-normal">
                All
              </Label>
            </div>
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={rating.toString()}
                  id={`rating-${rating}`}
                />
                <Label htmlFor={`rating-${rating}`} className="font-normal">
                  {rating}+ stars
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="discountedOnly"
              checked={watchDiscountedOnly}
              onCheckedChange={(checked) =>
                setValue("discountedOnly", checked as boolean)
              }
              aria-label="Show only discounted products"
            />
            <Label htmlFor="discountedOnly" className="font-normal">
              Discounted only
            </Label>
          </div>
          {watchDiscountedOnly && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="minDiscountPercent">Min discount %</Label>
              <Input
                id="minDiscountPercent"
                type="number"
                placeholder="0"
                min="0"
                max="100"
                {...register("minDiscountPercent", { valueAsNumber: true })}
                aria-label="Minimum discount percentage"
              />
            </div>
          )}
        </div>

        <div className="space-y-2 border-t pt-4">
          <Button type="submit" className="w-full">
            Apply Filters
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>
      </form>
    </div>
  );
}
