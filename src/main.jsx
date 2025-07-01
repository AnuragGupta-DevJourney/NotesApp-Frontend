import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Loader from "./components/Loader.jsx";
// import EditPage from "./pages/EditPage.jsx";
// import CreatePage from "./pages/CreatePage.jsx";

const CreatePage = lazy(() => import("./pages/CreatePage.jsx"));
const EditPage = lazy(() => import("./pages/EditPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/edit/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <EditPage />
      </Suspense>
    ),
  },
  {
    path: "/create",
    element: (
      <Suspense fallback={<Loader />}>
        <CreatePage />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
