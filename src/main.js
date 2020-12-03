import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueCropper from "vue-cropper"
import Element from "element-ui"
import * as utils from "@/utils"
import "normalize.css/normalize.css" // a modern alternative to CSS resets
import "element-ui/lib/theme-chalk/index.css";
import "./permission.js"
import "@/styles/index.scss" // global css

import "./icons"
import i18n from "./locales" // internationalization

import * as filters from "@/filters"
Vue.config.productionTip = false;
// 修改默认card不显示阴影(主要用于界面布局)
Vue.prototype.$utils = utils;
Element.Card.props.shadow.default = "never";
const mediumComs = ["Form", "Button", "Input", "InputNumber"]; // 需要修改为medium的控件名称
mediumComs.forEach(com => {
  Element[com].props.size = { type: String, default: "medium" }; // 修改部分控件默认尺寸
});
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
}
);
Vue.use(VueCropper)
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount("#app")
