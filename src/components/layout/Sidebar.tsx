import { useState, useEffect } from "react";
import { FilterPanel } from "@/components/products/FilterPanel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import type { FilterFormValues } from "@/schemas/filterSchema";

interface SidebarProps {
  onFilterChange: (filters: FilterFormValues) => void;
  categories: string[];
}

export function Sidebar({ onFilterChange, categories }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-4 right-4 z-50 shadow-lg md:hidden"
          aria-label="Open filters"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>

        <Dialog open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <DialogContent className="h-[90vh] max-w-sm p-0">
            <FilterPanel
              onFilterChange={(filters) => {
                onFilterChange(filters);
                setIsMobileOpen(false);
              }}
              categories={categories}
              onClose={() => setIsMobileOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-80 overflow-hidden border-r">
      <FilterPanel onFilterChange={onFilterChange} categories={categories} />
    </aside>
  );
}
