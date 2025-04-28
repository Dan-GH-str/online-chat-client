import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import ChatList from '../../Components/ChatList/ChatList'
import api from '../../API/api' 
import cl from "./Main.module.css"
import { useUser } from '../../Context/AuthContext'
import ModalWindow from '../../Components/UI/ModalWindow/ModalWindow'
import TextInput from '../../Components/UI/TextInput/TextInput'
import { useNavigate } from "react-router-dom"
import { useChats } from '../../hooks/useChats.js'

const Main = () => {
    const [ chats, setChats ] = useState({ userChats: [], otherChats: [] })
    const [ query, setQuery ] = useState('')
    const { user } = useUser()
    const navigate = useNavigate()
    const filtreedAndSearchedChats = useChats(chats, query)
    const createChatInputRef = useRef(null)
    console.log("Chats", chats)

    const getChatsForUser = async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}/chats`)
            return response.data
        } catch (error) {
            console.error("Ошибка при получении чатов пользователя:", error)
            throw error // Важно пробросить ошибку для обработки выше
        }
    }

    const getChatsByQuery = async(query, userId) => {
        try {
            const response = await api.get(`/api/chats?whereNotInId=${userId}`)
            return response.data.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase()))
        } catch (error) {
            console.error("Ошибка при получении чатов по запросу:", error)
            throw error // Важно пробросить ошибку для обработки выше
        }
    }

    // Получение списка чатов юзера при его входе на страницу
    useEffect(() => {
        getChatsForUser(user.userId)
        .then(data => setChats({ userChats: data, filteredChats: [], otherChats: [] }))
        .catch(error => {
            console.error("Не удалось получить список чатов:", error)
        })
    }, [user.userId])
  
    const handleSearch = async (query) => {
        if (query) {
            const otherChats = await getChatsByQuery(query, user.userId)
            setChats(prevState => ({
                ...prevState,
                otherChats
            }))
        } else {
            setChats(prevState => ({
                ...prevState,
                otherChats: []
            }))
        }
        setQuery(query)
    }

    const handleCreateChat = () => {
        const chatName = createChatInputRef.current.value
        api.post(`/api/createChat`, { name: chatName })
        .then(response => {
            if (response.status === 200) {
                navigate(`/chat?name=${chatName}`)
            }
        })
    }

    return (
        <div className={cl.wrap}>
            <div className={`container ${cl.container} mt-4 mb-4 mt-md-5 w-100`}>
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 w-100 h-100">
                        <div className={"card h-100 " + cl.card}>
                            <div className="card-body d-flex flex-column h-100">

                                <SearchBar onSearch={handleSearch} />

                                <div className={cl.chatlists + " h-75 p-2 border-bottom mb-2 mb-md-4"}>
                                    <div className="mt-3">
                                        <h4 className="text">Ваши чаты</h4>
                                        {chats.userChats.length === 0 && <p className="text-muted text">Чатов пока нет ツ</p>}
                                        {chats.userChats.length > 0 && filtreedAndSearchedChats.userChats.length === 0 && <p className="text-muted text">Нет совпадений</p>}
                                        <ChatList chats={filtreedAndSearchedChats.userChats} isUserChat={true} />
                                    </div>
                                    
                                    {chats.otherChats.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="text">Результаты поиска</h4>
                                        <ChatList chats={chats.otherChats} isUserChat={false} />
                                    </div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-center mt-auto mb-2">
                                    {/* <button className="btn btn-primary btn-lg" onClick={}>Create New Chat</button> */}
                                    <ModalWindow 
                                        buttonText="Создать новый чат" 
                                        title="Создание чата" 
                                        children={<TextInput placeholder="Введите название чата" innerRef={createChatInputRef}/>}
                                        onSave={handleCreateChat} 
                                        saveBtnText="Создать"
                                        centered
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main