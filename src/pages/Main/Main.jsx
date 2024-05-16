import { useState } from "react"
import cl from "./Main.module.css"
import { Link } from "react-router-dom"
import CloseButton from "../../Components/UI/CloseButton"

const FIELDS = {
    USERNAME: "username",
    ROOM: "room"        
}

const Main = () => {
    const { USERNAME, ROOM } = FIELDS

    const [values, setValues] = useState({[USERNAME]: "", [ROOM]: ""})

    const handleChange = ({ target }) => {
        setValues({...values, [target.name]: target.value})
    }
    
    const validateForm = (e) => {
        // Если значение хотя бы одного ключа объекта совпадет с пустой строкой (будут пустые инпуты), переход не выполнится
        const isDisabled = Object.values(values).some(v => v.trim() === "")

        if (isDisabled) e.preventDefault()
    }

    return (
        <div className={cl.wrap}>
            <div className={cl.container}>
                <form className={cl.form}>
                    <h1 className={cl.header}>Поиск комнаты</h1>

                    <div className={cl.input_group}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            autoComplete="off"
                            maxLength="13"
                            name={USERNAME}
                            className={cl.input}
                            value={values[USERNAME]}
                            onChange={handleChange}  
                            required  
                        />
                        <CloseButton clearInput={setValues} state={values} name={USERNAME}/>
                    </div>

                    <div className={cl.input_group}>
                        <input 
                            type="text" 
                            placeholder="Room" 
                            autoComplete="off"
                            maxLength="9"
                            name={ROOM}
                            className={cl.input}
                            value={values[ROOM]}
                            onChange={handleChange}  
                            required  
                        />
                        <CloseButton clearInput={setValues} state={values} name={ROOM}/>
                    </div>
                    <Link 
                        onClick={validateForm} 
                        to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
                    >
                        <button type="submit" className={cl.btn}>Присоединиться</button>
                    </Link>
                </form>

                <div>
                    <div className={`${cl.drop} ${cl.drop_1}`}></div>
                    <div className={`${cl.drop} ${cl.drop_2}`}></div>
                    <div className={`${cl.drop} ${cl.drop_3}`}></div>
                    <div className={`${cl.drop} ${cl.drop_4}`}></div>
                    <div className={`${cl.drop} ${cl.drop_5}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Main