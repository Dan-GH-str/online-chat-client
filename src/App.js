import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./styles/App.css"

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;