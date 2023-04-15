import axios from "axios";

const instance = axios.create({
    baseURL: 'https://portal-server-production.up.railway.app'
})

export default instance