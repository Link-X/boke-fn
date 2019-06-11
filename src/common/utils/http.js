import axios from 'axios'
import { message } from 'antd';
const path = 'http://127.0.0.1:3010'
const http = axios.create({
    baseURL: `${path}/api/`
})

http.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem('token') || ''
    return config
}, (err) => {
    return Promise.reject(error)
})

http.interceptors.response.use((res) => {
    if (res.data.code === '0001') {
        message.info('未登陆，请登陆账号')
        return Promise.reject(res)
    }
    return res
})

export const get = (url, opt = { params: {} }) => {
    return http.get(url, opt)
}

export const post = (url, data, opt = { params: {} }) => {
    return http.post(url, data, opt)
}

export default http