import axios from 'axios'
import { message } from 'antd';
const http = axios.create({
    baseURL: `/api/`
})

http.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem('token') || ''
    return config
}, (err) => {
    return Promise.reject(error)
})

http.interceptors.response.use((data) => {
    const res = {...{data: {code: -1, data: {}}}, ...data}
    if (res.data.code === 0) {
        return res
    }
    if (res.data.code === -1) {
        message.error(res.data.message)
    }
    if (res.data.code === '0001') {
        message.error('未登陆，请登陆账号')
        return Promise.reject(res)
    }
    return {}
})

export const get = (url, opt = { params: {} }) => {
    return http.get(url, opt)
}

export const post = (url, data, opt = { params: {} }) => {
    return http.post(url, data, opt)
}

export default http