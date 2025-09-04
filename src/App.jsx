import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrainsPage from "./pages/TrainsPage";
import { SearchFormProvider } from "./context/SearchFormContext";

export default function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route index element={<HomePage />} />
        <Route path="/trains" element={<TrainsPage />} />
      </Route>
    ),
    { basename: "/fe-diplom-final/" }
  );

  return (
    <SearchFormProvider>
      <RouterProvider router={routes} />
    </SearchFormProvider>
  );
}
