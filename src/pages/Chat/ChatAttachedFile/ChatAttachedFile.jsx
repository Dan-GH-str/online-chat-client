import { useCallback } from "react"
import FileService from "../../../API/FileService"
import cl from "./ChatAttachedFile.module.css"
import { FaFileAlt } from "react-icons/fa";

const ChatAttachedFile = ({ file, setFiles }) => {
    // Если ширина окна слишком маленькая, уменьшается максимальная длина имени файла, которое будет отображаться в секции прикрепленных файлов
    const fileNameMaxLen = window.innerWidth < 480 ? 10 : 24
    const fileName = file.name.length > fileNameMaxLen ? FileService.compressFileName(file.name, fileNameMaxLen) : file.name
    const type = file.type.split("/")[0]
    let jsx;

    const removeFile = useCallback(() => setFiles((_files) => {
        return _files.filter(_file => _file.name !== file.name)
    }), [setFiles, file.name])

    console.log("ATTACHED FILE", file);

    switch(type) {
        case "image": 
            jsx = <img className={cl["file-block__img"]} src={URL.createObjectURL(new Blob([file.buffer]))} alt="img" />
            break
        case "application":
            jsx = <FaFileAlt  className={cl["file-block__doc-icon"]}/>
            break
        default: 
            return
    }

    return (
                
        <article className={cl["file-block"]}>

            <div className={cl["file-block__container"]}>

                {jsx}
                <div className={cl["file-data"]}>
                    <h3 className={cl["file-block__name"]} >{fileName}</h3>
                    <span className={cl["file-block__size"]} >{Math.floor(file.size / 1024)} Кб</span>
                </div>

            </div>

            <button 
                type='button' 
                className={cl["file-block__dltBtn"]} 
                onClick={removeFile} 
                onMouseEnter={e => {
                    e.target.parentNode.style.backgroundColor = "#4b4b4b"
                }}

                onMouseLeave={e => {
                    e.target.parentNode.style.removeProperty("background-color")
                }}
            >
                &times;
            </button>

        </article>
              
    )
}

export default ChatAttachedFile