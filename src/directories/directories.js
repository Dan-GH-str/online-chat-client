// Получение актуальных названий директорий на сервере
import api from "../API/api"

const URL = process.env.REACT_APP_SERVER_URL

// let response = await fetch(`${URL}/dirs`);
const response = await api.get(`${URL}/api/dirs`)

const dirs = response.data

export default dirs
