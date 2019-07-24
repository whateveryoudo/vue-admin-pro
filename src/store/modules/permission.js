import {asyncRoutes, constantRoutes} from '@/router'


const state = {
    mainNavPath : '/main1',//一级选中路由路径(默认首页)
    routes : [],
    addRoutes : [],
    routeSetted : false
}

const getters = {
    //当前侧边菜单
    currentMenuRoutes : state => {
        const target = state.routes.find(item => item.path === state.mainNavPath);
        if(!target || !target.children){
            throw new Error('无相关主菜单...')
        }
        return target.children;
    }
}
const mutations = {
    SET_ROUTES : (state,routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
        state.routeSetted = true;
    },
    CHANGE_NAV : (state,path) => {
        state.mainNavPath = path;
    }
}

const actions = {}

export default {
    namespaced : true,
    mutations,
    state,
    actions,
    getters
}