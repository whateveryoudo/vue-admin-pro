/**
 * fileName : index.js
 * author:ykx
 * date：2019/7/24 0:03
 * desc：通用的一些工具方法
 */

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
export const setStore = (key, value) => {
  return sessionStorage.setItem(key, value);
}
/**
 * 移除sessionStorage
 * @param {String} key - 键名
 */
export const removeStore = (key) => {
  return sessionStorage.removeItem(key);
}
/**
 * 根据key 获取处理后的title(这里在methods中调用,不要用 => )
 * @param {String}  title - 标题
 */
export function generateTitle (title) {
  if (this.$te("route." + title)) {
    return this.$t("route." + title)
  };
  return title;
}

// 判断数据类型
export const getType = (data) => {
  const type = Object.prototype.toString.call(data)
  const typeArr = ["String", "Object", "Number", "Array", "Undefined", "Function", "Null", "Symbol"];
  let name
  for (let i = 0; i < typeArr.length; i++) {
    if ("[object " + typeArr[i] + "]" === type) {
      name = typeArr[i]
    }
  }
  return name
}
/**
 * 判断对象是否为空
 * @param {Object} target 目标对象
 */
export const isObjNull = (target) => {
  if (!target) {
    return false
  }
  if (getType(target) !== "Object") {
    throw new Error("请传入对象类型参数");
  }
  return Object.keys(target).length <= 0;
}
export const isArray = (val) => { // 检测数组
  // 通过Object.prototype.toString.call来精准检测类型
  return Object.prototype.toString.call(val) === "[object Array]";
}
export const isObject = (val) => { // 检测对象
  return typeof val === "object" && val !== null;
}
export const deepCopy = (obj2) => { // 递归深层copy
  /**
   * 把一个对象递归拷贝给另外一个对象
   * 源对象与拷贝后的对象没有引用关系
   */
  const obj = isArray(obj2) ? [] : {};
  for (const property in obj2) {
    // 如果当前拷贝的数据还是一个对象的话，那么继续调用
    // deepCopy 进行二次拷贝
    // 递归
    if (isObject(obj2[property])) {
      obj[property] = deepCopy(obj2[property]);
    } else {
      obj[property] = obj2[property];
    }
  }
  return obj;
}
// 数组元素交换
export const swapArray = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

