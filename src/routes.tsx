import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

const AuthRoutes = lazy(() => import("./features/auth/routes"));
const AdminRoutes = lazy(() => import("./features/admin/routes"));
const TeacherRoutes = lazy(() => import("./features/teacher/routes"));

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
        <Route
          path="teacher/*"
          element={
            <Suspense fallback={<div>Loading Teacher Routes...</div>}>
              <TeacherRoutes />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
