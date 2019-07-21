import { login} from '@/api/user'

const state = {
    name : 'ykx'
}
const mutations  = {

}
const actions = {
      //async
      login({commit},userInfo){
        const {username,password} = userInfo;
        // return await login({username : username.trim(),password});
        return new Promise((resolve,reject) => {
            login({username : username.trim(),password}).then(res => {
                // const {data} = res;
                //TODO 将token保存 vuex & 本地

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