import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'


import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css';
import './permission.js'
import '@/styles/index.scss' // global css

import './icons'
import i18n from './locales' // internationalization

Vue.config.productionTip = false;
//修改默认card不显示阴影(主要用于界面布局)

Element.Card.props.shadow.default = 'never';


Vue.use(Element, {
        i18n: (key, value) => i18n.t(key, value)
    }
);

new Vue({
  render: h => h(App),
    router,
    store,
    i18n
}).$mount('#app')
