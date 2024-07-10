import { forwardRef } from "react"
import cl from "./styles/Messages.module.css"
import Message from "./Message"

const Messages = forwardRef(function Messages({ messages, name }, ref) {
    
    console.log("MESSAGES ", messages);
    
    return (
        <div className={cl.messages} ref={ref}>
            {messages.map((data, i) => <Message data={data} name={name} key={data.id}/>)}
        </div>
    )
})

export default Messages