export const validUsername = str =>{
    const valid_map = ['admin'];
    return valid_map.indexOf(str.trim()) >= 0;
}
/**
 * 判断是否属于非routePath格式
 * @param {String} path - 路由地址
 */

export const isExternal = path => {
    return /^(https?:|mailto:|tel:)/.test(path);
}