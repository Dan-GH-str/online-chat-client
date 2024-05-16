import io from "socket.io-client"
import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EmojiPicker from "emoji-picker-react";
import cl from "./Chat.module.css"
import icon from "../../images/icon.svg"
import Messages from "../../Components/Messages";

const URL = process.env.REACT_APP_SERVER_URL || 5000
const socket = io.connect(URL)

const Chat = () => {
    const navigate = useNavigate()
    const { search } = useLocation()    // Получение параметров из запроса в виде строки
    const [params, setParams] = useState({name: '', room: ''})
    const [messages, setMessages] = useState([])    // Массив всех сообщений в комнате
    const [usersCount, setUsersCount] = useState(0)
    const [message, setMessage] = useState('')      // Текст сообщения в инпуте
    const [emojiIsOpen, setEmojiIsOpen] = useState(false)
    const nodeMessages = useRef()

    useEffect(()=> {
        // объект типа URLSearchParams является перебираемым, аналогично Map => можно получить объект с ключами(в данном случае названия параметров запроса) и их значениями(значения параметров запроса)
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)

        // Инициализация события "join", которое дальше будет обработано на сервере
        socket.emit('join', searchParams)
    }, [search])

    useEffect(() => {
        // Автоматический скролл до последнего сообщения
        let lastMessage = nodeMessages.current.lastElementChild

        if (lastMessage !== null)
            lastMessage.scrollIntoView()
    }, [messages])

    useEffect(() => {
        // Отправление сообщения от кого-либо из пользователей:
        socket.on('message', ({ data }) => {
            setMessages((_state) => [..._state, data])
        })

        socket.on('loadMessagesHistory', (messages) => {
            setMessages([...messages])
        })

        // Присоединение кого-либо из пользователей к комнате
        socket.on('joinRoom', ({ data }) => {
            setUsersCount(data.users.length)
        })

        // кто-либо из пользователей покинул комнату
        socket.on('leftRoom', ({ data }) => {
            setUsersCount(data.users.length)
        })
    }, [])

    const leftRoom = () => {
        socket.emit('leftRoom', params)
        navigate('/')
    }

    const insertEnding = (count) => {
        if (count % 10 === 1) return 'ь'
        else if ([2, 3, 4].includes(count % 10)) return 'я'
        else return 'ей'  
    }

    const handleChange = (e) => setMessage(e.target.value)

    const onEmojiClick = ({ emoji }) => {
        setMessage((_message) => `${_message} ${emoji}`)
    }

    const sendMessage = (e) => {
        e.preventDefault()

        if (!message.trim()) return

        socket.emit('sendMessage', {message, params})
        
        setMessage('')
    }


    return (
        <div className={cl.wrap}>
            <div className={cl.container}>
                <div className={cl.header}>
                    <div className={cl.title}>{params.room}</div>
                    <div className={cl.users}>{usersCount} пользовател{insertEnding(usersCount)} в комнате</div>
                    <button className={cl.left} onClick={leftRoom}>Покинуть комнату</button>
                </div>

                <div className={cl.main}>
                    <Messages messages={messages} name={params.name} ref={nodeMessages}/>
                </div>

                <form className={cl.form} onSubmit={sendMessage}>
                    <input 
                        type="text" 
                        placeholder="Ваше сообщение..." 
                        name="message"
                        className={cl.input}
                        value={message}
                        onChange={handleChange}
                        autoComplete="off"  
                        required  
                    />
                    <div className={cl.emoji}>
                        <img src={icon} alt="" onClick={() => setEmojiIsOpen(!emojiIsOpen)}/>

                        {emojiIsOpen && (
                            <div className={cl.emojies}>
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </div>
                    <button type="submit" onSubmit={sendMessage} className={cl.btn}>Отправить</button>
                </form>

            </div>
        </div>
    )
}

export default Chat