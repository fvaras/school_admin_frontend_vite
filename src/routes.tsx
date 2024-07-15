import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

const AuthRoutes = lazy(() => import("./features/auth/routes"));
const AdminRoutes = lazy(() => import("./features/admin/routes"));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          path="auth/*"
          element={
            <Suspense fallback={<div>Loading Auth Routes...</div>}>
              <AuthRoutes />
            </Suspense>
          }
        />
        <Route
          path="admin/*"
          element={
            <Suspense fallback={<div>Loading Admin Routes...</div>}>
              <AdminRoutes />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
