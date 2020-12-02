/*
  *@functionName: 根据指定节点key获取指定节点全量数据
  *@params1: ${String} 唯一键
  *@params1: ${Array} 完整树结构
*/
module.exports = {
  getUuid () {
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    const uuid = s.join("");
    return uuid;
  },
  getNodeByKey (key, tree) {
    let result;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.id === key) {
        result = node;
      } else {
        if (node.children && this.getNodeByKey(key, node.children)) {
          result = this.getNodeByKey(key, node.children);
        }
      }
    }
    return result;
  },
  /*
  *@functionName: 查找当前key 在树中的最近父节点
  *@params1: ${String} 唯一键
  *@params1: ${Array} 完整树结构
  *@returns {String} 父节点key
*/
  getParentNode (key, tree) {
    let parentNode;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentNode = node;
        } else if (this.getParentNode(key, node.children)) {
          parentNode = this.getParentNode(key, node.children);
        }
      }
    }
    return parentNode;
  },
  // 数组元素交换
  swapArray (arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  }

}
