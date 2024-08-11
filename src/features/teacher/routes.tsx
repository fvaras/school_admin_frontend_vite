import { Route, Routes } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { AddPlanningPage, AllPlanningsPage, EditPlanningPage } from "./plannings/pages";
import { AllHomeworksPage, AddHomeworkPage, EditHomeworkPage } from "./homeworks/pages";
import { TimeTablePage } from "./timetables/pages";

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="plannings/timetable" element={<TimeTablePage />} />

                <Route path="plannings/all-plannings" element={<AllPlanningsPage />} />
                <Route path="plannings/add-planning" element={<AddPlanningPage />} />
                <Route path="plannings/:planningId" element={<EditPlanningPage />} />

                <Route path="homeworks/all-homeworks" element={<AllHomeworksPage />} />
                <Route path="homeworks/add-homework" element={<AddHomeworkPage />} />
                <Route path="homeworks/:homeworkId" element={<EditHomeworkPage />} />
            </Route>
        </Routes>
    );
};

export default TeacherRoutes;
