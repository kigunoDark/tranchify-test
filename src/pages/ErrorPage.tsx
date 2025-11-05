import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface ErrorPageProps {
  code?: string | number;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function ErrorPage({
  code,
  title,
  description,
  actionLabel = "Go Back Home",
  actionTo = "/",
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        {code && (
          <h1 className="mb-2 text-6xl font-bold text-primary">{code}</h1>
        )}

        <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          {description}
        </p>

        <Link to={actionTo}>
          <Button size="lg">
            <Home className="mr-2 h-5 w-5" />
            {actionLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
