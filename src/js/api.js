import { get, post } from '@/common/utils/http.js'

export const login = (params = { userName: '' , password: ''}) => {
    return post('/user/login', { params, auth: false }).then(res => res.data)
}

export const getArticleList = (params = { page: 1, pageSize: 10 }) => {
    return get('/get/article/list', { params, auth: false }).then(res => res.data)
}

export const getTags = (parmas = {}) => {
    return get('/get/tags', {}).then(res => res.data)
}