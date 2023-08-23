import axios from 'axios'

const instance  = axios.create({
    baseURL: 'https://ecmmerce-backend-vu1h.onrender.com'
})

export default instance