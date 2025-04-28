import cl from "./styles/Message.module.css"
import FileRenderComponent from "./UI/FileRenderComponent/FileRenderComponent"

const Message = ({ data, username }) => {
    console.log("DATA ", data);
    const { user, text, filesData } = data
    console.log(filesData);
    const countFiles = filesData.images.length + filesData.docs.length
    console.log("COUNT OF FILES", countFiles);
    
    const itsMe = user.username.trim().toLowerCase() === username.trim().toLowerCase()
    const className = itsMe ? cl.me : cl.user

    return (
        <div className={`${cl.message} ${className}`}>
            <span className={cl.userName}>{user.username}</span>

            {!!text.length && <div className={cl.text}>
                {text}
            </div>}

            {(countFiles !== 0) && 
                <div className={cl["file-area"]}>
                    
                    {Object.keys(filesData).map(key => {
                        if (key === "images" && filesData[key].length) 
                            return (
                                <div className={cl["file-area__images"]} key={0}>
                                    {filesData[key].map(( fileData, i ) => <FileRenderComponent fileData={fileData} index={i} key={fileData.id} />)}
                                </div>
                            )
                        else if (key === "docs" && filesData[key].length)
                            return (
                                <div className={cl["file-area__docs"]} key={1}>
                                    {filesData[key].map(( fileData ) => <FileRenderComponent fileData={fileData} key={fileData.id} />)}]
                                </div>
                            )
                        return null
                    })}

                </div>
            }
        </div>
    )
}

export default Message