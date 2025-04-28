import { useMemo } from "react";

const filterChats = (chats, query) => {
    const lowerCaseQuery = query.toLowerCase()
    return chats.filter(chat => chat.name.toLowerCase().includes(lowerCaseQuery))
}

export const useChats = (chats, query) => {
    const filteredAndSearchedChats = useMemo(() => {
        return {
            userChats: chats.userChats ? filterChats(chats.userChats, query) : [],
            otherChats: chats.otherChats ? filterChats(chats.otherChats, query) : [],
        }
    }, [chats.otherChats, chats.userChats, query])
    console.log("Result in hook",filteredAndSearchedChats);

    return filteredAndSearchedChats
}