import { get, post, put } from '@/common/utils/http.js'

export const login = (params = { userName: '' , password: ''}) => {
    // 登陆
    return post('/user/login', { params, auth: false }).then(res => res.data)
}

export const getArticleList = (params = { page: 1, pageSize: 10 }) => {
    // 获取分组列表
    return get('/get/article/list', { params, auth: false }).then(res => res.data)
}

export const getTags = (parmas = {}) => {
    // 获取文字分类
    return get('/get/tags', {}).then(res => res.data)
}

export const getSimpleWeather = (params = {}) => {
    // 获取天气
    return get('/get/simple/weather', { params, auth: false }).then(res => res)
}

export const getCity = () => {
    // 获取定位
    return new Promise((res, rej) => {
        window.showLocation = (data) => { 
            if (data && data.content && data.content.address_detail) {
                window.city = data.content.address_detail.city
            }
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://api.map.baidu.com/location/ip?ak=BhckEOslyspzdDFOnuniCNlULdljhPxl&coor=bd09ll&callback=showLocation'
        document.head.appendChild(script)
        script.onload = function () {
            const index = window.city.indexOf('市')
            const city = index && window.city.substring(0, index)
            res(city)
        }
    })
}

export const getMajor = () => {
    // 获取轮播等
    return get('/get/article/major').then(res => res)
}

export const getArticle = (params) => {
    // 获取文章列表
    return get('/get/article/list', { params }).then(res => res)
}

export const addArticle = (params) => {
    // 新增文章
    return put('/add/article', { params, auth: true }).then(res => res)
}

export const uploadImage = (params) => {
    // 上传图片
    return post('/upload-image', { params })
}

export const getArticleDetails = (params) => {
    // 获取文章详情
    return get('/get/article/details', { params })
}

export const loveArticle = (params) => {
    return post('/love/article', { params })
}

export const getPhoto = (params = {}) => {
    return get('/get/photo/data')
}