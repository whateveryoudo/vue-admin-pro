import axios from  'axios'

import { MessageBox, Message } from 'element-ui'

const service = axios.create({
    baseURL : process.env.VUE_APP_BASE_API,//地址为 根据配置获取接口地址前缀+请求地址
    timeout : 5000
})

service.interceptors.request.use(
    config => {
        //TODO 添加token请求

        return config;
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data;

        if(res.code !== 20000){
            Message({
                message : res.message || '服务器出错',
                type: 'error',
                duration: 5 * 1000
            })
            //处理其他情况
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

            if(res.code === 50008 || res.code === 50012 || res.code === 50014){//需要重新登录
                MessageBox.confirm('登录失效', '确认重新登录',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    //TODO 刷新token  重新刷新页面
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        }else{
            return res;
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }

)

export default service