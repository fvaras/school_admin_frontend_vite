import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/navigation/PrivateRoute";
import { ADMINISTRATOR_PROFILE_ID, TEACHER_PROFILE_ID } from "./constants/profile";

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
              <PrivateRoute allowedProfiles={[ADMINISTRATOR_PROFILE_ID]}>
                <AdminRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="teacher/*"
          element={
            <Suspense fallback={<div>Loading Teacher Routes...</div>}>
              {/* TODO: Delete ADMINISTRATOR_PROFILE_ID */}
              <PrivateRoute allowedProfiles={[TEACHER_PROFILE_ID, ADMINISTRATOR_PROFILE_ID]}>
                <TeacherRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
