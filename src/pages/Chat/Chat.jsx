import io from "socket.io-client"
import { useEffect, useState, useRef, useMemo } from "react"
import { useLocation } from "react-router-dom"
import EmojiPicker from "emoji-picker-react";
import cl from "./Chat.module.css"
import Messages from "../../Components/Messages";
import Upload from "../../Components/UI/Upload/Upload.jsx";
import ModalImageViewer from "../../Components/ModalImageViewer.jsx";
import ChatHeaderComponent from "./ChatHeaderComponent/ChatHeaderComponent.jsx";
import ChatAttachedFiles from "./ChatAttachedFiles/ChatAttachedFiles.jsx";
import { BiSolidSend } from "react-icons/bi";
import { RiEmojiStickerFill } from "react-icons/ri";
import { useUser } from "../../Context/AuthContext.js";

const URL = process.env.REACT_APP_SERVER_URL
const socket = io.connect(URL)

const Chat = () => {
    const { search } = useLocation()    // Получение параметров из запроса в виде строки
    // const [params, setParams] = useState({name: '', room: ''})
    const [messages, setMessages] = useState([])    // Массив всех сообщений в комнате
    const [message, setMessage] = useState('')      // Текст сообщения в инпуте
    const [emojiIsOpen, setEmojiIsOpen] = useState(false)
    const [files, setFiles] = useState([])  // Массив файлов, прикрепленных к новому сообщению
    const [modalImageViewerData, setModalImageViewerData] = useState({slideIndex: 0, sources: []}) // состояние хранит массив url-путей картинок, которые нужно открыть в модальном окне, а также индекс картинки, которая будет показываться по умолчанию, т. е. картинка, на которую нажал пользователь
    const { user } = useUser()
    const $nodeMessages = useRef(null)
    const $uploadInput = useRef(null)
    
    const { name: roomname } = Object.fromEntries(new URLSearchParams(search))    // Имя чата
    const params = useMemo(() => ({ user, room: roomname }), [user, roomname])
    console.log("PARAMS", params);
    

    useEffect(()=> {
        // Инициализация события "join", которое дальше будет обработано на сервере
        socket.emit('join', params)
    }, [params])

    // Автоматический скролл до последнего сообщения
    useEffect(() => {
        let lastMessage = $nodeMessages.current.lastElementChild
        
        if (lastMessage !== null)
            // lastMessage.scrollIntoView()
            // задержка, чтобы дождаться загрузки изображений, прежде чем выполнять прокрутку
            setTimeout(lastMessage.scrollIntoView(), 1200) 
    }, [messages])

    // Изменения соотношения основной части чата и его нижней части при прикреплении файлов для большей удобности
    useEffect(() => {
        console.dir($nodeMessages);
        
        const $chatMain = $nodeMessages.current.parentNode
        const $chatInput = $chatMain.nextElementSibling
        const $chatForm = $chatInput.childNodes[0]

        if (files.length === 1) {
            $chatMain.style.height = "64%"
            $chatInput.style.height = "28%"
            $chatForm.style.height = "66%"
        }
        else if (files.length > 1) {
            $chatMain.style.height = "57%"
            $chatInput.style.height = "35%"
            $chatForm.style.height = "52%"
        }
        else {
            $chatMain.style.removeProperty("height")
            $chatInput.style.removeProperty("height")
            $chatForm.style.removeProperty("height")
        }

    }, [files])

    useEffect(() => {
        // Отправление сообщения от кого-либо из пользователей:
        socket.on('message', ({ data }) => {
            console.log("onMessage data", data);
            
            setMessages((_state) => [..._state, data])
        })

        socket.on('loadMessagesHistory', ({ data }) => {
            console.log(data);
            setMessages([...data])
        })
    }, [])

    const handleChange = (e) => setMessage(e.target.value)

    const onEmojiClick = ({ emoji }) => {
        setMessage((_message) => `${_message} ${emoji}`)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        
        if (!message.trim() && !files.length) return
        socket.emit('sendMessage', {message, params, files})
        
                
        $uploadInput.current.value = null
        setFiles([])
        setMessage('')
    }

    // Обработчик отслеживает клики на картинки и документы в чате. При клики на картинке открывается модальное окно, при клике на файлы происходит их скачивание
    const chatHandleListener = (e) => {
        if (e.target.nodeName === "IMG") {
            const sources = []  // Массив url-путей до картинок, которые будут отрисовываться при открытии модального окна с картинками

            e.target.parentNode.parentNode.childNodes.forEach(el => sources.push(el.childNodes[0].currentSrc))

            console.log("INDEX", e.target.dataset.index);

            setModalImageViewerData({ slideIndex: parseInt(e.target.dataset.index), sources })
        }

        // Получение URL файла, если нажатие было на файл
        else if (e.target.dataset.docurl || e.target.parentNode.dataset.docurl) {
            const url = `${e.target.dataset.docurl || e.target.parentNode.dataset.docurl}`
            window.location.href = url
        }
    }

console.log("FILES", files);
    return (
        <div className={cl.wrap}>
            <div className={`${cl.container} `}>
                <ChatHeaderComponent params={params} socket={socket} />

                <div className={cl.main} onClick={chatHandleListener}>
                    <Messages messages={messages} username={params.user.username} ref={$nodeMessages}/>
                </div>

                <div className={cl.input}>

                    <form className={cl.form} onSubmit={sendMessage}>
                        <input 
                            type="text" 
                            placeholder="Ваше сообщение..." 
                            name="message"
                            className={cl["form-input"]}
                            value={message}
                            onChange={handleChange}
                            autoComplete="off"  
                            required  
                        />
                        <Upload setFiles={setFiles} innerRef={$uploadInput}/>
                        <div className={cl.emoji}>
                            <RiEmojiStickerFill className={cl["emoji-icon"]} onClick={() => setEmojiIsOpen(!emojiIsOpen)} title="Выбрать смайлики"/>

                            {emojiIsOpen && (
                                <div className={cl.emojies}>
                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>
                        <BiSolidSend onClick={sendMessage} className={cl.btn} title="Отправить"/>
                    </form>

                    {!!files.length && 
                        <ChatAttachedFiles files={files} setFiles={setFiles}/>
                    }

                </div>
            </div>

            <ModalImageViewer modalImageViewerData={modalImageViewerData} setModalImageViewerData={setModalImageViewerData} />
        </div>
    )
}

export default Chat