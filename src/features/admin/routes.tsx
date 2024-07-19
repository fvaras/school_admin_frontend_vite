import { Route, Routes } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { AddUserPage, EditUserPage, AllUsersPage } from "./users/pages";
import { AllTeachersPage, AddTeacherPage, EditTeacherPage } from "./teachers/pages";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                
                <Route path="users/all-users" element={<AllUsersPage />} />
                <Route path="users/add-user" element={<AddUserPage />} />
                <Route path="users/:userId" element={<EditUserPage />} />

                <Route path="teachers/all-teachers" element={<AllTeachersPage />} />
                <Route path="teachers/add-teacher" element={<AddTeacherPage />} />
                <Route path="teachers/:teacherId" element={<EditTeacherPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
