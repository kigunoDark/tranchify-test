import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { ListingPage } from "@/pages/ListingPage";
import { DetailPage } from "@/pages/DetailPage";
import { EditPage } from "@/pages/EditPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ListingPage />,
      },
      {
        path: "product/:id",
        element: <DetailPage />,
      },
      {
        path: "product/:id/edit",
        element: <EditPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
