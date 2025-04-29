import { useCallback, useId } from "react"
import cl from "./Upload.module.css"
import { SlPaperClip } from "react-icons/sl";

const Upload = ({ setFiles }) => {
    const inputId = useId()

    const handleChange = useCallback((e) => {
        const input = e.target
        const selectedFiles = input.files
        console.log("HAMDLECHANGE");
        

        if (!selectedFiles.length) return;
        else if (selectedFiles.length > 10) alert("Вы можете прикрепить не более 10 файлов одновременно!")

        const selectedFilesKeys =  Object.keys(selectedFiles).slice(0, 10)
        const files = []
        let id = 0;
    
        // Считывание прикрепленных файлов
        console.log("SELECTED FILES", selectedFiles);
        selectedFilesKeys.forEach(async (key, i) => {
            let reader = new FileReader()

            reader.readAsArrayBuffer(selectedFiles[key])

            reader.onload = function() {
                const file = {
                    id: id++,
                    name: selectedFiles[key].name,
                    type: selectedFiles[key].type,
                    size: selectedFiles[key].size,
                    buffer: reader.result
                }

                files.push(file)

                if (i === selectedFilesKeys.length - 1) 
                    setFiles(files)

                input.value = ''
            }

            reader.onerror = () => {
                console.log(reader.error)
            }
        })
    }, [setFiles])

    return (
        <label className={cl.inputFiles} htmlFor={inputId}>
            <input multiple type="file" className={cl["inputFiles__field"]} accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" id={inputId} onChange={handleChange}/>
            <SlPaperClip className={cl["inputFiles__icon"]} title="Прикрепить файлы"/>
        </label>
    )
}

export default Upload