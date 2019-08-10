import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);

// console.log(modulesFiles);

//讲modules下的文件按照文件名作为module名转为 {xx1 : {state,action} }
const modules = modulesFiles.keys().reduce((modules,modulePath) => {
    //正则转换路径为module名  ./app.js => app

    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1');//研究下正则

    const value = modulesFiles(modulePath);

    modules[moduleName] = value.default;
    return modules;
},{});


const store = new Vuex.Store({
    modules,
    getters
})

export default store