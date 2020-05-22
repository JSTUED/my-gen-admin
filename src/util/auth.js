import Cookies from 'js-cookie'
const TokenKey = 'token'
var inFifteenMinutes = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 存储24 小时
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
