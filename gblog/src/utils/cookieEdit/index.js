import Cookies from 'js-cookie'
//写入
export function setToken(key,token) {
    return Cookies.set(key, token)
}
//读取
export function getToken(key) {
    return Cookies.get(key)
}
//删除
export function removeToken(key) {
    return Cookies.remove(key)
}