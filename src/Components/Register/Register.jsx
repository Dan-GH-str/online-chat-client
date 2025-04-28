import { useState } from "react"
import cl from "../styles/Login-Register.module.css"
import { useNavigate } from "react-router-dom"
import MainPageCloseButton from "../UI/MainPageCloseButton/MainPageCloseButton.jsx"
import { useUser } from "../../Context/AuthContext.js"
import api from "../../API/api.js"
import CommonLink from "../UI/CommonLink/CommonLink.jsx"

const FIELDS = {    
    USERNAME: "username",
    PASSWORD: "password"        
}

const Register = () => {
    const { USERNAME, PASSWORD } = FIELDS
    const { login } = useUser()
    const { navigate } = useNavigate()

    const [values, setValues] = useState({[USERNAME]: "", [PASSWORD]: ""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            try {
                const response = await api.post('/auth/register', values);
                if (response.status === 200) {
                    login(response.data.user)
                    navigate('/main')
                }
            } catch (error) {
                console.error(error)
                alert(error.response.data.message)
            }
        }
    }

    const handleChange = ({ target }) => {
        setValues({...values, [target.name]: target.value})
    }
    
    const validateForm = () => {
        // Если значение хотя бы одного ключа объекта совпадет с пустой строкой (будут пустые инпуты), переход не выполнится
        const isDisabled = Object.values(values).some(v => v.trim() === "")

        return !isDisabled
    }

    return (
        <div className={cl.wrap}>
            <div className={cl.container + " " + cl["login-register__container"]}>
                <form className={cl.form} onSubmit={handleSubmit}>
                    <h1 className={cl.header}>Регистрация</h1>

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
                        <MainPageCloseButton clearInput={setValues} state={values} name={USERNAME}/>
                    </div>

                    <div className={cl.input_group}>
                        <input 
                            type="text" 
                            placeholder="Password" 
                            autoComplete="off"
                            maxLength="32"
                            name={PASSWORD}
                            className={cl.input}
                            value={values[PASSWORD]}
                            onChange={handleChange}  
                            required  
                        />
                        <MainPageCloseButton clearInput={setValues} state={values} name={PASSWORD}/>
                    </div>
                    <button type="submit" className={cl["form__btn"]}>Зарегистрироваться</button>
                    {/* <Link 
                        onClick={validateForm} 
                        to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
                    >
                        <button type="submit" className={cl.btn}>Присоединиться</button>
                    </Link> */}
                </form>

                <p className={`text ${cl.text}`}>Уже зарегистрированы? <b><CommonLink to="/login">Авторизуйтесь</CommonLink></b></p>

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

export default Register