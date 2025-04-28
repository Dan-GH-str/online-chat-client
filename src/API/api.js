// axios instance для отправки запросов на сервер
import axios from 'axios'

const URL = process.env.REACT_APP_SERVER_URL

const api = axios.create({
  baseURL: URL,
  withCredentials: true, //  Отправлять куки с каждым запросом
})

export default api