import { Route, Routes } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { AddUserPage, EditUserPage, AllUsersPage } from "./users/pages";
import { AllTeachersPage, AddTeacherPage, EditTeacherPage } from "./teachers/pages";
import { AllStudentsPage, AddStudentPage, EditStudentPage } from "./students/pages";
import { AllGuardiansPage, AddGuardianPage, EditGuardianPage } from "./guardians/pages";

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

                <Route path="students/all-students" element={<AllStudentsPage />} />
                <Route path="students/add-student" element={<AddStudentPage />} />
                <Route path="students/:studentId" element={<EditStudentPage />} />

                <Route path="guardians/all-guardians" element={<AllGuardiansPage />} />
                <Route path="guardians/add-guardian" element={<AddGuardianPage />} />
                <Route path="guardians/:guardianId" element={<EditGuardianPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
