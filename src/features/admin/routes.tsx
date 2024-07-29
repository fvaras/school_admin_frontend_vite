import { Route, Routes } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { AddUserPage, EditUserPage, AllUsersPage } from "./users/pages";
import { AllTeachersPage, AddTeacherPage, EditTeacherPage } from "./teachers/pages";
import { AllStudentsPage, AddStudentPage, EditStudentPage } from "./students/pages";
import { AllGuardiansPage, AddGuardianPage, EditGuardianPage } from "./guardians/pages";
import { AllGradesPage, AddGradePage, EditGradePage } from "./grades/pages";
import { AddSubjectPage, AllSubjectsPage, EditSubjectPage } from "./subjects/pages";
import { AddEventPage, AllEventsPage, EditEventPage, CalendarPage } from "./events/pages";

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

                <Route path="grades/all-grades" element={<AllGradesPage />} />
                <Route path="grades/add-grade" element={<AddGradePage />} />
                <Route path="grades/:gradeId" element={<EditGradePage />} />

                <Route path="subjects/all-subjects" element={<AllSubjectsPage />} />
                <Route path="subjects/add-subject" element={<AddSubjectPage />} />
                <Route path="subjects/:subjectId" element={<EditSubjectPage />} />

                <Route path="events/all-events" element={<AllEventsPage />} />
                <Route path="events/add-event" element={<AddEventPage />} />
                <Route path="events/:eventId" element={<EditEventPage />} />
                <Route path="events/calendar" element={<CalendarPage />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
