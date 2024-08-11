import { Route, Routes } from "react-router-dom"
import MainLayout from "../../layouts/MainLayout"
import { AllPlanningsPage } from "./plannings/pages";
import { AllHomeworksPage } from "./homeworks/pages";
import { TimeTablePage } from "./timetables/pages";

const StudentRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="plannings/timetable" element={<TimeTablePage />} />

                <Route path="plannings/all-plannings" element={<AllPlanningsPage />} />

                <Route path="homeworks/all-homeworks" element={<AllHomeworksPage />} />
            </Route>
        </Routes>
    );
};

export default StudentRoutes;
