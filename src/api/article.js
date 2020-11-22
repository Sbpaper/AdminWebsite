import request from '@/utils/request'

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