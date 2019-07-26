import { login,getInfo} from '@/api/user'
import {getToken,setToken} from '@/utils'

const state = {
    name : '',
    token : getToken(),//默认获取本地存储的
    info : {},//用户信息对象
}
const mutations  = {
    SET_TOKEN : (state,token) => {
        state.token = token;
    },
    //设置用户信息
    SET_USETINFO: (state, info) => {
        state.info = info;
    }
}
const actions = {
      //用户登录
      login({commit},userInfo){
        const {username,password} = userInfo;
        // return await login({username : username.trim(),password});
        return new Promise((resolve,reject) => {
            login({username : username.trim(),password}).then(res => {
                const {token} = res.data;
                //将token保存 vuex & 本地
                commit('SET_TOKEN',token);
                setToken(token);
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    },
    //获取用户信息
    getUserInfo({commit,state}){
        return new Promise((resolve,reject) => {
            getInfo({token : state.token}).then(res => {
                const {data : {info}} = res;//这里未存入本地了,每次请求都会重新获取用户信息
                commit('SET_USETINFO',info);
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
export default {
    namespaced : true,
    state,
    mutations,
    actions
}