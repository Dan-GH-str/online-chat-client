import cl from "./styles/Message.module.css"
import FileRenderComponent from "./UI/FileRenderComponent/FileRenderComponent"

const Message = ({ data, name }) => {
    console.log("DATA ", data);
    const { user, text, filesData } = data
    console.log(filesData);
    const countFiles = filesData.images.length + filesData.docs.length
    console.log("COUNT OF FILES", countFiles);
    const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()
    const className = itsMe ? cl.me : cl.user

    return (
        <div className={`${cl.message} ${className}`}>
            <span className={cl.userName}>{user.name}</span>

            {!!text.length && <div className={cl.text}>
                {text}

                {/* <svg className={cl["message-tail"]} version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M1.5 20c-0.2 0-0.4 0-0.5 0-0.4 0-0.8-0.3-0.9-0.7s0-0.8 0.3-1.1c6.6-5.4 7.6-13.7 7.6-18.2h8v16c-2.3 3.5-8.4 3.9-12.2 4h-1.6c-0.3 0-0.5 0-0.7 0z"></path>
                </svg> */}
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
                                    {filesData[key].map(( fileData ) => <FileRenderComponent fileData={fileData} key={fileData.id} />)}

                                    {/* <svg className={cl["message-tail"]} version="1.1" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M1.5 20c-0.2 0-0.4 0-0.5 0-0.4 0-0.8-0.3-0.9-0.7s0-0.8 0.3-1.1c6.6-5.4 7.6-13.7 7.6-18.2h8v16c-2.3 3.5-8.4 3.9-12.2 4h-1.6c-0.3 0-0.5 0-0.7 0z"></path>
                                    </svg> */}
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