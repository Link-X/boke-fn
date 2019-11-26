import { get, post, put } from '@/common/utils/http.js'
import store from './store'

export const login = (params = { userName: '' , password: ''}) => {
    // 登陆
    return new Promise((res, rej) => {
        getCity().then(data => {
            const address_detail = (data && data.content && data.content.address_detail) || {}
            const dataAdds = {
                province: address_detail.province,
                city: address_detail.city,
                district: address_detail.district,
                ...params
            }
            post('/user/login', { params: dataAdds, auth: false }).then(res2 => {
                res(res2.data)
            }).catch(err => {
                rej(err)
            })
        }).catch(err => {
            post('/user/login', { params, auth: false }).then(res2 => {
                res(res2.data)
            }).catch(err => {
                rej(err)
            })
        })
    })
}

export const getArticleList = (params = { page: 1, pageSize: 10 }) => {
    // 获取分组列表
    return get('/get/article/list', { params, auth: false }).then(res => res.data)
}

export const getTags = (parmas = {}) => {
    // 获取文字分类
    const data = store.get('tags')
    if (data) {
        return new Promise((res, rej) => {
            res(data)
        })
    }
    return get('/get/tags', {}).then(res => {
        if (res.data) {
            store.set('tags', res.data)
        }
        return res.data
    })
}

export const getSimpleWeather = (params = {}) => {
    // 获取天气
    return get('/get/simple/weather', { params, auth: false }).then(res => res)
}

export const getCity = () => {
    // 获取定位
    return new Promise((res, rej) => {
        let addData = {}
        window.showLocation = (data) => {
            addData = data
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://api.map.baidu.com/location/ip?ak=BhckEOslyspzdDFOnuniCNlULdljhPxl&coor=bd09ll&callback=showLocation'
        document.head.appendChild(script)
        script.onload = function () {
            res(addData)
        }
        script.onerror = function (e) {
            rej(e)
        }
    })
}

export const getUserDate = () => {
    return get('/get/user/details', {auth: true}).then(res => res)
}

export const getMajor = () => {
    // 获取轮播等
    const data = store.get('major')
    if (data) {
        return new Promise((res, rej) => {
            res(data)
        })
    }
    return get('/get/article/major').then(res => {
        const data = res && res.data && res.data.data && res.data.data
        if (data) {
            store.set('major', res)
        }
        return res
    })
}

export const getArticle = (params, isStore) => {
    // 获取文章列表
    const data = store.get('articleList')
    const preParams = store.get('articleParams') || {}
    if (data && preParams.page === params.page || (data && isStore)) {
        return new Promise(function (res, rej) { 
            res({data, page: preParams.page, isStore: true})
         })
    } else {
        return get('/get/article/list', { params }).then(res => {
            const list = res && res.data && res.data.data && res.data.data && res.data.data.list
            if (list && list.length) {
                store.set('articleParams', params)
                const storeList = store.get('articleList') || []
                return {data: store.set('articleList', storeList.concat(list)), page: params.page, isStore: false}
            }
            return { data: store.get('articleList') || [], isStore: true, page: preParams.page }
        })
    }
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
    // 点赞文章
    return post('/love/article', { params })
}

export const getPhoto = (params = {}) => {
    // 获取相册
    const imgData = store.get('imgData')
    if (imgData && imgData.length) {
        return new Promise((res, rej) => {
            res(imgData)
        })
    }
    return get('/get/photo/data').then(res => {
        if (res && res.data && res.data.code === 0) {
            return store.set('imgData', res.data.data || [])
        }
    })
}

export const editArticleDetials = (params = {}) => {
    // 修改文章
    return post('/endit/article', { params, auth: true })
}

export const addCommentArticle = (params = {}) => {
    // 评论
    return post('/add/article-comment', { params, auth: true })
}

export const delArticle = (params = {}) => {
    // 删除文章
    return post('/del/article', { params, auth: true })
}