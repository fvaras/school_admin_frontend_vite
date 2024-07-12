import { Route, Routes } from "react-router-dom"
import AllUsersPage from "./pages/AllUsersPage";
import MainLayout from "../../layouts/MainLayout";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="users/all-users" element={<AllUsersPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
