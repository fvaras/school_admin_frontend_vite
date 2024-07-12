import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import LeftImageLayout from "../../layouts/LeftImageLayout"

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LeftImageLayout />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="signin" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};

export default AuthRoutes;
