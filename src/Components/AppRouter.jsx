import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../pages/Main/Main";
import Chat from "../pages/Chat/Chat";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route 
                path="*"
                element={<Navigate replace to="/"/>}
            />
        </Routes>
    )
}

export default AppRouter