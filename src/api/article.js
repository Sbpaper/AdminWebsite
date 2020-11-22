import request from '@/utils/request'

export function GetarticleItem(data) {
    return request({
        url: '/article/get',
        method: 'post',
        data: data
    })
}

export function QueryArticleList(data) {
    return request({
        url: '/article/query',
        method: 'post',
        data: data
    })
}

export function Admin_QueryArticleList(data) {
    return request({
        url: '/article/admin/articlelist',
        method: 'post',
        data: data
    })
}

export function Admin_articleverify(data) {
    return request({
        url: '/article/admin/verify',
        method: 'post',
        data: data
    })
}