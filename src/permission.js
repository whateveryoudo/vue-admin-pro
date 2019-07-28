//动态路由添加/过滤 路由拦截
import NProgress from 'nprogress' // progress bar
import { Message } from 'element-ui'
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from './utils'

import router from './router'
import store from './store'
const whiteList = ['/login', '/auth-redirect'] // 不需要登录的地址白名单
NProgress.configure({showSpinner : false});//不显示loading
router.beforeEach(async(to,from,next) => {
    //test
    NProgress.start();
    //TODO 设置title

    const hasToken = getToken();
    if(hasToken){
        if(to.path === '/login'){//已经登录直接跳转首页
            next({ path: '/' })
            NProgress.done();
        }else{
            //获取本地角色，释放钩子判断,否则会进入死循环（这里用户信息未存入本地，用户重新刷新会重新请求userInfo）
            const hasRole = store.getters.roles && store.getters.roles.length > 0;
            if(hasRole){
                next()
            }else{
                //获取用户信息
                const { info } = await store.dispatch('user/getUserInfo');
                //提示msg
                if(from.path === '/login'){
                    Message({
                        dangerouslyUseHTMLString: true,
                        message: '<div><span style="color: rgb(64, 158, 255);margin-right:5px">'+info.name+'</span>,欢迎回来</div>',
                        type: 'success'
                    });
                }
                //根据角色信息获取路由（路由权限判断 这里为什么采用异步方式？？）
                const accessRoutes = await store.dispatch('permission/generateRoutes',info.roles);

                // console.log(accessRoutes);
                router.addRoutes(accessRoutes);
                // set the replace: true, so the navigation will not leave a history record(需要拷贝一份？)
                next({ ...to, replace: true }) // 注意  router.addRoutes之后的next()可能会失效，因为可能next()的时候路由并没有完全add完成
                         // next(to) 重新进入router.beforeEach这个钩子，这时候再通过next()来释放钩子，就能确保所有的路由都已经挂在完成了 （https://segmentfault.com/a/1190000009506097）
            }
        }

    }else{
        if(whiteList.indexOf(to.path) >= 0){
            next();
        }else{
            next(`/login?redirect=${to.path}`);//保留地址栏的历史路径,登录完毕直接返回
            NProgress.done()
        }
    }
})


router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})