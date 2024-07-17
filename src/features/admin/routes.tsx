import { Route, Routes } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { AddUserPage, AllUsersPage } from "./users/pages";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="users/all-users" element={<AllUsersPage />} />
                <Route path="users/add-user" element={<AddUserPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
