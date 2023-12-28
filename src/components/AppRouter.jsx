import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import Chat from "../pages/Chat/Chat";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" Component={Main}/>
            <Route path="/chat" Component={Chat}/>
        </Routes>
    )
}

export default AppRouter