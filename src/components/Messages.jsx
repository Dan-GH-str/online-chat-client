import { forwardRef } from "react"
import cl from "./styles/Messages.module.css"

const Messages = forwardRef( function Messages({ messages, name}, ref) {
    return (
        <div className={cl.messages} ref={ref}>
            {messages.map(({user, text}, i) => {
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()
                const className = itsMe ? cl.me : cl.user

                return (
                    <div key={i} className={`${cl.message} ${className}`}>
                        <span className={cl.userName}>{user.name}</span>

                        <div className={cl.text}>{text}</div>
                    </div>
                )
            })}
        </div>
    )
})

export default Messages