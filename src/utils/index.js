/**
 * fileName : index.js
 * author:ykx
 * date：2019/7/24 0:03
 * desc：通用的一些工具方法
 */

const TOKENKEY = 'Admin-Token';//token键

/**
 * 获取本地localstorage
 * @param {String} key - 键名
 * @return {String} 本地存储值
 *
 */
export const getStore = (key) => {
    return localStorage.getItem(key);
}

/**
 * 设置本地localstorage
 * @param {String} key - 键名
 */
export const setStore = (key,value) => {
    return localStorage.setItem(key,value);
}




/*******auto token相关******/
/**
 * 获取本地token
 */
export const getToken = () => {
    return getStore(TOKENKEY);
}
/**
 * 设置本地token
 * @param {String} token
 */
export const setToken = (token) => {
    return setStore(TOKENKEY,token);
}
