// 对axios进行二次封装
import axios from "axios";
// 通过拦截器添加进度条
import nprogress from 'nprogress'
// start代表进度条开始，done代表进度条结束
import store from "@/store";
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL:'/api',
    timeout:5000
})
requests.interceptors.request.use((config)=>{
   //config 配置对象，里面有一个很重要得参数，config
    if(store.state.detailStore.nanoid_token){
        config.headers.userTempId = store.state.detailStore.nanoid_token
    }
    if(localStorage.getItem('user_token')){
        config.headers.token = localStorage.getItem('user_token')
    }
    nprogress.start()
    return config
})
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
}, (error)=>{
    return Promise.reject(error)
})

export default requests