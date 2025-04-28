import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../pages/Main/Main";
import Chat from "../pages/Chat/Chat";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";
import Login from "./Login/Login";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/main" element={<ProtectedRoute element={Main}/>}/>
            <Route path="/chat" element={<ProtectedRoute element={Chat}/>}/>
            <Route 
                path="*"
                element={<Navigate replace to="/register"/>}
            />
        </Routes>
    )
}

export default AppRouter