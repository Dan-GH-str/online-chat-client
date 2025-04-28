import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) // Изначально пользователь не аутентифицирован

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    // Попытка загрузки из localStorage при инициализации
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}