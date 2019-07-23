/**
 * fileName : index.js
 * author:ykx
 * date：2019/7/24 0:03
 * desc：通用的一些工具方法
 */


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

