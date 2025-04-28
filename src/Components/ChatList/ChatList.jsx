import React from 'react'
import ChatItem from '../ChatItem/ChatItem' 

const ChatList = ({ chats, isUserChat }) => {
    return (
        <div>
            {chats.map(chat => (
                <ChatItem key={chat.id} chat={chat} isUserChat={isUserChat} />
            ))}
        </div>
    )
}

export default ChatList