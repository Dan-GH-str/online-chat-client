import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./styles/App.css"
import { AuthProvider } from "./Context/AuthContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    function setVhProperty() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    // Устанавливаем переменную при загрузке
    setVhProperty()

    // // Добавляем обработчик resize
    // window.addEventListener('resize', setVhProperty)

    // // Чистим обработчик при размонтировании
    // return () => {
    //   window.removeEventListener('resize', setVhProperty)
    // }
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;