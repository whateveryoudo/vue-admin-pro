// 单组件通用属性, 方法
export default {
  methods: {
    // 获取单个项 label | wrapper 的宽度 支持栅格占比(请传入对象形式{span:xx})，width宽度，flex
    getItemWidth (width) {
      if (Object.prototype.toString.call(width) === 'Object object') {
        return width;
      } else {
        if (width) {
          if (width === 'auto') {
            return { style: { width: 'auto' } }
          } else {
            return { style: { flex: `0 0 ${typeof width === 'string' ? width : width + 'px'}` } }
          }
        } else {
          return {
            style: { flex: 1 }
          }
        }
      }
    }
  }
}
