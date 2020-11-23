/**
 * fileName : index.js
 * author:ykx
 * date：2019/7/24 0:03
 * desc：通用的一些工具方法
 */


const TOKENKEY = 'Admin-Token';//token键

/**
 * 获取本地sessionStorage
 * @param {String} key - 键名
 * @return {String} 本地存储值
 *
 */
export const getStore = (key) => {
    return sessionStorage.getItem(key);
}

/**
 * 设置本地sessionStorage
 * @param {String} key - 键名
 */
export const setStore = (key,value) => {
    return sessionStorage.setItem(key,value);
}
/**
 * 移除sessionStorage
 * @param {String} key - 键名
 */
export const removeStore = (key) => {
    return sessionStorage.removeItem(key);
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

/**
 * 移除本地token
 */
export const removeToken = () => {
    return removeStore(TOKENKEY);
}
/**
 * 根据key 获取处理后的title(这里在methods中调用,不要用 => )
 * @param {String}  title - 标题
 */
export function generateTitle(title){
    if(this.$te('route.' + title)){
        return this.$t('route.' + title)
    };
    return title;
}