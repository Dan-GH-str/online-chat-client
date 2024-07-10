import cl from "./FileRenderComponent.module.css"
import dirs from "../../../directories/directories"
import FileService from "../../../API/FileService";
import { FaFileDownload } from "react-icons/fa";

const FileRenderComponent = ({ fileData, index = 0}) => {
    const { IMG, DOCS } = dirs
    const fileNameMaxLen = 20
    let { type, url, fileName, fileExt, size } = fileData
    let jsx = ``
    url = decodeURIComponent(url)

    if (fileName.length > fileNameMaxLen) fileName = FileService.compressFileName(fileName, fileNameMaxLen)

    switch(type) {
        case IMG: 
            jsx = <img alt="img" src={url} className={cl["img"]} data-index={index}/>
            break
        case DOCS:
            jsx = (
                <div className={cl["doc"]} data-docurl={url}>
                    <FaFileDownload className={cl["doc__icon"]}/>
                    <div className={cl["doc-data"]}>
                        <p className={cl["doc__name"]}>{fileName}{fileExt}</p>
                        <span className={cl["doc__size"]}>{Math.floor(size / 1024)} Кб</span>
                    </div>
                </div>
            )
            break
        default: 
            return
    }
    

    return (
        <article className={cl[`${type}-article`]}>
            {jsx}
        </article>
    )
}

export default FileRenderComponent