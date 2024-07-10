const URL = process.env.REACT_APP_SERVER_URL

// Получение актуальных названий директорий на сервере
let response = await fetch(`${URL}dirs`);

let dirs = await response.json()

export default dirs