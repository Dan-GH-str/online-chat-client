import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

const Logout = () => {
    const { navigate } = useNavigate()

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')
            navigate('/login')
        } catch (error) {
            console.error(error)
            alert('Ошибка при выходе из системы')
        }
    }

    return (
        <button onClick={handleLogout}>Выйти</button>
    )
}

export default Logout