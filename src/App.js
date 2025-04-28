import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./styles/App.css"
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;