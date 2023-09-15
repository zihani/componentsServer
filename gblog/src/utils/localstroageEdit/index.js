//删除
export function removeStorage(key) {
    if(key){
      return localStorage.removeItem(key)
    }
}
//读取
export function getStorage(key) {
    if(key){
      return localStorage.getItem(key)
    }
}
//写入
export function setStorage(key,value) {
    if(key){
      return localStorage.setItem(key,value)
    }
}