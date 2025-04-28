import { forwardRef } from "react"
import cl from "./styles/Messages.module.css"
import Message from "./Message"

const Messages = forwardRef(function Messages({ messages, username }, ref) {
    
    console.log("MESSAGES ", messages);
    
    return (
        <div className={cl.messages} ref={ref}>
            {messages.map((data) => <Message data={data} username={username} key={data.id}/>)}
        </div>
    )
})

export default Messages