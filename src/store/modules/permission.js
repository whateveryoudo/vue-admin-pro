import {asyncRoutes, constantRoutes} from '@/router'


const state = {
    mainNavPath : '/main1',//一级选中路由路径(默认首页)
    routes : [],
    addRoutes : []
}
//判断是否含有权限（默认不含有meta.roles字段则能够显示）
const hasPermission = (roles,route) => {
    if(route.meta && route.meta.roles){
        return roles.some(role => route.meta.roles.includes(role));//角色有一个在设置的权限角色数组中就行
    }else{
        return true;
    }
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

    },
    CHANGE_NAV : (state,path) => {
        state.mainNavPath = path;
    }
}
//递归 过滤路由表
export const filterAsyncRoutes = (routes,roles) => {
    const res = [];
    routes.forEach(route => {
        if(hasPermission(roles,route)){
            if(route.children){
                route.children = filterAsyncRoutes(route.children,roles);//处理子集
            }
            res.push(route);
        }

    })
    return res;
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