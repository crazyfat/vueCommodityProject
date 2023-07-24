// 对axios进行二次封装
import axios from "axios";
// 通过拦截器添加进度条
import nprogress from 'nprogress'
// start代表进度条开始，done代表进度条结束

import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL:'/mock',
    timeout:5000
})
requests.interceptors.request.use((config)=>{
    //config 配置对象，里面有一个很重要得参数，config
    nprogress.start()
    return config
})
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
}, (error)=>{
    return Promise.reject(new Error('fail'))
})

export default requests