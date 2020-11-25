// 自定义copy指令
const Clipboard = require("clipboard")
if (!Clipboard) {
  throw new Error("请先安装clipboard插件,执行 npm/yarn install `clipboard` --save")
}
export default {
  bind (el, binding) {
    const {
      arg, // 传给指令的参数,执行不同的操作
      value // 指令对应的值
    } = binding;
    if (arg === "success" || arg === "error") { // 添加处理事件(成功/失败)
      el[`_v_clipboard_${arg}`] = value;
    } else {
      const clipboard = new Clipboard(el, {
        text () { return value }, // 需要操作的内容
        action () { return arg === "cut" ? "cut" : "copy" } // 触发方式
      });
      clipboard.on("success", e => {
        const callback = el._v_clipboard_success;
        if (callback && typeof callback === "function") {
          callback(e);
        }
      })
      clipboard.on("error", e => {
        const callback = el._v_clipboard_error;
        if (callback && typeof callback === "function") {
          callback(e);
        }
      })

      el._v_clipboard = clipboard;// 保存实例对象;
    }
  },
  update (el, binding) { // 所在组件的 VNode 更新时调用
    const { arg, value } = binding;
    if (arg === "success" || arg === "error") { // 添加处理事件(成功/失败)
      el[`_v_clipboard_${arg}`] = value;
    } else {
      el._v_clipboard.text = function () { return value }
      el._v_clipboard.action = function () { return arg === "cut" ? "cut" : "copy" }
    }
  },
  unbind (el, binding) { // 移除属性 销毁实例
    const { arg } = binding;
    if (arg === "success" || arg === "error") {
      delete el[`_v_clipboard_${arg}`];
    } else {
      el._v_clipboard.destroy();
      delete el._v_clipboard;
    }
  }
}
