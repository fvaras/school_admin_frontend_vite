import { Route, Routes } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import LoginPage from "./pages/LoginPage";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="signin" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};

export default AuthRoutes;
