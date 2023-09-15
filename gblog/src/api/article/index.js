import request from '@/utils/request'

export function articleList(params) {
    return request({
        url: '/post/list',
        method: 'get',
        params: params
    })
}