import { Suspense, lazy, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/navigation/PrivateRoute";
import { ADMINISTRATOR_PROFILE_ID, GUARDIAN_PROFILE_ID, STUDENT_PROFILE_ID, TEACHER_PROFILE_ID } from "./constants/profile";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { relogIn } from "./store/slices/authSlice";

const AuthRoutes = lazy(() => import("./features/auth/routes"));
const AdminRoutes = lazy(() => import("./features/admin/routes"));
const TeacherRoutes = lazy(() => import("./features/teacher/routes"));
const StudentRoutes = lazy(() => import("./features/student/routes"));
const GuardianRoutes = lazy(() => import("./features/guardian/routes"));

const MainRoutes = () => {

  const dispatch = useAppDispatch()

  const { authStarted } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch((relogIn()))
  }, [])

  if (!authStarted) {
    // TODO: Stylize
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/signin" replace />} />
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
            <PrivateRoute allowedProfiles={[TEACHER_PROFILE_ID]}>
              <TeacherRoutes />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="student/*"
        element={
          <Suspense fallback={<div>Loading Student Routes...</div>}>
            <PrivateRoute allowedProfiles={[STUDENT_PROFILE_ID]}>
              <StudentRoutes />
            </PrivateRoute>
          </Suspense>
        }
      />
      <Route
        path="guardian/*"
        element={
          <Suspense fallback={<div>Loading Student Routes...</div>}>
            <PrivateRoute allowedProfiles={[GUARDIAN_PROFILE_ID]}>
              <GuardianRoutes />
            </PrivateRoute>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
