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
//递归 过滤路由表
export const filterAsyncRoutes = (routes,roles) => {

}
const actions = {
    //路由过滤 admin拥有所有权限
    generateRoutes({commit},roles){
        return new Promise((resolve,reject) => {
            let accessedRoutes;
            if(roles.includes('admin')){
                accessedRoutes = asyncRoutes;
            }else{
                accessedRoutes = filterAsyncRoutes(asyncRoutes,roles);
            }
            commit('SET_ROUTES',accessedRoutes);
            resolve(accessedRoutes);
        })
    }
}

export default {
    namespaced : true,
    mutations,
    state,
    actions,
    getters
}