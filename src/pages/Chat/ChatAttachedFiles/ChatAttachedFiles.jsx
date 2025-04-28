import ChatAttachedFile from "../ChatAttachedFile/ChatAttachedFile"
import cl from "./ChatAttachedFiles.module.css"

const ChatAttachedFiles = ({ files, setFiles }) => {
    console.log("FILES", files);
    return (
        <div className={cl["attached-files-area"]}>
            <div className={cl["attached-files-area__container"]}>
                {files.map( file => <ChatAttachedFile file={file}  setFiles={setFiles} key={file.id}/>)}
            </div>
        </div>
    )
}

export default ChatAttachedFiles