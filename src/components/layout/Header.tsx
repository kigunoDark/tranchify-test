import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Package } from "lucide-react";

export function Header() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header className="relative sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span className="text-xl">Tranchify Store</span>
        </Link>

        <div className="absolute right-4">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              aria-label="Logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={login}
              aria-label="Login"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
