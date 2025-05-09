import { useNavigate } from "react-router-dom"
import VerticalDotsDropdown from "../../../Components/UI/VerticalDotsDropdown/VerticalDotsDropdown"
import cl from "./ChatHeaderComponent.module.css"
import { useState, useEffect } from "react"
import ArrowBackButton from "../../../Components/UI/ArrowBackButton/ArrowBackButton"

const ChatHeaderComponent = ({ params, socket }) => {
    const [usersCount, setUsersCount] = useState(0)
    const navigate = useNavigate()
    const options = [{ key: '1', label: 'Вернуться назад' }, { key: '2', label: 'Покинуть комнату' }]

    const goBack = () => {
        navigate('/main')
    }

    const leftRoom = () => {
        socket.emit('leftRoom', params)
        navigate('/main')
    }

    const handleSelect = (eventKey) => {
        switch (eventKey) {
            case "1":
                goBack()
                break
            case "2":
                leftRoom()
                break
            default:
                break
        }
    }

    const insertEnding = (count) => {
        if (count % 10 === 1) return 'ь'
        else if ([2, 3, 4].includes(count % 10)) return 'я'
        else return 'ей'  
    }

    useEffect(() => {
        // Присоединение кого-либо из пользователей к комнате
        socket.on('joinRoom', ({ data }) => {
            setUsersCount(data.countOfUsers)
        })

        // кто-либо из пользователей покинул комнату
        socket.on('leftRoom', ({ data }) => {
            setUsersCount(data.countOfUsers)
        })
    }, [socket])

    return (
        <div className={cl.header}>
            <div className={cl.title}>{params.room}</div>
            <div className={cl.users}>{usersCount} пользовател{insertEnding(usersCount)} в комнате</div>
            <div className={cl.options}>
                <ArrowBackButton to="/main" className={`d-flex ${cl["arrowback-button"]}`} title="Вернуться назад"/>          
                <VerticalDotsDropdown options={options} handleSelect={handleSelect}/>
            </div>
        </div>
    )
}

export default ChatHeaderComponent