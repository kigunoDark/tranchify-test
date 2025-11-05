import { ErrorPage } from "@/pages/ErrorPage";

export function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      description="Oops! The page you're looking for doesn't exist. It might have been moved or deleted."
    />
  );
}
