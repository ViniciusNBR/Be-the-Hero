import axios from 'axios'

const api = axios.create({
    baseURL: 'http://189.34.34.100:3333'
})

export default api