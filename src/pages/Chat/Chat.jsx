import io from "socket.io-client"
import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import EmojiPicker from "emoji-picker-react";
import cl from "./Chat.module.css"
import icon from "../../images/icon.svg"
import Messages from "../../components/Messages";

const URL = process.env.REACT_APP_SERVER_URL
const socket = io.connect(URL)

const Chat = () => {
    const navigate = useNavigate()
    // Получение параметров из запроса в виде строки
    const { search } = useLocation()
    // const [params, setParams] = useState(null)
    const [messages, setMessages] = useState([])
    const [params, setParams] = useState({name: '', room: ''})
    const [message, setMessage] = useState('')
    const [emojiIsOpen, setEmojiIsOpen] = useState(false)
    const [usersCount, setUsersCount] = useState(0)
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
        socket.on('message', ({ data }) => {
            setMessages((_state) => [..._state, data])
        })

        socket.on('joinRoom', ({ data }) => {
            setUsersCount(data.users.length)
        })

        socket.on('leftRoom', ({ data }) => {
            setUsersCount(data.users.length)
        })
    }, [])

    const leftRoom = () => {
        socket.emit('leftRoom', params)
        navigate('/')
    }

    const handleChange = (e) => setMessage(e.target.value)

    const onEmojiClick = ({ emoji }) => {
        setMessage((_message) => `${_message} ${emoji}`)
    }

    const sendMessage = (e) => {
        e.preventDefault()

        if (!message) return

        socket.emit('sendMessage', {message, params})
        
        setMessage('')
    }

    const insertEnding = (count) => {
        if (count % 10 === 1) return 'ь'
        else if ([2, 3, 4].includes(count % 10)) return 'я'
        else return 'ей'  
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