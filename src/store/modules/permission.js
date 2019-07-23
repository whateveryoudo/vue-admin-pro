import {asyncRoutes, constantRoutes} from '@/router'


const state = {
    routes : [],
    addRoutes : [],
    routeSetted : false
}
const mutations = {
    SET_ROUTES : (state,routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
        state.routeSetted = true;
    }
}

const actions = {}

export default {
    namespaced : true,
    mutations,
    state,
    actions
}