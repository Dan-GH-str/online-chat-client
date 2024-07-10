import { useNavigate } from "react-router-dom"
import cl from "./ChatHeaderComponent.module.css"
import { useState, useEffect } from "react"

const ChatHeaderComponent = ({ params, socket }) => {
    const navigate = useNavigate()
    const [usersCount, setUsersCount] = useState(0)

    const leftRoom = () => {
        socket.emit('leftRoom', params)
        navigate('/')
    }

    const insertEnding = (count) => {
        if (count % 10 === 1) return 'ь'
        else if ([2, 3, 4].includes(count % 10)) return 'я'
        else return 'ей'  
    }

    useEffect(() => {
        // Присоединение кого-либо из пользователей к комнате
        socket.on('joinRoom', ({ data }) => {
            setUsersCount(data.users.length)
        })

        // кто-либо из пользователей покинул комнату
        socket.on('leftRoom', ({ data }) => {
            setUsersCount(data.users.length)
        })
    }, [socket])

    return (
        <div className={cl.header}>
            <div className={cl.title}>{params.room}</div>
            <div className={cl.users}>{usersCount} пользовател{insertEnding(usersCount)} в комнате</div>
            <button className={cl.left} onClick={leftRoom}>Покинуть комнату</button>
        </div>
    )
}

export default ChatHeaderComponent