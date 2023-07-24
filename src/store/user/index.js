import {reqSendCode} from "@/api";
import {reqLogin, reqUserInfo, reqLogOut} from "@/api";
export default {
    namespaced:true,
    state:{
        code:'',
        userToken:{},
        userInfo:{}
    },
    actions:{
        sendCode(context, phone){
            return new Promise((resolve, reject)=>{
                reqSendCode(phone).then(
                    value => {
                        if(value.code==200){
                            context.commit('SENDCODE', value.data)
                            resolve(value)
                        }else{
                            console.log('验证码失败')
                            reject(value)
                        }
                    },
                    reason => Promise.reject(reason.data)
                )
            })
        },
        userLogin(context, data){
            return new Promise((resolve, reject)=>{
                reqLogin(data).then(
                    value => {
                        if (value.code == 200) {
                            console.log('登录成功')
                            context.commit('USERLOGIN', value.data.token)
                            resolve(value.data.token)
                        }else{
                            console.log('登录失败')
                            reject(value.message)
                        }
                    },
                    reason => {return Promise.reject(reason)}
                )
            })
        },
        getUserInfo(context){
            return new Promise((resolve, reject)=>{
                reqUserInfo().then(
                    value => {
                        if(value.code==200){
                            context.commit('GETUSERINFO', value.data)
                            resolve(value)
                        }else{
                            reject(value)
                        }


                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        },
        userLogOut(context){
            return new Promise((resolve, reject)=>{
                reqLogOut().then(
                    value => {
                        console.log('退出登录成功', value)
                        if(value.code==200){
                            context.commit('USERLOGOUT')
                            resolve(value)
                        }else{
                            console.log('退出登录失败', value)
                            reject(value)
                        }
                    },
                    reason => {
                        console.log('退出登录失败', reason)
                        reject(reason)
                    }
                )
            })
        }
    },
    mutations:{
        SENDCODE(state, code){
            state.code = code
        },
        USERLOGIN(state, userToken){
            state.userToken = userToken || {}
        },
        GETUSERINFO(state, userInfo){
            state.userInfo = userInfo || {}
        },
        USERLOGOUT(state){
            state.userInfo = {}
            state.userToken = null
            localStorage.removeItem('user_token')
        }
    },
    getters:{}
}