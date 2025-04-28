import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../API/api'

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/api/protected') // Запрос к защищенному роуту

        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Ошибка при проверке аутентификации:", error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <div>Загрузка...</div>
  }

  else if (isAuthenticated === false) {
    return <Navigate to="/login" replace />
  }

  return (
    <Element {...rest} />
  )
}

export default ProtectedRoute