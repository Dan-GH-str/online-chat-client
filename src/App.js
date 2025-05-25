import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./styles/App.css"
import { AuthProvider } from "./Context/AuthContext";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   // Функция для установки значения переменной --vh, чтобы высота экрана не уменьшалась при открытии клавиатуры с телефонов
  //   function setVhProperty() {
  //     const vh = window.innerHeight * 0.01
  //     document.documentElement.style.setProperty('--vh', `${vh}px`)
  //   }

  //   // Устанавливаем переменную при загрузке
  //   setVhProperty()
  // }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;