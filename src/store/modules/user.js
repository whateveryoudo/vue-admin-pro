import { login} from '@/api/user'
import {getToken,setToken} from '@/utils'

const state = {
    name : '',
    token : getToken(),//默认获取本地存储的
    roles : []
}
const mutations  = {
    SET_TOKEN : (state,token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}
const actions = {
      //async
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
    }
}
export default {
    namespaced : true,
    state,
    mutations,
    actions
}