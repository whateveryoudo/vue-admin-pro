/**
 * Created by 86159 on 2019/8/4.
 */


import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {menuStyle,fixedSidebar,fixedHeader,hideHeaderScrolling,accordion,hideTabs} = defaultSettings;

const state = {
    theme : variables.theme,
    menuStyle : menuStyle, //导航风格
    fixedSidebar : true,
    fixedHeader : fixedHeader,
    hideHeaderScrolling :hideHeaderScrolling,
    accordion : accordion,
    hideTabs : hideTabs
}


const mutations = {
    //更新主题
    CHANGE_SETTING(state,{key,value}){
        if(state.hasOwnProperty(key)){
            state[key] = value;
        }
    }
}


export default {
    namespaced : true,
    state,
    mutations
}