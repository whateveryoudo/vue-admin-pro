//动态路由添加/过滤 路由拦截

import {asyncRoutes} from './router'

import router from './router'
import store from './store'

router.beforeEach(async(to,from,next) => {
    //test
    const isRouteSetted = store.getters.routeSetted ;
    if(isRouteSetted){
        next()
    }else{
        store.commit('permission/SET_ROUTES',asyncRoutes);
        console.log(asyncRoutes);
        router.addRoutes(asyncRoutes);
        next(to) // 注意  router.addRoutes之后的next()可能会失效，因为可能next()的时候路由并没有完全add完成
                // next(to) 重新进入router.beforeEach这个钩子，这时候再通过next()来释放钩子，就能确保所有的路由都已经挂在完成了 （https://segmentfault.com/a/1190000009506097）
    }

})